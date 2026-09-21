import { useToast } from "vue-toastification";
import {open} from "@tauri-apps/plugin-shell";
import {ref} from "vue";
import {appStore} from "./store.ts";
import {initTheme} from "./theme.ts";
import {ThemeInstance} from "vuetify/framework";
import { blockIconSpriteMap, blockIconGeneration } from "./blockResources";
export const toast = useToast();
export const selectLoading = ref();
export const selectClassification = ref<string>('');

const iconDataUrlCache = new Map<string, string>();
const atlasImageCache = new Map<string, HTMLImageElement>();
const atlasLoadingPromises = new Map<string, Promise<HTMLImageElement>>();
const atlasCanvasCache = new Map<string, OffscreenCanvas | HTMLCanvasElement>();

export const iconCacheVersion = ref(0);

// 1×1 透明 PNG：图标取不到时的**优雅占位**。
// 绝不能返回一个不存在的 URL —— 那样 <img> 会渲染成破图，比空白更难看也更难排查。
const PLACEHOLDER_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// 构建期静态资源映射：Vite 会把匹配到的 png 全部收进产物并给出可用 URL（小图默认内联成 data URL）。
//
// ⚠️ 这里以前写的是 `new URL(\`../assets/icon/icon-exports-x32/${ns}__${name}.png\`, import.meta.url).href`：
//    Vite 确实会把它转成等价的 glob，但**未命中时 `new URL(undefined, base)` 不会抛错**，
//    而是静默返回一个不存在的 URL（<base>/undefined）—— 外包的 try/catch 抓不到，
//    于是「图标不存在」最终表现为一张破图。改成显式查表：查不到就回占位图。
const iconExportUrls = import.meta.glob('../assets/icon/icon-exports-x32/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
}) as Record<string, string>;

const blockImgUrls = import.meta.glob('../assets/blocks_img/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
}) as Record<string, string>;

/** 取内置 x32 图标；查不到返回 undefined（由调用方决定占位） */
const lookupIconExport = (blockId: string): string | undefined => {
    const [namespace, name] = blockId.split(':');
    if (!namespace || !name) return undefined;
    return iconExportUrls[`../assets/icon/icon-exports-x32/${namespace}__${name}.png`];
};

// 资源重新加载后图集 URL 已换（旧的被 revoke），缓存里的图标 data URL 与 Image 必须作废
let syncedIconGeneration = -1;
const syncIconCacheWithResources = () => {
    if (syncedIconGeneration === blockIconGeneration.value) return;
    syncedIconGeneration = blockIconGeneration.value;
    iconDataUrlCache.clear();
    atlasImageCache.clear();
    atlasLoadingPromises.clear();
    atlasCanvasCache.clear();
};

 


function getOrCreateCanvas(size: number): HTMLCanvasElement | OffscreenCanvas {
    const cacheKey = `canvas_${size}`;
    if (atlasCanvasCache.has(cacheKey)) {
        return atlasCanvasCache.get(cacheKey)!;
    }
    
    let canvas: HTMLCanvasElement | OffscreenCanvas;
    if (typeof OffscreenCanvas !== 'undefined') {
        canvas = new OffscreenCanvas(size, size);
    } else {
        canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
    }
    atlasCanvasCache.set(cacheKey, canvas);
    return canvas;
}

 


const extractIconFromAtlas = (atlasUrl: string, uv: [number, number, number, number]): string => {
    const cacheKey = `${atlasUrl}_${uv.join(',')}`;
    
    if (iconDataUrlCache.has(cacheKey)) {
        return iconDataUrlCache.get(cacheKey)!;
    }
    
    const atlasImage = atlasImageCache.get(atlasUrl);
    if (atlasImage) {
        try {
            const [u0, v0, u1, v1] = uv;
            const x = Math.floor(u0 * atlasImage.width);
            const y = Math.floor(v0 * atlasImage.height);
            const w = Math.ceil((u1 - u0) * atlasImage.width);
            const h = Math.ceil((v1 - v0) * atlasImage.height);
            
            const canvas = getOrCreateCanvas(Math.max(w, h, 32));
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
            ctx.clearRect(0, 0, w, h);
            
            ctx.drawImage(atlasImage, x, y, w, h, 0, 0, w, h);
            let dataUrl: string;
            if (canvas instanceof OffscreenCanvas) {
                canvas.convertToBlob({ type: 'image/png' }).then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        iconDataUrlCache.set(cacheKey, reader.result as string);
                        iconCacheVersion.value++;
                    };
                    reader.readAsDataURL(blob);
                });
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
            } else {
                dataUrl = (canvas as HTMLCanvasElement).toDataURL('image/png');
                iconDataUrlCache.set(cacheKey, dataUrl);
                return dataUrl;
            }
        } catch (err) {
            console.error('Failed to extract icon:', err, { atlasUrl, uv });
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
        }
    }
    
    if (!atlasLoadingPromises.has(atlasUrl)) {
        const loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = () => {
                atlasImageCache.set(atlasUrl, img);
                iconCacheVersion.value++;
                resolve(img);
            };
            
            img.onerror = (err) => {
                console.error('Failed to load atlas image:', atlasUrl, err);
                reject(err);
            };
            
            img.src = atlasUrl;
        });
        
        atlasLoadingPromises.set(atlasUrl, loadPromise);
        
        loadPromise.then(() => {
            atlasLoadingPromises.delete(atlasUrl);
        }).catch((err) => {
            console.error('Atlas loading failed:', err);
            atlasLoadingPromises.delete(atlasUrl);
        });
    }
    
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
}

export const getBlockIcon = (blockId: string): string => {
    syncIconCacheWithResources();

    const sprite = blockIconSpriteMap[blockId];

    if (!sprite) {
        // 资源包没装（或图标图集还没解码完）→ 回退到内置 x32 图标，再不行给占位图
        return lookupIconExport(blockId) ?? PLACEHOLDER_ICON;
    }

    // extractIconFromAtlas 内部已有缓存，这里不必再查一遍
    const result = extractIconFromAtlas(sprite.atlasUrl, sprite.uv);

    // 拿到占位图 = 图集还没解码好（或切图失败）→ 先用内置图标顶上；
    // 图集加载完会自增 iconCacheVersion 触发重渲染，届时切出真图标。
    return result === PLACEHOLDER_ICON ? (lookupIconExport(blockId) ?? result) : result;
};

export const getIconUrl = (blockId: string) => {
    iconCacheVersion.value;
    return getBlockIcon(blockId);
};

export const getBlockImg = (blockId: string) => {
    // 同上：改成查表 + 占位。原来未命中时会 `new URL(undefined)` 返回一个不存在的 URL。
    const key = `../assets/blocks_img/${blockId}.png`;
    return blockImgUrls[key] ?? blockImgUrls[key.replace('minecraft:', '')] ?? PLACEHOLDER_ICON;
};
export const openLink = async (url: string) => {
    try {
        await open(url)
    } catch (err) {
        console.error('打开链接失败:', err)
    }
}
let darkModeMatcher = null;
export const detectTheme = async(theme: ThemeInstance) => {
    let autoTheme = await appStore.get('autoTheme', false)
    console.log(autoTheme)
    if (window.matchMedia && autoTheme) {
        darkModeMatcher = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMatcher.addEventListener('change', async (e) => {
            let autoTheme = await appStore.get('autoTheme', false)
            if (!autoTheme) return;
            if (e.matches) {
                await appStore.set('selectedTheme', 'grey_dark')
                theme.global.name.value = 'grey_dark'
                await appStore.set('opacity', 0.5)
                await initTheme();
            }else {
                let newTheme = await appStore.get('oldTheme', 'blue')
                await appStore.set('selectedTheme', newTheme)
                theme.global.name.value = newTheme
                await initTheme();
            }
        });
    }
}

export const clearThemeListeners = () => {
    if (darkModeMatcher) {
        darkModeMatcher.matcher.removeEventListener('change', darkModeMatcher.callback);
        darkModeMatcher = null;
    }
}
