import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
