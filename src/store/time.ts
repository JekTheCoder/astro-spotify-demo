import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type SongTimeStore = {
  time: number | null;
  reset: () => void;
  update: (time: number) => void;
};

export const currentSongTimeStore = createStore<SongTimeStore>()(
  persist(
    (set) => ({
      time: null,
      reset: () => set({ time: null }),
      update: (time: number) => set({ time }),
    }),
    {
      name: "current-song-time",
    },
  ),
);
