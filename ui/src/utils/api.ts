import { SettingsType } from "../types/api.types";

let data: SettingsType;
const language: SettingsType['languages'][number]['iso'] = 'ru';
let isLoading: boolean = false;

export const fetchData = async (): Promise<SettingsType> => {
  isLoading = true;
  const response = await (await fetch('https://razuvaev-admin.website.yandexcloud.net/settings.json')).json();
  data = response;
  isLoading = false;
  
  return data;
}

export const getData = (block_name?: 'biography' | 'projects'): SettingsType | SettingsType['biography'][number] | SettingsType['projects'][number] => {
  if(!block_name) {
    return data;
  } else {
    return data[block_name].find(i => i.iso === language) || data;
  }
}