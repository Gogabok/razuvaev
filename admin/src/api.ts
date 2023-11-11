export type Social = "email" | "linkedin" | "telegram";

export interface SettingsType {
  languages: {
    name: string;
    iso: string;
  }[];
  biography: {
    text: string;
    contacts: {
      type: Social;
      link: string;
    }[];
    feed: {
      image: string;
      text: string;
      link: string;
    }[];
  },
  projects: {
    index: number;
    nda: boolean;
    title: string;
    images: string[];
    link: string;
    year: string;
    theme: {
      background: string;
      textColor: string;
    };
    content: {
      iso: string;
      blocks: {
        title: string;
        text: string;
      }[];
    }[];
  }[];
}

let settings: SettingsType;

export const getSettings = async (forceReload?: boolean): Promise<SettingsType> => {
  if(settings && !forceReload) {
    return settings;
  }

  const timestamp = new Date().getTime();
  const response = await (await fetch(`https://razuvaev-admin.website.yandexcloud.net/settings.json?v=${timestamp}`)).json();
  settings = response as SettingsType;

  return settings;
}

export const setSettings = async <T extends keyof SettingsType, K extends typeof settings[T]>(key: T, data: K) => {
  if(!settings) {
    return alert('Данные о настройках неизвестны системе');
  }

  settings[key] = data;
  
  console.log(JSON.stringify(settings))

  const response = await (await fetch('http://localhost:3000/api/update', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings)
  })).json();

  return response;
}