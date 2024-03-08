import type { StoreApi, UseBoundStore } from "zustand";
import { musicPlayedStore } from "./played";

export function onLoad() {
  musicPlayedStore.getState().pause();
}

setTimeout(onLoad, 100);

function persistStore(store: UseBoundStore<StoreApi<unknown>>, name: string) {
  document.addEventListener("astro:page-load", () => {
    const item = localStorage.getItem(name);
    if (!item) return;

    const parsed = JSON.parse(item);
    console.log("parsed", parsed);
    store.setState(parsed);
  });

  document.addEventListener("astro:before-swap", () => {
    localStorage.setItem(name, JSON.stringify(store.getState()));
  });
}

persistStore(musicPlayedStore, "music-played");
