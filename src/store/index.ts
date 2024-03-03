import { createSignal } from "solid-js";
import type { StoreApi, UseBoundStore } from "zustand";

export function useStore<S>(store: UseBoundStore<StoreApi<S>>) {
  const [state, setState] = createSignal(store.getInitialState());
  store.subscribe((newState) => setState(() => newState));

  return state;
}
