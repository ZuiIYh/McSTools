import { ref } from 'vue';
import { loadBlockIcons } from './loadResource';

/**
 * 每次重新加载方块图标后自增。
 *
 * others.ts 里的图标缓存（切好的 data URL、图集 Image 对象）靠它判断是否需要作废：
 * 重新加载后图集 blob URL 会换新，不跟着清缓存就会继续拿旧 URL 的图标（且旧 URL 已被 revoke）。
 */
export const blockIconGeneration = ref(0);

/** 重新加载 data/resource 下所有资源包的方块图标（App 启动时调用；资源下载/卸载后可再调用） */
export const loadBlockResources = async () => {
  await loadBlockIcons();
  blockIconGeneration.value += 1;
};
