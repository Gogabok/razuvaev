<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import ArrowIcon from '../../icons/ArrowIcon.vue';

interface Item {
  value: string;
  label: string;
}

interface Props {
  items: Item[];
  default?: Item;
}

const props = defineProps<Props>();
const emit = defineEmits(['on-select']);

const isSelectOpen = ref<boolean>(true);
const selectedItem = ref<Item['value']>();
const selectedItemLabel = computed<string>(() => {
  return props.items.find(item => item.value === selectedItem.value)?.label || '';
});

const select = (item_value: Item['value']) => {
  selectedItem.value = item_value;
  emit('on-select', selectedItem.value);
  isSelectOpen.value = false;
}

onMounted(() => {
  if(props.default) {
    select(props.default.value);
  }
});
</script>

<template>
  <div
    class="ui-select"
    :class="{
      'ui-select--open': isSelectOpen
    }"
  >
    <div
      class="ui-select-label"
      @click="isSelectOpen = !isSelectOpen"
    >
      <span class="ui-select-label__text">
        {{ selectedItemLabel }}
      </span>

      <span class="ui-select-label__text ui-select-label__text--mobile">
          {{ selectedItem }}
      </span>

      <ArrowIcon
        class="ui-select-label__icon"
      />
    </div>

    <div
      v-if="isSelectOpen"
      class="ui-select-list"
    >
      <span
        v-for="item in items.filter(item => item.value !== selectedItem)"
        :key="item.value"
        class="ui-select-list__item"
        @click="select(item.value)"
      >
        {{ item.label }}
      </span>

      <span
        v-for="item in items.filter(item => item.value !== selectedItem)"
        :key="item.value"
        class="ui-select-list__item ui-select-list__item--mobile"
        @click="select(item.value)"
      >
        {{ item.value }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/styles/main.scss';

.ui-select {
  padding: ($font-size-base * .4) ($font-size-base * .8);
  background: rgba(0, 0, 0, 0.9);
  border-radius: 12px;

  position: relative;

  &-label {
    display: flex;
    align-items: center;
    gap: 5px;

    cursor: pointer;

    &__text {
      @include font($font-size-base * 1.2, 400, 2);

      &--mobile {
        display: none;
      }

      @media screen and (max-width: $container-width-md) {
        display: none;

        &--mobile {
          display: inline;
          text-transform: capitalize;
        }
      }
    }

    &__icon {
      width: 12px;
      transform: rotate(180deg);

      @include transition(transform);
    }

    @include disable-text-selection();
    @include transition(opacity);

    &:hover {
      opacity: .8;
    }
  }

  &-list {
    position: absolute;
    left: 0;
    right: 0;
    background: inherit;

    padding: inherit;

    display: flex;
    flex-direction: column;

    border-radius: 0 0 12px 12px;

    &__item {
      margin-bottom: $font-size-base * .4;
      cursor: pointer;

      @include font($font-size-base * 1.2, 400, 2);
      @include disable-text-selection();
      @include transition(opacity);

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        opacity: .8;
      }

      &--mobile {
        display: none;
      }

      @media screen and (max-width: $container-width-md) {
        display: none;

        &--mobile {
          display: inline;
          text-transform: capitalize;
        }
      }
    }
  }

  &--open {
    border-radius: 12px 12px 0 0;
    & .ui-select-label {
      &__icon {
        transform: rotate(0);
      }
    }
  }
}
</style>