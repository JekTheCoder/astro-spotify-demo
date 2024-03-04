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

export default function MediaPlayer() {
  const musicStore = useStore(useMusicPlayed);
  const volumeSignal = createSignal<VolumeData>({
    value: .1,
    mute: false,
  });

  const audio = (<audio src=""></audio>) as HTMLAudioElement;

  const toggle = () => musicStore().toggle();
  const disabled = () => musicStore().data === null;
  const playing = () => Boolean(musicStore().data?.isPlaying);
	const song = () => musicStore().data?.song;

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
      class={`px-4 py-2 flex items-center justify-between ${disabled() ? "text-gray-500" : "text-white"}`}
    >
      <div class="h-16">
				<Show when={song()}>
					{song => <SongPlayed song={song} />}
				</Show>
			</div>

      <div>
        <button onClick={toggle} disabled={disabled()}>
          <Show when={playing()} fallback={<Play />}>
            <Pause />
          </Show>
        </button>
      </div>

      <div>
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
