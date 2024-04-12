export type Social = "email" | "linkedin" | "telegram" | "medium" | "dribble" | "behance" | "facebook";

export interface SettingsType {
  languages: {
    name: string;
    iso: string;
  }[];
  biography: {
    iso: string;
    text: string;
    contacts: {
      type: Social;
      link: string;
      visible: boolean;
    }[];
    feed: {
      image: string;
      text: string;
      link: string;
    }[];
  }[];
  projects: {
    iso: string;
    items: {
      rules: {
        nda: boolean;
        details: boolean;
      };
      info: {
        title: string;
        year: string;
        link: string;
        images: { link: string }[];
      };
      details: {
        theme: {
          background: string;
          textColor: string;
        };
        content: {
          title: string;
          text: string;
        }[];
      }
    }[];
  }[];
}

let settings: SettingsType;
export let token: string;
const baseUrl: string = 'https://bbafo00lvo6me2t4idr8.containers.yandexcloud.net';

export const getSettings = async (forceReload?: boolean): Promise<SettingsType> => {
  if(settings && !forceReload) {
    return settings;
  }

  const timestamp = new Date().getTime();
  const response = await (await fetch(`https://razuvaev-admin-ng.website.yandexcloud.net/settings.json?v=${timestamp}`)).json();
  settings = response as SettingsType;

  return settings;
}

export const setSettings = async <T extends keyof SettingsType, K extends typeof settings[T]>(key: T, data: K) => {
  if(!settings) {
    return alert('Данные о настройках неизвестны системе');
  }

  settings[key] = data;

  const response = await (await fetch(`${baseUrl}/api/update?token=${token}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings)
  })).json();

  return response;
}

export const checkTokenValidation = async (tokenPayload: string): Promise<boolean> => {
  const response = await (await fetch(`${baseUrl}/api/token?token=${tokenPayload}`)).json();

  if(!!response.isTokenValid) {
    token = tokenPayload;
    sessionStorage.setItem('razuvaev-admin-token', token);
  }

  return !!(response.isTokenValid);
};