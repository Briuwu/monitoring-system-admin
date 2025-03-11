import { url } from "@/appwrite";
import { AddUser, User } from "@/lib/types";
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

export const updateUser = async (user: User) => {
  return await axiosClient.put(`/users/${user.$id}`, user);
};

export const deleteUser = async (id: string) => {
  return await axiosClient.delete(`/users/${id}`);
};
