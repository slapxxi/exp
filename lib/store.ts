import create from 'zustand';

type State = {
  bears: number;
  inc: () => void;
  reset: () => void;
};

let useStore = create<State>((set, get) => {
  return {
    bears: 0,
    inc: () => {
      set((state) => ({ ...state, bears: (state.bears + 1) % 11 }));
    },
    reset: () => {
      set((state) => ({ ...state, bears: 0 }));
    },
  };
});

export default useStore;
