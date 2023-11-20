<script setup lang="ts">
import { SettingsType } from '../types/api.types';

import UiCard from '../components/ui/ui-card/UiCard.vue';

const projects: SettingsType['projects'][number] = {
  iso: 'ru',
  items: [
  {
      rules: {
        nda: true,
        details: true
      },
      info: {
        title: 'Like',
        year: '2023',
        link: 'https://likecentre.ru',
        images: [
          // {
          //   link: 'https://likecentre-files.website.yandexcloud.net/new-main-site/images/courses-new/concentrat.jpg'
          // },
          {
            link: 'https://i.imgur.com/BFCsS1o.png'
          },
          // {
          //   link: 'https://i.imgur.com/EsFFpxv.png'
          // }
        ]
      },
      details: {
        theme: {
          background: '',
          textColor: ''
        },
        content: [
          {
            title: '123',
            text: '321'
          }
        ]
      }
    },
    {
      rules: {
        nda: false,
        details: true
      },
      info: {
        title: 'Like',
        year: '2023',
        link: 'https://likecentre.ru',
        images: [
          {
            link: 'https://i.imgur.com/BFCsS1o.png'
          },
          {
            link: 'https://i.imgur.com/EsFFpxv.png'
          }
        ]
      },
      details: {
        theme: {
          background: '',
          textColor: ''
        },
        content: [
          {
            title: '123',
            text: '321'
          }
        ]
      }
    },
    {
      rules: {
        nda: false,
        details: true
      },
      info: {
        title: 'Like',
        year: '2023',
        link: 'https://likecentre.ru',
        images: [
          {
            link: 'https://i.imgur.com/BFCsS1o.png'
          },
          {
            link: 'https://i.imgur.com/EsFFpxv.png'
          }
        ]
      },
      details: {
        theme: {
          background: '',
          textColor: ''
        },
        content: [
          {
            title: '123',
            text: '321'
          }
        ]
      }
    },
    {
      rules: {
        nda: false,
        details: true
      },
      info: {
        title: 'Like',
        year: '2023',
        link: 'https://likecentre.ru',
        images: [
          {
            link: 'https://i.imgur.com/BFCsS1o.png'
          },
          {
            link: 'https://i.imgur.com/EsFFpxv.png'
          }
        ]
      },
      details: {
        theme: {
          background: '',
          textColor: ''
        },
        content: [
          {
            title: '123',
            text: '321'
          }
        ]
      }
    },
    {
      rules: {
        nda: false,
        details: true
      },
      info: {
        title: 'Like',
        year: '2023',
        link: 'https://likecentre.ru',
        images: [
          {
            link: 'https://i.imgur.com/BFCsS1o.png'
          },
          {
            link: 'https://i.imgur.com/EsFFpxv.png'
          }
        ]
      },
      details: {
        theme: {
          background: '',
          textColor: ''
        },
        content: [
          {
            title: '123',
            text: '321'
          }
        ]
      }
    }
  ]
}
</script>

<template>
  <div class="works-list">
    <UiCard
      v-for="project in projects.items"
      :key="project.info.title"
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