<script setup lang="ts">
import { SettingsType, getSettings, setSettings } from '@/api';

const languages = ref<SettingsType['languages']>();
const isModalActive = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const isDeletingLoading = ref<boolean>(false);

const languageCreatingName = ref<string>('');
const languageCreatingISO = ref<string>('');

const loadLanguages = async () => {
  const response = await getSettings(true);
  languages.value = response.languages;
}

onMounted(() => {
  loadLanguages();
});

const addLanguage = async () => {
  if(!languageCreatingName.value || !languageCreatingISO.value) {
    return alert('Необходимо указать название языка и его ISO')
  }

  if(!languages.value) {
    return alert('Данные о настройках неизвестны системе')
  }

  isLoading.value = true;

  languages.value?.push({
    name: languageCreatingName.value,
    iso: languageCreatingISO.value
  });

  await setSettings('languages', languages.value);

  languageCreatingName.value = '';
  languageCreatingISO.value = '';

  isModalActive.value = false;
  isLoading.value = false;
};

const deleteLang = async (idx: number) => {
  if(!languages.value) {
    return alert('Необходимо указать название языка и его ISO');
  }

  isDeletingLoading.value = true;

  const langs = [...languages.value];
  langs.splice(idx, 1);
  languages.value = [...langs];
  await setSettings('languages', languages.value);
  
  isDeletingLoading.value = false;
}
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <VCard title="Настройка языков">
        <VTable>
          <thead>
            <tr>
              <th class="text-uppercase" style="width: 100%">
                Название
              </th>
              <th class="text-uppercase">
                ISO
              </th>
              <th class="text-uppercase">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(lang, idx) in languages"
              :key="lang.iso"
            >
              <td>{{ lang.name }}</td>
              <td>
                {{ lang.iso }}
              </td>
              <td style="display: flex; align-items: center;">
                <VBtn size="small" color="error" :loading="isDeletingLoading" @click="deleteLang(idx)">
                  <VIcon icon="mdi-trash" />
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
        <VCardActions>
          <VBtn
            append-icon="mdi-plus"
            variant="outlined"
            class="mt-5"
            @click="isModalActive = true"
          >
            Добавить
          </VBtn>
        </VCardActions>
      </VCard>
    </VCol>
  </VRow>

  <VDialog v-model="isModalActive" width="400">
    <VCard class="pa-5" title="Добавление языка">
      <VTextField
        v-model="languageCreatingName"
        placeholder="Название"
        class="mb-2"
      />

      <VTextField
        v-model="languageCreatingISO"
        placeholder="ISO (пример: ru)"
        class="mb-2"
      />

      <VBtn color="success" @click="addLanguage" :loading="isLoading">
        Добавить
      </VBtn>
    </VCard>
  </VDialog>
</template>
