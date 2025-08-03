import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
