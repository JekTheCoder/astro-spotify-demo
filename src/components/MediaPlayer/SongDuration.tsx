import { useStore } from "@/store";
import { currentSongTime, useMusicPlayed } from "@/store/played";
import { Slider } from "../Slider";
import { type Setter } from "solid-js";

type Props = {
  onTimeChange: (time: number) => void;
};

export default function SongDuration({ onTimeChange }: Props) {
  const musicStore = useStore(useMusicPlayed);
  const timeStore = useStore(currentSongTime);

  const invalidDuration = "00:00";

  const disabled = () => musicStore().data === null;
  const timeFormatted = () => {
    const { time } = timeStore();
    if (time == null) return invalidDuration;
    return formatTime(time);
  };

  const time = () => timeStore().time ?? 0;

  const duration = () => musicStore().data?.song?.duration ?? invalidDuration;

  return (
    <div
      class={`grid grid-cols-[auto_1fr_auto] gap-x-4 items-center ${disabled() ? "text-gray-500" : "text-white"}`}
    >
      <span>{timeFormatted()}</span>

      <Slider min={0} value={[time, onTimeChange as Setter<number>]} />

      <span>{duration()}</span>
    </div>
  );
}

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
