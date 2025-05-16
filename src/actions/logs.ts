import { url } from "@/appwrite";
import { AddActivityLog } from "@/lib/types";
import axios from "axios";

/**
 * This is the axios client for the activity logs.
 */
const axiosClient = axios.create({
  baseURL: url,
  timeout: 100000,
});

/**
 * This function is used to get all the activity logs.
 */
export const getAllAcitivities = async (dept: string) => {
  if (dept) {
    return await axiosClient.get(`/activity-logs?dept=${dept}`);
  }

  return await axiosClient.get("/activity-logs");
};

/**
 * This function is used to add a new activity log.
 */
export const addActivity = async (data: AddActivityLog) => {
  return await axiosClient.post("/activity-logs", data);
};
