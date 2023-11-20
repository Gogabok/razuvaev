<script setup lang="ts">
import UiHeader from './components/ui/ui-header/UiHeader.vue';
</script>

<template>
  <div class="layout">
    <UiHeader />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
@import './assets/styles/main.scss';

.layout {
  padding: 0 $padding-xl;
}
</style>
