import { useStore } from "@/store";
import {
  useMusicPlayed,
  type MusicPlayedStore,
  type MusicPlayed,
} from "@/store/played";
import { Show, createEffect } from "solid-js";
import { Pause, Play } from "./solid-buttons";

export default function MediaPlayer() {
  const musicStore = useStore(useMusicPlayed);
  const audio = (<audio src=""></audio>) as HTMLAudioElement;

  const toggle = () => musicStore().toggle();
  const disabled = () => musicStore().data === null;
  const playing = () => Boolean(musicStore().data?.isPlaying);

  createEffect<MusicPlayedStore>((prev) => {
    const { data } = musicStore();
    if (!data) {
      return musicStore();
    }

    musicEffect(prev?.data, data, audio);

    return musicStore();
  }, musicStore());

  return (
    <div
      class={`flex items-center justify-between h-32 ${disabled() ? "text-gray-500" : "text-white"}`}
    >
      <div>a</div>
      <div>
        <button onClick={toggle} disabled={disabled()}>
          <Show when={playing()} fallback={<Play />}>
            <Pause />
          </Show>
        </button>
      </div>
      <div>c</div>

      {audio}
    </div>
  );
}

function musicEffect(
  prev: MusicPlayed | undefined | null,
  { musicId, albumId, isPlaying }: MusicPlayed,
  audio: HTMLAudioElement,
) {
  if (!prev || musicId !== prev.musicId || albumId !== prev.albumId) {
    const musicIdStr = musicId.toString().padStart(2, "0");
    audio.src = `/music/${albumId}/${musicIdStr}.mp3`;
  }

  if (isPlaying) audio.play();
  else audio.pause();
}
