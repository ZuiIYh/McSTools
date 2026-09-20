<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import { schematic_id } from '../../modules/tools_data.ts'
import { toast } from '../../modules/others.ts'

const editorUrl = ref('')
const loading = ref(false)
const failed = ref('')
const frameLoaded = ref(false)
const frameKey = ref(0)

const hasSelection = computed(() => schematic_id.value !== undefined && schematic_id.value !== null)

let requestToken = 0

const loadEditor = async () => {
  const id = schematic_id.value
  const token = ++requestToken
  frameLoaded.value = false
  failed.value = ''

  if (id === undefined || id === null) {
    editorUrl.value = ''
    loading.value = false
    return
  }

  loading.value = true
  try {
    const url = await invoke<string>('editor_url_for_schematic', { id })
    if (token !== requestToken) return
    editorUrl.value = url
    frameKey.value += 1
  } catch (error) {
    if (token !== requestToken) return
    editorUrl.value = ''
    failed.value = String(error)
  } finally {
    if (token === requestToken) loading.value = false
  }
}

const openImportPage = async () => {
  const token = ++requestToken
  frameLoaded.value = false
  try {
    const url = await invoke<string>('editor_url')
    if (token !== requestToken) return
    failed.value = ''
    editorUrl.value = url
    frameKey.value += 1
  } catch (error) {
    if (token !== requestToken) return
    failed.value = String(error)
  }
}

const reload = () => {
  if (!editorUrl.value) {
    void loadEditor()
    return
  }
  frameLoaded.value = false
  frameKey.value += 1
}

const openInWindow = async () => {
  const id = schematic_id.value
  if (id === undefined || id === null) return
  try {
    await invoke('open_editor_for_schematic', { id })
    toast.info('已在独立窗口中打开这份蓝图', { timeout: 2500 })
  } catch (error) {
    toast.error(`打开独立窗口失败：${error}`, { timeout: 4000 })
  }
}

watch(schematic_id, () => {
  void loadEditor()
}, { immediate: true })

onBeforeUnmount(() => {
  requestToken += 1
  editorUrl.value = ''
})
</script>

<template>
  <div class="editor-wrap">
    <div class="editor-bar">
      <v-btn variant="text" size="small" :disabled="!editorUrl" @click="reload">
        <v-icon start icon="mdi-refresh"></v-icon>
        重新加载
      </v-btn>
      <v-btn variant="text" size="small" :disabled="!hasSelection" @click="openInWindow">
        <v-icon start icon="mdi-open-in-new"></v-icon>
        独立窗口
      </v-btn>
      <v-spacer></v-spacer>
      <span v-if="hasSelection" class="text-caption text-medium-emphasis">蓝图 #{{ schematic_id }}</span>
    </div>

    <div class="editor-pane">
      <iframe
          v-if="editorUrl"
          :key="frameKey"
          :src="editorUrl"
          class="editor-frame"
          allow="clipboard-read; clipboard-write; fullscreen"
          @load="frameLoaded = true"
      ></iframe>

      <div v-if="!hasSelection" class="pane-hint">
        <v-icon icon="mdi-cube-outline" size="44" class="mb-3"></v-icon>
        <div class="text-h6 mb-2">还没有选中蓝图</div>
        <div class="text-body-2">先去蓝图库里选一份蓝图，这里就会用投影编辑器打开它。</div>
      </div>

      <div v-else-if="failed" class="pane-hint">
        <v-icon icon="mdi-alert-circle-outline" size="44" class="mb-3"></v-icon>
        <div class="text-h6 mb-2">无法打开这份蓝图</div>
        <div class="text-body-2 mb-4 pane-hint-message">{{ failed }}</div>
        <div class="d-flex ga-2">
          <v-btn color="info" @click="loadEditor">重试</v-btn>
          <v-btn variant="outlined" @click="openImportPage">手动选择投影文件</v-btn>
        </div>
      </div>

      <div v-else-if="loading || !frameLoaded" class="pane-hint">
        <v-progress-circular indeterminate color="info" size="48" width="5"></v-progress-circular>
        <div class="text-body-2 mt-4">正在把蓝图交给投影编辑器…</div>
        <div class="text-caption mt-2 pane-hint-note">首次打开要加载整套方块贴图，请稍等</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 160px);
  min-height: 480px;
}

.editor-bar {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
}

.editor-pane {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  background: #0f1115;
  overflow: hidden;
}

.editor-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #0f1115;
}

.pane-hint {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: #0f1115;
  color: #e8eaf0;
}

.pane-hint-message {
  max-width: 560px;
  word-break: break-word;
}

.pane-hint-note {
  color: #98a1b3;
}
</style>
