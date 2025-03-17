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
    case "2 Years":
      date.setFullYear(date.getFullYear() + 2);
      break;
    case "3 Years":
      date.setFullYear(date.getFullYear() + 3);
      break;
    case "4 Years":
      date.setFullYear(date.getFullYear() + 4);
      break;
    case "5 Years":
      date.setFullYear(date.getFullYear() + 5);
      break;
    case "10 Years":
      date.setFullYear(date.getFullYear() + 10);
      break;
    default:
      throw new Error("Invalid frequency of change");
  }
  return date.toISOString().split("T")[0];
}

export const calculateExpirationDate = (
  dateSubmitted: Date,
  frequency: string
) => {
  const date = new Date(dateSubmitted);
  switch (frequency) {
    case "Monthly":
      date.setMonth(date.getMonth() + 1);
      break;
    case "Quarterly":
      date.setMonth(date.getMonth() + 3);
      break;
    case "Semi Annual":
      date.setMonth(date.getMonth() + 6);
      break;
    case "Annual":
      date.setFullYear(date.getFullYear() + 1);
      break;
    case "2 Years":
      date.setFullYear(date.getFullYear() + 2);
      break;
    case "3 Years":
      date.setFullYear(date.getFullYear() + 3);
      break;
    case "4 Years":
      date.setFullYear(date.getFullYear() + 4);
      break;
    case "5 Years":
      date.setFullYear(date.getFullYear() + 5);
      break;
    case "10 Years":
      date.setFullYear(date.getFullYear() + 10);
      break;
    default:
      break;
  }
  return date;
};

export function getRemainingDays(expirationDate: string) {
  const currentDate = new Date();
  const expiration = new Date(expirationDate);

  const timeDifference = expiration.getTime() - currentDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
}

export function formatDateFn(date: Date) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
}

export async function delay(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
