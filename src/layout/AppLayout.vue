<template>
  <v-navigation-drawer
      class="bg-primary fixed-sidebar"
      width="72"
      permanent
      fixed
      :floating="false"
      :elevation="3"
      app
  >
    <div class="logo-container">
      <v-icon
          icon="mdi-cube-scan"
          size="40"
          class="app-logo text-medium-emphasis"
      />
    </div>

    <v-list density="compact" class="nav-list" style="background: none !important;">
      <v-tooltip
          v-for="item in navItems"
          :key="item.value"
          location="right"
          :open-delay="100"
          transition="slide-x-reverse-transition"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
              v-bind="props"
              :value="item.value"
              :class="{ 'active-item': activeTab === item.value }"
              class="nav-item"
              @click.native="activeTab = item.value; router.push(`/${item.value}`)"
          >
            <div class="icon-wrapper ">
              <v-icon :icon="item.icon" size="28"/>
            </div>
          </v-list-item>
        </template>
        <span class="tooltip-text">{{ item.title }}</span>
      </v-tooltip>
    </v-list>
    <template v-slot:append>
      <div class="bottom-actions">
        <v-tooltip location="right">
          <template v-slot:activator="{ props }">
            <div class="d-flex justify-center">
              <v-btn
                  v-bind="props"
                  icon="mdi-cog-outline"
                  variant="text"
                  class="more-btn"
                  @click.native="activeTab = 'setting'; router.push(`/setting`)"
              />
            </div>
          </template>
          <span>{{ $t('menu.settings') }}</span>
        </v-tooltip>
      </div>
    </template>
  </v-navigation-drawer>

</template>

<script setup lang="ts">
import { activeTab, navItems } from '../modules/layout.ts'
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<style scoped>
.fixed-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.05);
}

.v-main {
  margin-left: 72px;
  transition: margin 0.3s ease;
}

.logo-container {
  padding: 20px 0;
  margin: 0 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.app-logo {
  color: #4A4A4A;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-logo:hover {
  transform: rotate(15deg) scale(1.1);
}

.nav-list {
  padding: 0 8px;
}

.nav-item {
  min-height: 56px;
  margin: 4px 0;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.nav-item.active-item {
  background: rgba(98, 0, 238, 0.08);
  position: relative;
}

.nav-item.active-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 24px;
  width: 3px;
  background: #6200ee;
  border-radius: 0 2px 2px 0;
}

 
.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  position: relative;
}

.icon-wrapper::after {
  content: "";
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  transition: all 0.3s ease;
}

.icon-wrapper:hover::after {
  background: rgba(0, 0, 0, 0.05);
}

.bottom-actions {
  padding: 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.more-btn {
  transform: rotate(90deg);
  transition: transform 0.3s ease;
}

.more-btn:hover {
  transform: rotate(0deg);
}

.tooltip-text {
  font-size: 0.85rem;
  padding: 6px 12px;
  color: white !important;
  border-radius: 6px;
}
.bottom-actions {
  width: 100%;
  padding: 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.more-btn {
  margin: 0 !important;
  transform: rotate(0deg);
  transition: all 0.3s ease;
}

.more-btn:hover {
  transform: rotate(180deg);
}
</style>