import { SettingsType } from "../types/api.types";

let data: SettingsType;
let language: SettingsType['languages'][number]['iso'] = localStorage.getItem('_razuvaev_language') || 'en';

export const fetchData = async (): Promise<SettingsType> => {
  const timestamp = new Date().getTime();
  const timestampHours = Math.floor(timestamp / (3600 * 1000));

  const response = await (await fetch(`https://razuvaev-admin.website.yandexcloud.net/settings.json?v?=${timestampHours}`)).json();
  data = response;
  
  return data;
}

export const getData = (block_name?: 'biography' | 'projects'): SettingsType | SettingsType['biography'][number] | SettingsType['projects'][number] => {
  if(!block_name) {
    return data;
  } else {
    return data[block_name].find(i => i.iso === language) || data;
  }
}

export const changeLanguage = (languagePayload: SettingsType['languages'][number]['iso']) => {
  language = languagePayload;
  localStorage.setItem('_razuvaev_language', language);
}

export const getLanguageIso = () => {
  return language;
}