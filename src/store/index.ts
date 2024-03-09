import { createSignal, onMount } from "solid-js";
import type { StoreApi, Mutate } from "zustand/vanilla";

export function useStore<S>(store: Mutate<StoreApi<S>, any>) {
  const [state, setState] = createSignal(store.getInitialState());

  onMount(() => {
		setState(() => store.getState());
    store.subscribe((newState) => setState(() => newState));
  });

  return state;
}
