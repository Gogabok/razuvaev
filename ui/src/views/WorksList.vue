<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SettingsType } from '../types/api.types';
import { getData } from '../utils/api';

import UiCard from '../components/ui/ui-card/UiCard.vue';

const projects = ref<SettingsType['projects'][number]>();

onMounted(() => {
  projects.value = getData('projects') as SettingsType['projects'][number];
});
</script>

<template>
  <div class="works-list" v-if="projects">
    <UiCard
      v-for="(project, projectIndex) in projects.items"
      :key="project.info.title"
      :index="projectIndex"
      :title="project.info.title"
      :year="project.info.year"
      :link="project.info.link"
      :images="project.info.images"
      :is-details="project.rules.details"
      :is-nda="project.rules.nda"

      class="works-list__card"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.works-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  
  gap: $font-size-base * 2;

  @media screen and (max-width: $container-width-xl) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: $container-width-lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: $container-width-md) {
    grid-template-columns: 1fr;
  }

  &__card {
    overflow: hidden;
  }
}
</style>