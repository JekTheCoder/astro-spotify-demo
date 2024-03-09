import { useStore } from "@/store";
import { currentSongTimeStore, musicPlayedStore } from "@/store/played";
import { Slider } from "../Slider";
import { type Setter } from "solid-js";

type Props = {
  onTimeChange: (time: number) => void;
};

export default function SongDuration({ onTimeChange }: Props) {
  const musicStore = useStore(musicPlayedStore);
  const timeStore = useStore(currentSongTimeStore);

  const invalidDuration = "00:00";

  const disabled = () => musicStore().data === null;
  const timeFormatted = () => {
    const { time } = timeStore();
    if (time == null) return invalidDuration;
    return formatTime(time);
  };

  const time = () => timeStore().time ?? 0;

  const durationFormatted = () =>
    musicStore().data?.song?.duration ?? invalidDuration;

  const duration = () => {
    const { data } = musicStore();
    if (!data) return 0;

    return parseDuration(data.song.duration);
  };

  return (
    <div
      class={`grid grid-cols-[auto_1fr_auto] gap-x-4 items-center ${disabled() ? "text-gray-500" : "text-white"}`}
    >
      <span class="w-10">{timeFormatted()}</span>

      <Slider
        min={0}
        value={[time, onTimeChange as Setter<number>]}
        max={duration}
      />

      <span class="w-10 text-end">{durationFormatted()}</span>
    </div>
  );
}

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function parseDuration(duration: string): number {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
}
