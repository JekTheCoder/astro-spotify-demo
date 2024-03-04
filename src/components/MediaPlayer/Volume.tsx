import { Show, type Accessor, type Setter } from "solid-js";
import { Slider } from "../Slider";

export type VolumeData = {
  mute: boolean;
  value: number;
};

export type Props = {
  volume: [Accessor<VolumeData>, Setter<VolumeData>];
};

function NotMutedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
      />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
      />
      <line
        x1="17"
        y1="9"
        x2="23"
        y2="15"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="23"
        y1="9"
        x2="17"
        y2="15"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default function Volume({ volume: [volume, setVolume] }: Props) {
  const toggleMute = () => {
    setVolume({ ...volume(), mute: !volume().mute });
  };

  const changeVolume = (value: number) => {
    setVolume({ mute: value === 0, value });
  };

	const fixedValue = () => volume().mute ? 0 : volume().value;

  return (
    <div class="flex items-center gap-x-2 text-white">
      <button onClick={toggleMute}>
        <Show when={volume().mute} fallback={<NotMutedIcon />}>
          <MuteIcon />
        </Show>
      </button>

      <Slider
        min={0}
        step={0.01}
        max={1}
        value={[fixedValue, changeVolume as Setter<number>]}
      />
    </div>
  );
}
