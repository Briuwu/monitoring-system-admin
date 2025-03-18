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
  const annualDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "annual" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 90
  );

  const twoYearsDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "2 years" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 90
  );

  const threeYearsDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "3 years" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 90
  );

  const fourYearsDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "4 years" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 90
  );

  const fiveYearsDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "5 years" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 90
  );

  const tenYearsDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "10 years" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 180
  );

  const semiAnnualDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "semi annual" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 60
  );

  const quarterlyDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "quarterly" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 40
  );

  const monthlyDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "monthly" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 30
  );

  const data = [
    ...annualDueSoon,
    ...semiAnnualDueSoon,
    ...quarterlyDueSoon,
    ...monthlyDueSoon,
    ...twoYearsDueSoon,
    ...threeYearsDueSoon,
    ...fourYearsDueSoon,
    ...fiveYearsDueSoon,
    ...tenYearsDueSoon,
  ].sort((a, b) => {
    return getRemainingDays(a.expiration) - getRemainingDays(b.expiration);
  });

  return data.filter((item) => item.status === status);
};

export const getDashboardData = (requirements: Requirement[]) => {
  const subscriptionCounts = {
    active: requirements.filter(
      (item) => item.status.toLowerCase() === "active"
    ),
    inactive: requirements.filter(
      (item) => item.status.toLowerCase() === "inactive"
    ),
    pending: requirements.filter(
      (item) => item.status.toLowerCase() === "on process"
    ),
    total: requirements,
  };

  const annualValue = requirements.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "annual"
  ).length;

  const twoYearsValue = requirements.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "2 years"
  ).length;

  const threeYearsValue = requirements.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "3 years"
  ).length;

  const fourYearsValue = requirements.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "4 years"
  ).length;

  const fiveYearsValue = requirements.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "5 years"
  ).length;

  const tenYearsValue = requirements.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "10 years"
  ).length;

  const semiAnnualValue = requirements.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "semi annual"
  ).length;

  const quarterlyValue = requirements.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "quarterly"
  ).length;

  const monthlyValue = requirements.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "monthly"
  ).length;

  const chartData = [
    {
      date: "Monthly",
      value: monthlyValue,
      fill: "#DE3163",
    },
    {
      date: "Quarterly",
      value: quarterlyValue,
      fill: "#A6F1E0",
    },
    {
      date: "SemiAnnual",
      value: semiAnnualValue,
      fill: "#3D8D7A",
    },
    {
      date: "Annual",
      value: annualValue,
      fill: "#FDB7EA",
    },
    {
      date: "2 Years",
      value: twoYearsValue,
      fill: "#C7D9DD",
    },
    {
      date: "3 Years",
      value: threeYearsValue,
      fill: "#F2E2B1",
    },
    {
      date: "4 Years",
      value: fourYearsValue,
      fill: "#E6B2BA",
    },
    {
      date: "5 Years",
      value: fiveYearsValue,
      fill: "#EBE5C2",
    },
    {
      date: "10 Years",
      value: tenYearsValue,
      fill: "#FADA7A",
    },
  ];

  return { subscriptionCounts, chartData };
};
