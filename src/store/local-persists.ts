import type { StateCreator, StoreMutatorIdentifier } from "zustand";
import type { PersistOptions } from "zustand/middleware";

export const localPersists: Persist = function (config) {
  return (set, get, api) => {
    return get();
  };
};

type LocalPersist<T, U> = {};

type Persist = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
  U = T,
>(
  initializer: StateCreator<T, [...Mps, ["zustand/persist", unknown]], Mcs>,
  options: LocalPersist<T, U>,
) => StateCreator<T, Mps, [["zustand/persist", U], ...Mcs]>;
