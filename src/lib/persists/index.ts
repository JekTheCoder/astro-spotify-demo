import type { StoreApi, UseBoundStore } from "zustand";

export function persistsNavigation<S>(store: UseBoundStore<StoreApi<S>>) {}
