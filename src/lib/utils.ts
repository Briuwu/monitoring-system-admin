import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  return date.toISOString().split("T")[0];
}

export function getRemainingDays(expirationDate: string) {
  const currentDate = new Date();
  const expiration = new Date(expirationDate);

  const timeDifference = expiration.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
}
