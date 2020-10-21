import create from 'zustand';

type State = {
  transitioning: boolean;
  setTransitioning: (value: boolean) => void;
};

export let useTransitionStore = create<State>((set) => {
  return {
    transitioning: false,
    setTransitioning: (value) => set({ transitioning: value }),
  };
});
