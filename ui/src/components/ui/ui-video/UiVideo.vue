<script setup lang="ts">
interface Props {
  src: string;
}

defineProps<Props>();
</script>

<template>
  <div class="ui-video">
    <iframe
      :src="`${src}?pip=0`"
      allow="fullscreen;"
    />
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/styles/main.scss';

.ui-video {
  width: 100%;

  position: relative;
  height: 0;
  padding-bottom: 56.25%;

  border-radius: 8px;
  overflow: hidden;

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>