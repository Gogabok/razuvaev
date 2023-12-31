<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import LogoIcon from '../../icons/LogoIcon.vue';
import UiSelect from '../ui-select/UiSelect.vue';
import { SettingsType } from '../../../types/api.types';
import { getData, getLanguageIso, changeLanguage } from '../../../utils/api';

const route = useRoute();
const router = useRouter();

const languages = ref<SettingsType['languages']>();
const selectedLanguage = ref<SettingsType['languages'][number]>();

const emits = defineEmits(['on-change-language']);

interface NavigationItem {
  path: string;
  title: Record<SettingsType['languages'][number]['iso'], string>;
};

const navigation = ref<NavigationItem[]>([
  {
    path: '/works',
    title: {
      ru: 'Работы',
      en: 'Works',
      sr: 'Радови'
    }
  },
  {
    path: '/bio',
    title: {
      ru: 'Биография',
      en: 'Bio',
      sr: 'Биографиjа'
    }
  }
]);

const currentActiveLink = computed<NavigationItem['path']>(() => {
  return route.path;
});

const routeTo = (path: string) => {
  router.push(path);
}

const onLanguageSelect = (iso: SettingsType['languages'][number]['iso']) => {
  const oldIso = selectedLanguage.value?.iso;
  if(languages.value && languages.value.length > 0) {
    const selectedLanguageItem = languages.value.find(l => l.iso === iso);
    if(selectedLanguageItem) {
      selectedLanguage.value = selectedLanguageItem;
      changeLanguage(selectedLanguage.value.iso);

      if(oldIso !== iso) {
        emits('on-change-language');
      }
    }
  }
};

onMounted(() => {
  languages.value = (getData() as SettingsType)['languages'];
  selectedLanguage.value = languages.value.find(l => l.iso === getLanguageIso()) || languages.value[0];
});
</script>

<template>
  <div class="ui-header">
    <div class="ui-header-content" v-if="languages && selectedLanguage">
      <LogoIcon
        class="ui-header-content__logo"
        @click="routeTo('/works')"
      />

      <nav class="ui-header-content-navigation">
        <li
          v-for="item in navigation"
          :key="item.path"
          class="ui-header-content-navigation__item"
          :class="{
            'ui-header-content-navigation__item--active': currentActiveLink.includes(item.path)
          }"
          @click="routeTo(item.path)"
        >
          {{ selectedLanguage ? item.title[selectedLanguage.iso] : '' }}
        </li>
      </nav>

      <UiSelect
        :items="languages.map(item => ({ value: item.iso, label: item.name }))"
        :default="{ value: selectedLanguage.iso, label: selectedLanguage.name }"
        @on-select="onLanguageSelect"
      />
    </div> 
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/styles/main.scss';

.ui-header {
  width: 100%;
  padding: 10px;

  margin: ($font-size-base * 1.2) 0;
  padding: ($font-size-base * 0.8);

  background: $ui-black;
  backdrop-filter: blur(12px);

  border-radius: 24px;

  z-index: 2;

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;

    &__logo {
      cursor: pointer;

      @include transition(opacity);

      &:hover {
        opacity: .8;
      }
    }

    &-navigation {
      display: flex;
      align-items: center;
      gap: $font-size-base * 0.8;

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      &__item {
        list-style: none;

        border: 1px solid $ui-white;
        border-radius: 24px;

        padding: 0 ($font-size-base * 0.8);
        
        cursor: pointer;

        @include font($font-size-base * 1.2, 400, 2);
        @include disable-text-selection();
        @include transition((opacity, background-color, color));

        &:hover {
          opacity: .8;
        }

        &--active {
          background-color: $ui-white;
          color: $ui-black;
          // pointer-events: none;
        }
      }
    }
  }
}
</style>