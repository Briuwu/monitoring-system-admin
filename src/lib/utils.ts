import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function expirationDate(dateSubmitted: string, foc: string): string {
  const date = new Date(dateSubmitted);
  switch (foc) {
    case "Monthly":
      date.setMonth(date.getMonth() + 1);
      break;
    case "Annual":
      date.setFullYear(date.getFullYear() + 1);
      break;
    case "Semi Annual":
      date.setMonth(date.getMonth() + 6);
      break;
    case "Quarterly":
      date.setMonth(date.getMonth() + 3);
      break;
    default:
      throw new Error("Invalid frequency of change");
  }
  return date.toISOString().split('T')[0];
}