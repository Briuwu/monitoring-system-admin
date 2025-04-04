import { account, url } from "@/appwrite";
import { AddUser, UpdateUserInfo } from "@/lib/types";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: url,
  timeout: 100000,
});

export const getAllUsers = async () => {
  return await axiosClient.get("/users");
};

export const getUser = async (id: string) => {
  return await axiosClient.get(`/users/${id}`);
};

export const addUser = async (user: AddUser) => {
  return await axiosClient.post("/users", user);
};

export const updateUser = async (user: UpdateUserInfo) => {
  return await axiosClient.put(`/users/${user.$id}`, user);
};

export const deleteUser = async (id: string) => {
  return await axiosClient.delete(`/users/${id}`);
};

export const updateUserPassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    return await account.updatePassword(newPassword, oldPassword);
  } catch (error) {
    throw new Error("Failed to update password: " + error);
  }
};
