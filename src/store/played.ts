import { songs, type Song, allPlaylists, type Playlist } from "@/lib/data";
import { create } from "zustand";

export type MusicPlayedStore = {
  data: MusicPlayed | null;
  toggle: () => void;
  setPlaylist: (playlistId: string) => void;
	stepSong: (step: number) => void;
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
    setPlaylist: (playlistId: string) =>
      set((state) => {
        if (state.data && state.data.playlist.id === playlistId)
          return {
            data: { ...state.data, isPlaying: !state.data.isPlaying },
          };

        const playlist = getPlaylist(playlistId);
        if (!playlist) return {};

        const music = getMusic(playlist.albumId);
        if (!music) return {};

        return {
          data: {
            playlist,
            musicId: music.id,
            albumId: music.albumId,
            isPlaying: true,
            song: music,
          },
        };
      }),

    stepSong: (step: number) =>
      set((state) => {
        if (!state.data) return {};
        const song = stepSong(state.data.musicId, step);
        if (!song) return {};

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

function getPlaylist(playlistId: string): Playlist | undefined {
  return allPlaylists.find((playlist) => playlist.id === playlistId);
}

function getMusic(albumId: number): Song | undefined {
  return songs.find((song) => song.albumId === albumId);
}

function stepSong(currentSongId: number, step: number): Song | undefined {
  const index = songs.findIndex((song) => song.id === currentSongId);
  const nextIndex = (index + step + songs.length) % songs.length;
  return songs.at(nextIndex);
}
