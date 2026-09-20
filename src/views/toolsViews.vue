<script setup lang="ts">
import {onMounted} from 'vue'
import {onBeforeRouteLeave, useRouter} from "vue-router";
import {isLeaving, navigationGuard} from "../modules/navigation.ts";
import { activeTab } from "../modules/layout.ts"
import 'vue-json-pretty/lib/styles.css';
import toolsConvert from '../units/tools/toolsConvert.vue';
import toolsReplace from '../units/tools/toolsReplace.vue';
import toolsStats from  '../units/tools/toolsStats.vue';
import toolsData from '../units/tools/toolsData.vue';
import toolsSchematic from '../units/tools/toolsSchematic.vue';
import toolsHistory from '../units/tools/toolsHistory.vue'
import toolsSplit from '../units/tools/toolsSplit.vue';
import toolsEditor from "../units/tools/toolsEditor.vue";
import { useI18n } from 'vue-i18n';

import {
  schematic_id,
  fetch_data,
  schematicData,
  schematicRequirements,
  convertData,
  uniqueBlocks,
  historyRecordData, activeTools
} from "../modules/tools_data.ts"
import {opacity} from "../modules/theme.ts";

const { t } = useI18n()
const router = useRouter()
onBeforeRouteLeave(navigationGuard)
onMounted(async() => {
    if (schematic_id.value != undefined){
        await fetch_data(schematic_id.value)
    }
})

</script>

<template class="page-wrapper">
  <v-row no-gutters
         class="mb-4 animate-row"
         :class="{ 'animate-row-out': isLeaving }"
  >
    <v-col>
      <v-card class="mx-auto overflow-auto h-auto v-theme--custom text-primary" :style="{ '--surface-alpha': opacity }" elevation="4" >
        <v-toolbar density="compact" class="bg-blue-grey-lighten-5 pa-3" :style="{ '--surface-alpha': opacity + 0.2 }">
          <v-toolbar-title>
            <v-icon icon="mdi-tools" class="mr-2 text-medium-emphasis"></v-icon>
            <span class="text-h5 text-medium-emphasis">{{ t('tools.title') }}</span>
            <v-chip
                v-if="schematic_id != undefined"
                color="orange-lighten-4"
                class="text-orange-darken-4 "
            >
              <v-icon start icon="mdi-cube"></v-icon>
              {{ t('tools.schematicId', { id: schematic_id }) }}
            </v-chip>
            <v-chip
                v-else
                color="red-orange-darken-4 text-medium-emphasis"
            >
              <v-icon start icon="mdi-cube"></v-icon>
              {{ t('tools.noSchematic') }}
            </v-chip>
          </v-toolbar-title>
          <v-btn class="text-medium-emphasis" variant="text" icon="mdi-cloud-upload" :title="t('tools.upload')" @click="router.push('/home');activeTab = 'home'"/>

          <v-divider vertical inset class="mx-4"/>

          <v-tabs v-model="activeTools"
                  align-tabs="center"
                  color="blue-lighten-1"
                  :disabled="schematic_id == undefined"
          >
            <v-tab value="schematic" class="text-medium-emphasis">{{ t('tools.tabs.schematic') }}</v-tab>
            <v-tab value="history" class="text-medium-emphasis">{{ t('tools.tabs.history') }}</v-tab>
            <v-tab value="split" class="text-medium-emphasis">{{ t('tools.tabs.split') }}</v-tab>
            <v-tab value="replace" class="text-medium-emphasis">{{ t('tools.tabs.replace') }}</v-tab>
            <v-tab value="convert" class="text-medium-emphasis">{{ t('tools.tabs.convert') }}</v-tab>
            <v-tab value="data" class="text-medium-emphasis">{{ t('tools.tabs.data') }}</v-tab>
            <v-tab value="stats" class="text-medium-emphasis">{{ t('tools.tabs.stats') }}</v-tab>
            <v-tab value="threeD" class="text-medium-emphasis">{{ t('tools.tabs.threeD') }}</v-tab>
          </v-tabs>
        </v-toolbar>
        <v-window v-model="activeTools">
          <v-window-item value="schematic">
            <toolsSchematic :data="schematicData"/>
          </v-window-item>
          <v-window-item value="history">
            <toolsHistory :data="historyRecordData"/>
          </v-window-item>
          <v-window-item value="split">
            <toolsSplit />
          </v-window-item>
          <v-window-item value="replace">
            <toolsReplace
                :data="schematicRequirements"
                :blocks="uniqueBlocks"
            />
          </v-window-item>
          <v-window-item value="convert">
            <toolsConvert :data="convertData"/>
          </v-window-item>
          <v-window-item value="data" >
            <toolsData/>
          </v-window-item>
          <v-window-item value="stats">
            <toolsStats :data="schematicRequirements"/>
          </v-window-item>
          <v-window-item value="threeD">
            <toolsEditor />
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>

</template>

<style scoped>

</style>