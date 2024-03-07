import { create } from "zustand";

export type SongTimeStore = {
  time: number | null;
  reset: () => void;
  update: (time: number) => void;
};

export const currentSongTime = create<SongTimeStore>((set) => ({
  time: null,
  reset: () => set({ time: null }),
  update: (time: number) => set({ time }),
}));
