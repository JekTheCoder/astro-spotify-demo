import { songs, type Song, type Playlist } from "@/lib/data";
import { create } from "zustand";
import { currentSongTime } from "./time";
export * from "./time";

export type MusicPlayedStore = {
  data: MusicPlayed | null;
  toggle: () => void;
  setPlaylist: (set: {
    playlist: Playlist;
    musicId: number;
    albumId: number;
    song: Song;
    songs: Song[];
  }) => void;
  stepSong: (step: number) => void;
  reset: () => void;
};

export type MusicPlayed = {
  playlist: Playlist;
  musicId: number;
  albumId: number;
  isPlaying: boolean;
  song: Song;
};

export const useMusicPlayed = create<MusicPlayedStore>((set) => {
  return {
    data: null,
    toggle: () =>
      set((state) => {
        if (!state.data)
          return {
            data: null,
          };

        return {
          data: { ...state.data, isPlaying: !state.data.isPlaying },
        };
      }),
    setPlaylist: (data) =>
      set({
        data: {
          ...data,
          isPlaying: true,
        },
      }),

    reset: () => set({ data: null }),

    stepSong: (step: number) =>
      set((state) => {
        if (!state.data) return {};
        const song = stepSong(state.data.musicId, step);
        if (!song) return {};

        currentSongTime.getState().update(0);

        return {
          data: {
            ...state.data,
            musicId: song.id,
            song,
          },
        };
      }),
  };
});

function stepSong(currentSongId: number, step: number): Song | undefined {
  const index = songs.findIndex((song) => song.id === currentSongId);
  const nextIndex = (index + step + songs.length) % songs.length;
  return songs.at(nextIndex);
}

class ChangePlaylistQueue {
  private abort?: AbortController;
  private resetAbort?: AbortController;

  setPlaylist(playlistId: string) {
    this.abort?.abort();
    this.resetAbort?.abort();

    this.abort = new AbortController();
    this.resetAbort = new AbortController();

    timeout(
      () => {
        currentSongTime.getState().reset();
        useMusicPlayed.getState().reset();
      },
      100,
      this.resetAbort.signal,
    );

    fetch("/api/get-info-playlist.json/" + playlistId, {
      signal: this.abort.signal,
    })
      .then((res) => res.json())
      .then(({ playlist, songs }: { playlist: Playlist; songs: Song[] }) => {
        const song = songs[0];
        if (!song) return;

        this.resetAbort?.abort();

        useMusicPlayed.getState().setPlaylist({
          playlist,
          musicId: song.id,
          albumId: song.albumId,
          song,
          songs,
        });

        currentSongTime.getState().update(0);
      });
  }
}

const playlistQueue = new ChangePlaylistQueue();
export function setPlaylist(playlistId: string) {
  playlistQueue.setPlaylist(playlistId);
}

function timeout(fn: () => void, ms: number, signal: AbortSignal) {
  const callback = () => {
    fn();
    signal.removeEventListener("abort", callback);
  };
  const id = setTimeout(callback, ms);
  signal.addEventListener("abort", () => {
    clearTimeout(id);
  });
}
