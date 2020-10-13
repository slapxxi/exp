import create from 'zustand';

type State = {
  darkMode: boolean;
  reduceMotion: boolean;
  setDarkMode: (value: boolean) => void;
  setReduceMotion: (value: boolean) => void;
};

export let useSettingsStore = create<State>((set, get) => {
  let status = typeof window === 'undefined' ? 'ssr' : 'client';
  let settings = {
    darkMode: false,
    reduceMotion: false,
  };

  if (status === 'client') {
    let localSettings = localStorage.getItem('settings');
    if (localSettings !== null) {
      settings = JSON.parse(localSettings);
    }
  }

  return {
    ...settings,
    setDarkMode: (value) => {
      set({ darkMode: value });
      settings = { ...settings, darkMode: value };
      localStorage.setItem('settings', JSON.stringify(settings));
    },
    setReduceMotion: (value) => {
      set({ reduceMotion: value });
      settings = { ...settings, reduceMotion: value };
      localStorage.setItem('settings', JSON.stringify(settings));
    },
  };
});
