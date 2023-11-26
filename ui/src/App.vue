<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchData } from './utils/api';
import UiHeader from './components/ui/ui-header/UiHeader.vue';

const isLoading = ref<boolean>(true);

const reloadApplication = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 0)
};

onMounted(async () => {
  await fetchData();
  isLoading.value = false;
});
</script>

<template>
  <div class="layout" v-if="!isLoading">
    <UiHeader
      @on-change-language="reloadApplication"
    />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
@import './assets/styles/main.scss';

.layout {
  padding: 0 $padding-xl;
  max-width: $size-xl;
  width: 100%;

  margin: 0 auto;

  @media screen and (max-width: $container-width-xl) {
    max-width: $size-lg;
  }

  @media screen and (max-width: $container-width-lg) {
    max-width: $size-md;
  }

  @media screen and (max-width: $container-width-md) {
    max-width: $size-sm;
  }

  @media screen and (max-width: $container-width-sm) {
    max-width: $size-xs;
  }
}
</style>
