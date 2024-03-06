import { useStore } from "@/store";
import {
  useMusicPlayed,
  type MusicPlayedStore,
  type MusicPlayed,
} from "@/store/played";
import { Show, createEffect, createSignal } from "solid-js";
import { Pause, Play } from "./solid-buttons";
import Volume, { type VolumeData } from "./MediaPlayer/Volume";
import SongPlayed from "./SongPlayed";

const NextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 20 20"
  >
    <path
      fill="currentColor"
      d="M12.244 9.52L5.041 4.571C4.469 4.188 4 4.469 4 5.196v9.609c0 .725.469 1.006 1.041.625l7.203-4.951s.279-.199.279-.478c0-.28-.279-.481-.279-.481M14 4h1c.553 0 1 .048 1 .6v10.8c0 .552-.447.6-1 .6h-1c-.553 0-1-.048-1-.6V4.6c0-.552.447-.6 1-.6"
    />
  </svg>
);

export default function MediaPlayer() {
  const musicStore = useStore(useMusicPlayed);
  const volumeSignal = createSignal<VolumeData>({
    value: 0.1,
    mute: false,
  });

  const audio = (<audio src=""></audio>) as HTMLAudioElement;

  const disabled = () => musicStore().data === null;
  const playing = () => Boolean(musicStore().data?.isPlaying);
  const song = () => musicStore().data?.song;

  const toggle = () => musicStore().toggle();
	const stepSong = (step: number) => musicStore().stepSong(step);

  createEffect<MusicPlayedStore>((prev) => {
    const { data } = musicStore();
    if (!data) {
      return musicStore();
    }

    musicEffect(prev?.data, data, audio);

    return musicStore();
  }, musicStore());

  createEffect(() => {
    const [volume] = volumeSignal;
    audio.volume = volume().value;
    audio.muted = volume().mute;
  });

  return (
    <div
      class={`px-4 py-2 grid grid-cols-3 items-center ${disabled() ? "text-gray-500" : "text-white"}`}
    >
      <div class="h-16 justify-self-start">
        <Show when={song()}>{(song) => <SongPlayed song={song} />}</Show>
      </div>

      <div class="flex gap-x-6 justify-self-center">
        <button disabled={disabled()} class="-scale-x-100" onClick={() => stepSong(-1)}>
          <NextIcon />
        </button>

        <button
          class={`rounded-full h-10 w-10 grid place-content-center ${disabled() ? "bg-gray-500" : "bg-white"} text-black p-2`}
          onClick={toggle}
          disabled={disabled()}
        >
          <Show when={playing()} fallback={<Play />}>
            <Pause />
          </Show>
        </button>

        <button disabled={disabled()} onClick={() => stepSong(1)}>
          <NextIcon />
        </button>
      </div>

      <div class="justify-self-end">
        <Volume volume={volumeSignal} />
      </div>

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
