import type { Repository } from "./customTypes.ts";

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function arrayChecker(theArray: any[], element: any): boolean {
  for (const comparer in theArray) {
    if (comparer === element) {
      return true;
    }
  }

  return false;
}
