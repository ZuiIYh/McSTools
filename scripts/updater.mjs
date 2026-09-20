
import { context, getOctokit } from "@actions/github";
import { readFile } from "node:fs/promises";


const MIRROR_PREFIX = "https://ghcr.mcschematic.top/";


const octokit = getOctokit(process.env.GITHUB_TOKEN);

const updateRelease = async () => {
    
    const { data: release } = await octokit.rest.repos.getReleaseByTag({
        owner: context.repo.owner,
        repo: context.repo.repo,
        tag: "updater",
    });

    
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