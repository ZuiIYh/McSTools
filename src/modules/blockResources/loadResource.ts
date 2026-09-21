import {join, resolveResource} from '@tauri-apps/api/path';
import {readTextFile, readDir, readFile} from '@tauri-apps/plugin-fs';

/**
 * 方块图标表：`<命名空间>:<方块路径>` → 该方块在图标图集里的切图位置。
 *
 * 数据来源是「设置 → 资源管理」下载的模组资源包（每个包的 `icons/atlas.png` + `icons/data.min.json`）。
 * McSTools 自己的工具面板（方块替换 / 历史 / 统计）通过 others.ts 的 `getIconUrl()` 取图标，
 * 所以**某个模组的图标能不能显示，取决于对应资源包装没装**。
 *
 * 这里只负责读图标图集。资源包里那套「方块定义 / 模型 / 贴图图集」（deepslate）在本项目中
 * **没有任何消费方**（自研 3D 预览已下线），已于 2026-09 移除 —— 启动时不再做整张图集的
 * 合并与解码，只读每个包的图标图集。
 */
export const blockIconSpriteMap: Record<string, { atlasUrl: string; uv: [number, number, number, number] }> = {};

/** 上一次加载创建的 blob URL：重新加载前必须 revoke，否则每次重载都泄漏整张图标图集 */
let activeAtlasUrls: string[] = [];

interface PackIcons {
    atlasUrl: string;
    uvMap: Record<string, [number, number, number, number]>;
}

async function loadPackIcons(modName: string): Promise<PackIcons | null> {
    try {
        const modPath = await resolveResource(`data/resource/${modName}`);
        const configText = await readTextFile(await join(modPath, 'config.json'));
        const config: { namespace?: string } = JSON.parse(configText);
        const namespace = config.namespace || modName;

        const iconsPath = await join(modPath, 'icons');
        const iconData: Record<string, [number, number, number, number]> =
            JSON.parse(await readTextFile(await join(iconsPath, 'data.min.json')));
        const iconImgData = await readFile(await join(iconsPath, 'atlas.png'));

        const atlasUrl = URL.createObjectURL(new Blob([new Uint8Array(iconImgData)], {type: 'image/png'}));
        const image = await new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = atlasUrl;
        });

        const uvMap: Record<string, [number, number, number, number]> = {};
        for (const [id, coords] of Object.entries(iconData)) {
            const [x, y, w, h] = coords;
            uvMap[`${namespace}:${id}`] = [
                x / image.width,
                y / image.height,
                (x + w) / image.width,
                (y + h) / image.height,
            ];
        }
        return {atlasUrl, uvMap};
    } catch (err) {
        console.warn(`[resources] 读取 ${modName} 的图标失败，跳过该资源：`, err);
        return null;
    }
}

/**
 * 重新加载 `data/resource/` 下所有资源包的方块图标（幂等，可重复调用）。
 * 下载或卸载资源后直接再调一次即可生效，不必重启应用。
 * @returns 成功载入图标图集的资源包数量
 */
export async function loadBlockIcons(): Promise<number> {
    // 先释放上一轮的 blob URL，再清空映射（否则重载会累积泄漏）
    activeAtlasUrls.forEach((url) => URL.revokeObjectURL(url));
    activeAtlasUrls = [];
    for (const key of Object.keys(blockIconSpriteMap)) delete blockIconSpriteMap[key];

    let dirs: { name: string; isDirectory: boolean }[] = [];
    try {
        const resourcePath = await resolveResource('data/resource/');
        dirs = (await readDir(resourcePath)).filter((d) => d.isDirectory) as
            { name: string; isDirectory: boolean }[];
    } catch (err) {
        console.error('[resources] 无法读取资源目录 data/resource/：', err);
        return 0;
    }

    let loaded = 0;
    for (const dir of dirs) {
        const icons = await loadPackIcons(dir.name);
        if (!icons) continue;
        activeAtlasUrls.push(icons.atlasUrl);
        for (const [id, uv] of Object.entries(icons.uvMap)) {
            blockIconSpriteMap[id] = {atlasUrl: icons.atlasUrl, uv};
        }
        loaded++;
    }
    console.log(
        `[resources] 已加载 ${loaded}/${dirs.length} 个资源包的方块图标（共 ${Object.keys(blockIconSpriteMap).length} 个方块）`,
    );
    return loaded;
}
