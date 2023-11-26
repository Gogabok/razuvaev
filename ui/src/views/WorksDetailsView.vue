<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getData } from '../utils/api';
import { SettingsType } from '../types/api.types';

import UiImage from '../components/ui/ui-image/UiImage.vue';
import ArrowLinkIcon from '../components/icons/ArrowLinkIcon.vue';

const route = useRoute();
const router = useRouter();
const projects = ref<SettingsType['projects'][number]>();
const currentProject = ref<SettingsType['projects'][number]['items'][number]>();

const openLink = (link: string) => {
  window.open(link);
}

const changeAppColor = (background?: string, color?: string) => {
  const setAppStyle = (key: string, value: string) => {
    const App = document.querySelector('#app') as HTMLElement;
    if(App) {
      // @ts-ignore
      App.style[key] = value;
    }
  }
  if(background && color) {
    setAppStyle('background-color', background);
    setAppStyle('color', color);
    return;
  }
  if(currentProject.value?.details.theme.background) {
    setAppStyle('background-color', currentProject.value.details.theme.background)
  }
  if(currentProject.value?.details.theme.textColor) {
    setAppStyle('color', currentProject.value.details.theme.textColor)
  }
}

onMounted(() => {
  projects.value = getData('projects') as SettingsType['projects'][number];
  const workId = +route.params.id;
  const project = projects.value.items[workId];
  if(typeof workId === 'number' && project && project.rules.details) {
    currentProject.value = project;
    changeAppColor();
  } else {
    router.push('/works');
  }
});

onUnmounted(() => {
  changeAppColor('inherit', 'inherit');
});
</script>

<template>
  <div
    v-if="currentProject"
    class="works-details-view"
    :style="{
      'background-color': currentProject.details.theme.background || '#000000',
      'color': currentProject.details.theme.textColor || '#ffffff'
    }"
    :class="{
      'works-details-view--nda': currentProject.rules.nda
    }"
  >
    <span class="works-details-view__title">
      {{ currentProject.info.title }}
    </span>

    <UiImage
      :images="currentProject.info.images.map(image => image.link)"
      :gallery="true"
      :always-on="true"
      class="works-details-view-image"
    >
      <template #icon>
        <div
          v-if="currentProject.info.link"
          class="works-details-view-image__link"
          @click="openLink(currentProject.info.link)"
        >
          <ArrowLinkIcon />
        </div>
      </template>
    </UiImage>

    <div class="works-details-view-content">
      <div
        v-for="block in currentProject.details.content"
        :key="block.title + Math.random()"
        class="works-details-view-content-block"
      >
        <span
          class="works-details-view-content-block__title"
          v-html="block.title.replace(/(?:\r\n|\r|\n)/g, '<br />')"
        />
        <span
          class="works-details-view-content-block__text"
          v-html="block.text.replace(/(?:\r\n|\r|\n)/g, '<br />')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';
.works-details-view {
  &__title {
    display: block;
    margin-bottom: $font-size-base * 1.2;
    color: inherit;

    @include font($font-size-base * 1.6, 400, $font-size-base * 2.4);
  }

  &-image {
    border-radius: 8px;

    &__link {
      position: absolute;
      right: 8px;
      bottom: 8px;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 24px;
      height: 24px;

      background-color: rgba(0, 0, 0, 0.3);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(6px);
      border-radius: 50%;

      z-index: 1;

      cursor: pointer;

      @include transition(background-color);

      & svg {
        stroke: $ui-white;

        @include transition(stroke);
      }

      &:hover {
        background-color: $ui-white;

        & svg {
          stroke: $ui-black;
        }
      }
    }
  }

  &-content {
    margin-top: $font-size-base * 1.6;

    &-block {
      display: flex;
      align-items: flex-start;
      margin-bottom: $font-size-base * 1.6;

      &__title {
        display: block;
        width: 100%;
        color: inherit;

        @include font($font-size-base * 1.6, 400, $font-size-base * 2.4);
      }

      &__text {
        display: block;
        width: 100%;
        color: inherit;

        @include font($font-size-base * 1.6, 400, $font-size-base * 2.4);
      }
    }

    @media screen and (max-width: $container-width-md) {
      & {
        &-block {
          flex-direction: column;

          &__title {
            margin-bottom: $font-size-base * .8;
          }
        }
      }
    }
  }

  &--nda {
    & .works-details-view-image {
      &:after {
        content: 'nda';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        pointer-events: none;

        backdrop-filter: blur(12px);

        @include font($font-size-base * 1.6, 400, $font-size-base * 2.4);
      }
    }
  }
}
</style>