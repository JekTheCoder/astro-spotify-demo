import type { Accessor, Signal } from "solid-js";

type Props = {
  value: Signal<number>;
  max?: Accessor<number>;
  min?: number;
  step?: number;
};

const defaultMax: Accessor<number> = () => 100;

export function Slider({ value, max = defaultMax, min = 1, step = 1 }: Props) {
  const [v, setV] = value;
  const bg = () => {
    const progress = (v() / max()) * 100;
    return `linear-gradient(to right, var(--slider-primary-bg) ${progress}%, var(--slider-rest-bg) ${progress}%)`;
  };

  const onChange = (event: InputEvent) => {
    const sliderEl = event.target as HTMLInputElement;
    const val = parseFloat(sliderEl.value);

    setV(val);
  };

  return (
    <input
      class="slider"
      type="range"
      min={min}
      max={max()}
      value={v()}
      step={step}
      style={{ background: bg() }}
      onInput={onChange}
    />
  );
}
