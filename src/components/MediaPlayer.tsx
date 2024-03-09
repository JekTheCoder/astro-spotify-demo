import { useStore } from "@/store";
import {
  musicPlayedStore,
  type MusicPlayedStore,
  type MusicPlayed,
  currentSongTimeStore,
} from "@/store/played";
import { Show, createEffect, createSignal, onMount } from "solid-js";
import { Pause, Play } from "./solid-buttons";
import Volume, { type VolumeData } from "./MediaPlayer/Volume";
import SongPlayed from "./SongPlayed";
import SongDuration from "./MediaPlayer/SongDuration";

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
  const music = useStore(musicPlayedStore);
  const volumeSignal = createSignal<VolumeData>({
    value: 0.1,
    mute: false,
  });
  const currentSongTime = useStore(currentSongTimeStore);

  const onTimeUpdate = () => currentSongTime().update(audio.currentTime);

  const audio = (
    <audio onTimeUpdate={onTimeUpdate}></audio>
  ) as HTMLAudioElement;

  onMount(() => {
    audio.currentTime = currentSongTime().time ?? 0;
  });

  const disabled = () => music().data === null;
  const playing = () => Boolean(music().data?.isPlaying);
  const song = () => music().data?.song;

  const toggle = () => music().toggle();
  const stepSong = (step: number) => music().stepSong(step);

  const setCurrentTime = (time: number) => {
    audio.currentTime = time;
  };

  createEffect<MusicPlayedStore>((prev) => {
    const { data } = music();

    musicEffect(prev?.data, data, audio);

    return music();
  }, music());

  createEffect(() =>
    musicPlayedStore.subscribe(({ data }) => {
      if (!data) return;

      if (data.isPlaying) audio.play();
      else audio.pause();
    }),
  );

  createEffect(() => {
    const [volume] = volumeSignal;
    audio.volume = volume().value;
    audio.muted = volume().mute;
  });

  return (
    <div
      class={`px-4 py-2 grid grid-cols-3 gap-x-6 items-center ${disabled() ? "text-gray-500" : "text-white"}`}
    >
      <div class="h-16 justify-self-start">
        <Show when={song()}>{(song) => <SongPlayed song={song} />}</Show>
      </div>

      <div class="flex flex-col  justify-self-center">
        <div class="flex gap-x-6 justify-center">
          <button
            disabled={disabled()}
            class="-scale-x-100"
            onClick={() => stepSong(-1)}
          >
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

        <SongDuration onTimeChange={setCurrentTime} />
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
  data: MusicPlayed | null,
  audio: HTMLAudioElement,
) {
  if (!data) {
    audio.src = "";
    return;
  }

  const { musicId, albumId } = data;

  if (!prev || musicId !== prev.musicId || albumId !== prev.albumId) {
    const musicIdStr = musicId.toString().padStart(2, "0");
    audio.src = `/music/${albumId}/${musicIdStr}.mp3`;
  }
}
