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


let l: SettingsType = {
  "languages": [
    {
      "name": "Русский",
      "iso": "ru"
    },
    {
      "name": "English",
      "iso": "en"
    },
    {
      "name": "Сербски",
      "iso": "sb"
    }
  ],
  "biography": [{
    "iso": "ru",
    "text": "Since 2012, I am crafting brand identities, mastering graphic design, refining UI and UX design, and bringing interfaces to life through animation.\nI worked with Strelka Institute, Relap.io, VK and many other teams.\nI am committed to contributing to cancer treatment research by offering my design services pro bono.Feel free to contact me.",
    "contacts": [
      {
        "type": "email",
        "link": "alexey@razuvaev.me",
        "visible": true
      },
      {
        "type": "linkedin",
        "link": "https://linkedin.com",
        "visible": true
      },
      {
        "type": "telegram",
        "link": "https://telegram.com",
        "visible": true
      }
    ],
    "feed": [
      {
        "image": "https://i.imgur.com/3NtlwQi.png",
        "text": "New identity and values: “Like Center” announced rebranding",
        "link": "https://likecentre.ru"
      },
      {
        "image": "https://i.imgur.com/3NtlwQi.png",
        "text": "Enter Media — about my work with RMS Group and the team",
        "link": "https://likecentre.ru"
      }
    ]
  }],
  "projects": []
}