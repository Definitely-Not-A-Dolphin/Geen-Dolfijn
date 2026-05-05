import { bounds, BoundsFrom, disabled } from "@neodrag/svelte";
import { createContext } from "svelte";

export const [getNeoDragContext, setNeoDragContext] = createContext<
  { movable: boolean }
>();

export const neoDragConfig = (movable: boolean) => [
  bounds(BoundsFrom.viewport()),
  disabled(!movable),
];

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
