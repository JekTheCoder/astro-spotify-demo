import { songs, type Song, allPlaylists, type Playlist } from "@/lib/data";
import { create } from "zustand";

export type MusicPlayedStore = {
  data: MusicPlayed | null;
  toggle: () => void;
  setPlaylist: (playlistId: string) => void;
};

export type MusicPlayed = {
  playlist: Playlist;
  musicId: number;
	albumId: number;
  isPlaying: boolean;
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
