<script setup lang="ts">
import { checkTokenValidation, token } from '@/api';
import router from '@/router';

onMounted(async () => {
  if(!token) {
    const storagedToken = sessionStorage.getItem('razuvaev-admin-token');

    if(storagedToken) {
      const isTokenValid = await checkTokenValidation(storagedToken);

      if(isTokenValid) {
        return;
      }
    }

    if(!window.location.pathname.includes('/login')) {
      router.push('/login');
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
