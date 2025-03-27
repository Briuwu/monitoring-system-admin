import { url } from "@/appwrite";
import { AddActivityLog } from "@/lib/types";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: url,
  timeout: 100000,
});

export const getAllAcitivities = async (dept: string) => {
  if (dept) {
    return await axiosClient.get(`/activity-logs?dept=${dept}`);
  }

  return await axiosClient.get("/activity-logs");
};

export const addActivity = async (data: AddActivityLog) => {
  return await axiosClient.post("/activity-logs", data);
};
