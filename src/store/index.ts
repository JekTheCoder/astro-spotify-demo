import { createSignal, onMount } from "solid-js";
import type { StoreApi, UseBoundStore } from "zustand";

export function useStore<S>(store: UseBoundStore<StoreApi<S>>) {
  const [state, setState] = createSignal(store.getInitialState());

  onMount(() => {
		setState(() => store.getState());
    store.subscribe((newState) => setState(() => newState));
  });

  return state;
}
