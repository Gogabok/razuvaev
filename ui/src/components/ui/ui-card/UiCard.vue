<script setup lang="ts">
import { computed } from 'vue';
import { SettingsType } from '../../../types/api.types';
import { getLanguageIso } from '../../../utils/api';
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

const aboutText = computed<string>(() => {
  const currentLanguage = getLanguageIso();

  const translates = {
    ru: 'О проекте',
    en: 'About',
    sr: 'О проjекту'
  };

  return translates[currentLanguage as keyof typeof translates] || translates['en'];
})
</script>

<template>
  <div
    class="ui-card"
    :class="{
      'ui-card--nda': isNda,
      'ui-card--details': isDetails
    }"
    @click.self="routeToCard"
  >
    <UiImage
      :images="images.map(image => image.link)"
      :gallery="isDetails ? false : true"
      class="ui-card-image"
      @on-click="routeToCard"
    >
      <template #icon>
        <div
          v-if="link"
          class="ui-card-image__link"
          @click="openLink(link)"
        >
          <ArrowLinkIcon />
        </div>
      </template>

      <template #description>
        <div
          v-if="!isNda && isDetails"
          class="ui-card-image-about"
          @click="routeToCard"
        >
          <span class="ui-card-image-about__text">
            {{ aboutText }}
          </span>
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
  position: relative;

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

    &:after {
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

      opacity: 0;

      @include font($font-size-base * 1.6, 400, $font-size-base * 2.4);
      @include transition(opacity);
    }

    &-about {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      backdrop-filter: blur(12px);

      opacity: 0;

      @include transition(opacity);
      @include disable-text-selection();

      &__text {
        display: block;
        padding: 0 ($font-size-base * 1.2);

        background: rgba(0, 0, 0, 0.30);
        backdrop-filter: blur(6px);

        border-radius: 24px;

        @include font($font-size-base * 1.6, 400, $font-size-base * 2.4);
        @include transition((background-color, color));

        &:hover {
          background-color: $ui-white;
          color: $ui-black;
        }
      }
    }

    &:hover {
      & .ui-card-image {
        &-about {
          opacity: 1;
        }
      }
    }
  }

  &--nda {
    & .ui-card-image {
      &:after {
        content: 'nda';
      }
    }
  }

  &--details {
    cursor: pointer;
  }

  &:hover {
    & .ui-card-image {
      &:after {
        opacity: 1;
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