import create from 'zustand';

type State = {
  activeTab: number;
  setActiveTab: (n: number) => void;
};

export let useClientsTabStore = create<State>((set) => {
  return {
    activeTab: 0,
    setActiveTab: (value) => set({ activeTab: value }),
  };
});
