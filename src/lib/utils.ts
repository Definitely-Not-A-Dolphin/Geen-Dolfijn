import { bounds, BoundsFrom, disabled } from "@neodrag/svelte";
import { getContext, setContext } from "svelte";

export function setDragContext<T>(key: string, thing: T): void {
  setContext(key, thing);
}

export function getDragContext<T>(key: string): T {
  return getContext(key) as T;
}

export const neoDragConfig = (x: boolean) => [
  bounds(BoundsFrom.viewport()),
  disabled(!x),
];

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
