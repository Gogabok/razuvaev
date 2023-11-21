<script setup lang="ts">
// @ts-ignore
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


interface Props {
  images: string[];
}

defineProps<Props>();
const emits = defineEmits(['on-click']);

const onClick = () => {
  emits('on-click');
}
</script>

<template>
  <div class="ui-image">
    <div
      v-if="images.length > 0 && images.length < 2"
      class="ui-image-container one-picture-container"
    >
      <img
        :src="images[0]"
        alt="Preview"
        ondragstart="return false"
        @click="onClick"
      />
    </div>

    <swiper
      v-else
      :allow-touch-move="false"
      :slides-per-view="1"
      :modules="[Navigation, Pagination]"
      :pagination="{
        type: 'fraction'
      }"
      navigation
      loop
    >
      <swiper-slide
        v-for="image in images"
        :key="image"
      >
        <img
          :src="image"
          alt="Preview"
          ondragstart="return false"
          @click="onClick"
        />
      </swiper-slide>
    </swiper>

    <slot name="icon" />
  </div>
</template>

<style lang="scss">
@import '../../../assets/styles/main.scss';

.ui-image {
  overflow: hidden;
  position: relative;

  &-container {
    width: 100%;
    @include disable-text-selection();

    & img {
      width: 100%;
      @include disable-text-selection();
    }
  }

  & .swiper {
    & .swiper-button-next, & .swiper-button-prev {
      background-color: rgba(0, 0, 0, 0.3);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(6px);

      padding: 12px 4px;
      border-radius: 24px;

      @include transition(background-color);

      &:after {
        font-size: 12px;
        color: $ui-white;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }

    & .swiper-pagination {
      display: flex;
      justify-content: center;
      width: fit-content;
      
      background-color: rgba(0, 0, 0, 0.3);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(6px);

      padding: 0 12px;
      border-radius: 24px;

      max-width: 78px;
      min-width: 54px;
      left: 50%;

      transform: translateX(-50%);

      color: $ui-white;

      @include font($font-size-base * 1.6, 400, $font-size-base * 2.4);
      @include disable-text-selection();
    }

    & img {
      width: 100%;

      @include disable-text-selection();
    }
  }
}
</style>