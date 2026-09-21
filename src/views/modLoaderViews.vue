<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import { open } from '@tauri-apps/plugin-dialog'
import { toast } from '../modules/others.ts'
import { opacity } from '../modules/theme.ts'
import { isLeaving, navigationGuard } from '../modules/navigation.ts'
import { onBeforeRouteLeave } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface ModPreviewBlock { id: string; name: string }
interface ModPreview {
  ok: boolean
  modid: string | null
  namespaces: string[]
  blocksCount: number
  missingCount: number
  blocks: ModPreviewBlock[]
  missing: string[]
  added?: number
  copied?: number
}
interface InstalledMod {
  modid: string
  source: string
  enabled: boolean
  blocks: number
  images: number
  hasCache: boolean
}

const selectedPath = ref('')
const preview = ref<ModPreview | null>(null)
const previewing = ref(false)
const installing = ref(false)
const mods = ref<InstalledMod[]>([])
const loadingList = ref(false)

const refresh = async () => {
  loadingList.value = true
  try {
    const r = await invoke<any>('list_mod_packs')
    mods.value = Array.isArray(r) ? r : []
  } catch (e) {
    toast.error(`读取已装载模组失败：${e}`)
  } finally {
    loadingList.value = false
  }
}

const pickFile = async () => {
  const selected = await open({
    multiple: false,
    filters: [{ name: 'Minecraft 模组 / 资源包', extensions: ['jar', 'zip'] }]
  })
  if (typeof selected === 'string') {
    selectedPath.value = selected
    await doPreview()
  }
}

const doPreview = async () => {
  if (!selectedPath.value) return
  previewing.value = true
  preview.value = null
  try {
    const r = await invoke<any>('preview_mod_pack', { path: selectedPath.value })
    preview.value = r
  } catch (e) {
    toast.error(`解析失败：${e}`)
  } finally {
    previewing.value = false
  }
}

const doInstall = async () => {
  if (!selectedPath.value) return
  installing.value = true
  try {
    const r = await invoke<any>('install_mod_pack', { path: selectedPath.value })
    toast.success(`已装载 ${r.modid}：新增 ${r.added} 个方块、${r.copied} 张贴图`)
    preview.value = null
    selectedPath.value = ''
    await refresh()
  } catch (e) {
    toast.error(`装载失败：${e}`)
  } finally {
    installing.value = false
  }
}

const onToggle = async (mod: InstalledMod) => {
  const want = mod.enabled
  // 先乐观更新，失败回滚
  mod.enabled = !want
  try {
    if (want) {
      await invoke<any>('disable_mod_pack', { modid: mod.modid })
      toast.info(`已禁用 ${mod.modid}`)
    } else {
      await invoke<any>('enable_mod_pack', { modid: mod.modid })
      toast.info(`已启用 ${mod.modid}`)
    }
    mod.enabled = want
  } catch (e) {
    mod.enabled = !want
    toast.error(`操作失败：${e}`)
  }
}

const uninstall = async (mod: InstalledMod) => {
  try {
    await invoke<any>('uninstall_mod_pack', { modid: mod.modid })
    toast.success(`已卸载 ${mod.modid}`)
    await refresh()
  } catch (e) {
    toast.error(`卸载失败：${e}`)
  }
}

onMounted(refresh)
onBeforeRouteLeave(navigationGuard)
</script>

<template>
  <div class="page-wrapper">
    <v-row no-gutters class="mb-4 animate-row" :class="{ 'animate-row-out': isLeaving }">
      <v-col>
        <v-card class="mx-auto overflow-auto h-auto v-theme--custom text-primary" :style="{ '--surface-alpha': opacity }" elevation="4">
          <v-toolbar density="compact" class="bg-blue-grey-lighten-5 pa-3" :style="{ '--surface-alpha': opacity + 0.2 }">
            <v-toolbar-title>
              <v-icon icon="mdi-package-variant-closed" class="mr-2 text-medium-emphasis"></v-icon>
              <span class="text-h5 text-medium-emphasis">{{ t('modloader.title') }}</span>
            </v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <!-- 装载新模组 -->
            <div class="text-subtitle-1 mb-2">{{ t('modloader.installHeading') }}</div>
            <div class="d-flex align-center ga-3 flex-wrap">
              <v-btn color="primary" variant="flat" prepend-icon="mdi-file-plus" :loading="previewing" @click="pickFile">
                {{ t('modloader.selectFile') }}
              </v-btn>
              <span v-if="selectedPath" class="text-caption text-medium-emphasis text-truncate" style="max-width: 460px;">
                {{ selectedPath }}
              </span>
            </div>

            <!-- 预览 -->
            <div v-if="previewing" class="mt-4 d-flex align-center ga-2">
              <v-progress-circular indeterminate size="20" width="3" color="info" />
              <span class="text-body-2">{{ t('modloader.parsing') }}</span>
            </div>

            <v-alert
              v-else-if="preview"
              :type="preview.ok ? 'info' : 'error'"
              variant="tonal"
              class="mt-4"
              border="start"
            >
              <div class="text-body-2">
                <div>{{ t('modloader.modid') }}：<b>{{ preview.modid || '—' }}</b></div>
                <div>{{ t('modloader.blocksFound') }}：<b>{{ preview.blocksCount }}</b>　{{ t('modloader.missing') }}：<b>{{ preview.missingCount }}</b></div>
                <div v-if="preview.namespaces?.length">{{ t('modloader.namespaces') }}：{{ preview.namespaces.join(', ') }}</div>
              </div>
              <div v-if="preview.blocks?.length" class="mt-2" style="max-height: 180px; overflow:auto;">
                <v-chip v-for="b in preview.blocks.slice(0, 60)" :key="b.id" size="x-small" class="ma-1">
                  {{ b.id }}
                </v-chip>
                <span v-if="preview.blocks.length > 60" class="text-caption">…{{ t('modloader.more', { n: preview.blocks.length - 60 }) }}</span>
              </div>
              <div v-if="preview.missing?.length" class="mt-2 text-caption text-medium-emphasis">
                {{ t('modloader.missingList') }}：{{ preview.missing.slice(0, 20).join('、') }}
                <span v-if="preview.missing.length > 20">…</span>
              </div>
            </v-alert>

            <div v-if="preview && preview.ok" class="mt-4">
              <v-btn color="success" variant="flat" prepend-icon="mdi-package-down" :loading="installing" @click="doInstall">
                {{ t('modloader.install') }}
              </v-btn>
            </div>

            <v-divider class="my-6" />

            <!-- 已装载列表 -->
            <div class="text-subtitle-1 mb-2 d-flex align-center ga-2">
              {{ t('modloader.installedHeading') }}
              <v-progress-circular v-if="loadingList" indeterminate size="16" width="2" color="info" />
            </div>

            <v-list v-if="mods.length" lines="two" density="compact">
              <v-list-item v-for="m in mods" :key="m.modid">
                <template v-slot:prepend>
                  <v-switch
                    :model-value="m.enabled"
                    color="success"
                    hide-details
                    @update:model-value="onToggle(m)"
                  />
                </template>
                <v-list-item-title>
                  <v-icon :icon="m.enabled ? 'mdi-package-variant-closed' : 'mdi-package-variant'" class="mr-1" size="18" />
                  {{ m.modid }}
                  <v-chip v-if="!m.enabled" size="x-small" color="grey" class="ml-2">{{ t('modloader.disabled') }}</v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ t('modloader.blockCount', { n: m.blocks }) }}　{{ t('modloader.imageCount', { n: m.images }) }}
                  <span v-if="m.source" class="text-medium-emphasis">· {{ m.source }}</span>
                </v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn icon="mdi-delete-outline" variant="text" color="error" size="small" :title="t('modloader.uninstall')" @click="uninstall(m)" />
                </template>
              </v-list-item>
            </v-list>
            <div v-else class="text-body-2 text-medium-emphasis">{{ t('modloader.noInstalled') }}</div>

            <v-alert type="warning" variant="text" class="mt-6" density="compact">
              {{ t('modloader.note') }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.page-wrapper { width: 100%; }
</style>
