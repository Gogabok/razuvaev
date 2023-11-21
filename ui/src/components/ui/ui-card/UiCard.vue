<script setup lang="ts">
import { SettingsType } from '../../../types/api.types';
import { useRouter } from 'vue-router';

import UiImage from '../ui-image/UiImage.vue';
import ArrowLinkIcon from '../../icons/ArrowLinkIcon.vue';

const router = useRouter();

interface Props {
  title: string;
  year: string;
  link: string;
  isDetails: boolean;
  isNda: boolean;
  images: SettingsType['projects'][number]['items'][number]['info']['images'];
  index?: number;
};

const props = defineProps<Props>();

const openLink = (link: string) => {
  window.open(link);
}

const routeToCard = () => {
  if(props.isDetails && (typeof props.index !== 'undefined')) {
    router.push(`/works/${props.index}`);
  }
}
</script>

<template>
  <div
    class="ui-card"
    :class="{
      'ui-card--nda': isNda
    }"
    @click.self="routeToCard"
  >
    <UiImage
      :images="images.map(image => image.link)"
      class="ui-card-image"
      @on-click="routeToCard"
    >
      <template #icon>
        <div
          class="ui-card-image__link"
          @click="openLink(link)"
        >
          <ArrowLinkIcon />
        </div>
      </template>
    </UiImage>

    <div
      class="ui-card-details"
      @click.self="routeToCard"
    >
      <span class="ui-card-details__title">
        {{ title }}
      </span>

      <span class="ui-card-details__year">
        {{ year }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../assets/styles/main.scss';

.ui-card {
  display: flex;
  flex-direction: column;

  cursor: pointer;

  &-image {
    border-radius: 8px;
    margin-bottom: auto;

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

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  &--nda {
    & .ui-card-image {
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

  &-details {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: $font-size-base * .8;

    &__title {
      @include font($font-size-base * 1.6, 400, $font-size-base * 2.4);
      @include disable-text-selection();
    }

    &__year {
      @include font($font-size-base * 1.6, 400, $font-size-base * 2.4);
      @include disable-text-selection();
    }
  }
}
</style>