import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SongTimeStore = {
  time: number | null;
  reset: () => void;
  update: (time: number) => void;
};

export const currentSongTimeStore = create<SongTimeStore>()(
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
