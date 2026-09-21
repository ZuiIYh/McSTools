
import { context, getOctokit } from "@actions/github";
import { readFile } from "node:fs/promises";


const MIRROR_PREFIX = "https://ghcr.mcschematic.top/";


const octokit = getOctokit(process.env.GITHUB_TOKEN);

const updateRelease = async () => {
    
    // tag=updater 的 release 是 app 内更新清单 latest.json 的固定投递点（端点硬编码在 tauri.conf.json），
    // 仓库里可能被删掉 —— 不存在就建，否则这一步永远 404 失败、且客户端检查更新也 404。
    let release;
    try {
        ({ data: release } = await octokit.rest.repos.getReleaseByTag({
            owner: context.repo.owner,
            repo: context.repo.repo,
            tag: "updater",
        }));
    } catch (error) {
        if (error.status !== 404) throw error;
        ({ data: release } = await octokit.rest.repos.createRelease({
            owner: context.repo.owner,
            repo: context.repo.repo,
            tag_name: "updater",
            name: "updater",
            body: "自动更新清单（latest.json 由发布流程覆盖写入）",
            draft: false,
            prerelease: false,
        }));
        console.log("已创建 tag=updater 的 release: id=" + release.id);
    }

    
    const deletePromises = release.assets
        .filter((item) => item.name === "latest.json")
        .map(async (item) => {
            await octokit.rest.repos.deleteReleaseAsset({
                owner: context.repo.owner,
                repo: context.repo.repo,
                asset_id: item.id,
            });
        });

    await Promise.all(deletePromises);

    
    const rawContent = await readFile("latest.json", { encoding: "utf-8" });
    const jsonContent = JSON.parse(rawContent);

    
    for (const platform of Object.keys(jsonContent.platforms)) {
        const originalUrl = jsonContent.platforms[platform].url;
        
        if (!originalUrl.startsWith(MIRROR_PREFIX)) {
            jsonContent.platforms[platform].url = `${MIRROR_PREFIX}${originalUrl}`;
        }
    }

    
    const modifiedContent = JSON.stringify(jsonContent, null, 2);

    
    await octokit.rest.repos.uploadReleaseAsset({
        owner: context.repo.owner,
        repo: context.repo.repo,
        release_id: release.id,
        name: "latest.json",
        data: modifiedContent,
    });
};

updateRelease();