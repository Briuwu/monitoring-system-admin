import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Requirement } from "./types";

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

export const dues = (requirements: Requirement[], status: string) => {
  const frequencyConfig = {
    annual: { daysThreshold: 90, interval: "year" },
    "2 years": { daysThreshold: 90, interval: "2 years" },
    "3 years": { daysThreshold: 90, interval: "3 years" },
    "4 years": { daysThreshold: 90, interval: "4 years" },
    "5 years": { daysThreshold: 90, interval: "5 years" },
    "10 years": { daysThreshold: 180, interval: "10 years" },
    "semi annual": { daysThreshold: 60, interval: "semi-annual" },
    others: { daysThreshold: 15, interval: "others" },
    quarterly: { daysThreshold: 40, interval: "quarter" },
    monthly: { daysThreshold: 15, interval: "month" },
  };

  const dueSoonRequirements = requirements
    .filter((item) => {
      const remainingDays = getRemainingDays(item.expiration);
      const config =
        frequencyConfig[
          item.frequencyOfCompliance.toLowerCase() as keyof typeof frequencyConfig
        ];

      return (
        config && remainingDays > 0 && remainingDays < config.daysThreshold
      );
    })
    .sort(
      (a, b) => getRemainingDays(a.expiration) - getRemainingDays(b.expiration)
    );

  return dueSoonRequirements.filter((item) => item.status === status);
};

export const getDashboardData = (requirements: Requirement[]) => {
  // Optimize status filtering with a single pass through the array
  const subscriptions = requirements.reduce(
    (acc, item) => {
      const status = item.status.toLowerCase();
      switch (status) {
        case "active":
          acc.active.push(item);
          break;
        case "expired":
          acc.inactive.push(item);
          break;
        case "on process":
          acc.pending.push(item);
          break;
      }
      return acc;
    },
    {
      active: [] as Requirement[],
      inactive: [] as Requirement[],
      pending: [] as Requirement[],
      total: requirements,
    }
  );

  // Optimize frequency counting with a single pass through the array
  const frequencyCounts = requirements.reduce((acc, item) => {
    const frequency = item.frequencyOfCompliance.toLowerCase();
    acc[frequency] = (acc[frequency] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Create chart data dynamically based on frequency counts
  const frequencyMappings = [
    { date: "Monthly", key: "monthly", fill: "#DE3163" },
    { date: "Quarterly", key: "quarterly", fill: "#A6F1E0" },
    { date: "SemiAnnual", key: "semi annual", fill: "#3D8D7A" },
    { date: "Annual", key: "annual", fill: "#FDB7EA" },
    { date: "2 Years", key: "2 years", fill: "#C7D9DD" },
    { date: "3 Years", key: "3 years", fill: "#F2E2B1" },
    { date: "4 Years", key: "4 years", fill: "#E6B2BA" },
    { date: "5 Years", key: "5 years", fill: "#EBE5C2" },
    { date: "10 Years", key: "10 years", fill: "#FADA7A" },
    { date: "N/A", key: "n/a", fill: "#C4C4C4" },
    { date: "Others", key: "others", fill: "#F2B5D4" },
  ];

  const chartData = frequencyMappings.map((mapping) => ({
    date: mapping.date,
    value: frequencyCounts[mapping.key] || 0,
    fill: mapping.fill,
  }));

  return { subscriptions, chartData };
};
