import { url } from "@/appwrite";
import { AddRequirement, UpdateRequirement } from "@/lib/types";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: url,
  timeout: 100000,
});

/**
 * This function is used to get all the requirements.
 */
export const getAllRequirements = async (dept: string) => {
  if (dept) {
    return await axiosClient.get(`/requirements?dept=${dept}`);
  }

  return await axiosClient.get("/requirements");
};

/**
 * This function is used to get a requirement by id.
 */
export const getRequirement = async (id: string) => {
  return await axiosClient.get(`/requirements/${id}`);
};

/**
 * This function is used to add a new requirement.
 */
export const addRequirement = async (requirement: AddRequirement) => {
  return await axiosClient.post("/requirements", requirement);
};

/**
 * This function is used to update a requirement.
 */
export const updateRequirement = async (
  requirement: UpdateRequirement,
  requirementId: string
) => {
  return await axiosClient.put(`/requirements/${requirementId}`, requirement);
};

/**
 * This function is used to update the renewal of a requirement.
 */
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

/**
 * This function is used to update the document reference of a requirement.
 */
export const updateDocumentReference = async (
  requirementId: string,
  documentReference: string,
  uploadedFileUrl: string
) => {
  return await axiosClient.put(`/requirements/reference/${requirementId}`, {
    documentReference,
    uploadedFileUrl,
  });
};

/**
 * This function is used to delete a requirement.
 */
export const deleteRequirement = async (id: string) => {
  return await axiosClient.delete(`/requirements/${id}`);
};
