import { AddRequirement, Requirement } from "@/lib/types";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const axiosClient = axios.create({
  baseURL: url,
  timeout: 100000,
});

export const getAllRequirements = async () => {
  return await axiosClient.get("/requirements");
};

export const getRequirement = async (id: string) => {
  return await axiosClient.get(`/requirements/${id}`);
};

export const addRequirement = async (requirement: AddRequirement) => {
  return await axiosClient.post("/requirements", requirement);
};

export const updateRequirement = async (requirement: Requirement) => {
  return await axiosClient.put(`/requirements/${requirement.id}`, requirement);
};

export const deleteRequirement = async (id: string) => {
  return await axiosClient.delete(`/requirements/${id}`);
};
