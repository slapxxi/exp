import create from 'zustand';

type State = {
  darkMode: boolean;
  reduceMotion: boolean;
  setDarkMode: (value: boolean) => void;
  setReduceMotion: (value: boolean) => void;
};

export let useSettingsStore = create<State>((set) => {
  let status = typeof window === 'undefined' ? 'ssr' : 'client';
  let defaultSettings = {
    darkMode: false,
    reduceMotion: false,
  };

  if (status === 'client') {
    let localSettings = localStorage.getItem('settings');
    if (localSettings !== null) {
      defaultSettings = JSON.parse(localSettings);
    }
  }

  return {
    ...defaultSettings,
    setDarkMode: (value) => {
      set({ darkMode: value });
      let modifiedSettings = { ...defaultSettings, darkMode: value };
      localStorage.setItem('settings', JSON.stringify(modifiedSettings));
    },
    setReduceMotion: (value) => {
      set({ reduceMotion: value });
      let modifiedSettings = { ...defaultSettings, reduceMotion: value };
      localStorage.setItem('settings', JSON.stringify(modifiedSettings));
    },
  };
});
