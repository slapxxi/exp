import create from 'zustand';

type State = {
  activeTab: number;
  setActiveTab: (n: number) => void;
};

export let useClientsPageStore = create<State>((set) => {
  return {
    activeTab: 0,
    setActiveTab: (value) => set({ activeTab: value }),
  };
});
