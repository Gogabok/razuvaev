<script setup lang="ts">
import { token } from '@/api';

onMounted(() => {
  if(!token) {
    if(!window.location.pathname.includes('/login')) {
      window.location.href = '/login'
    }
  }
})
</script>

<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <RouterView />
    </VLayout>
  </VApp>
</template>
