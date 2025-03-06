import { AddRequirement, UpdateRequirement } from "@/lib/types";
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
  requirement: UpdateRequirement,
  requirementId: string
) => {
  return await axiosClient.put(`/requirements/${requirementId}`, requirement);
};

export const updateRequirementRenewal = async (
  requirementRenewal: string,
  frequency: string,
  requirementId: string
) => {
  return await axiosClient.put(`/requirements/renewal/${requirementId}`, {
    renewal: requirementRenewal,
    frequency,
  });
};

export const updateDocumentReference = async (
  requirementId: string,
  documentReference: string
) => {
  return await axiosClient.put(`/requirements/reference/${requirementId}`, {
    documentReference,
  });
};

export const deleteRequirement = async (id: string) => {
  return await axiosClient.delete(`/requirements/${id}`);
};
