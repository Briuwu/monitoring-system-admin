import { AddRequirement } from "@/lib/types";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const axiosClient = axios.create({
  baseURL: url,
  timeout: 100000,
});

export const getAllRequirements = async () => {
  return await axiosClient.get("/requirements");
};

export const getAllRequirementsByDept = async (dept: string) => {
  return await axiosClient.get(`/requirements?dept=${dept}`);
};

export const getRequirement = async (id: string) => {
  return await axiosClient.get(`/requirements/${id}`);
};

export const addRequirement = async (requirement: AddRequirement) => {
  return await axiosClient.post("/requirements", requirement);
};

export const updateRequirement = async (
  requirement: AddRequirement,
  requirementId: string
) => {
  return await axiosClient.put(`/requirements/${requirementId}`, requirement);
};

export const deleteRequirement = async (id: string) => {
  return await axiosClient.delete(`/requirements/${id}`);
};
