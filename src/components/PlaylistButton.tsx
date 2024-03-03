import { Show } from "solid-js";
import { Play, Pause } from "./solid-buttons";
import { useMusicPlayed } from "@/store/played";
import { useStore } from "@/store";

export type Props = {
  playlistId: string;
};

export default function PlaylistButton({ playlistId }: Props) {
  const musicStore = useStore(useMusicPlayed);
  const isPlaying = () => {
    const { data } = musicStore();
    if (!data) return false;

    return data.playlist.id === playlistId && data.isPlaying;
  };

  const toggle = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

		console.log('now toggling', playlistId)
    musicStore().setPlaylist(playlistId);
		
		console.log('now played', musicStore())
  };

  return (
    <button
      class="rounded-full bg-green-500 text-black p-2 w-12 h-12 flex items-center justify-center"
      onClick={toggle}
    >
      <Show when={isPlaying()} fallback={<Play />}>
        <Pause />
      </Show>
    </button>
  );
}
