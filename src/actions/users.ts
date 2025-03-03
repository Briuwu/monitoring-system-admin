import { User, UserCredentials } from "@/lib/types";
import axios from 'axios'

const url = import.meta.env.VITE_API_URL;
const axiosClient = axios.create({
    baseURL: url,
    timeout: 100000,
});

export const loginUser = async (user: UserCredentials) => {
    const response = await axiosClient.post('/users/login', user);
    const data = await response.data;
    return data;
}

export const getAllUsers = async () => {
    const response = await axiosClient.get('/users');
    const data = await response.data;
    return data;
};

export const getUser = async (id: string) => {
    const response = await axiosClient.get(`/users/${id}`);
    const data = await response.data;
    return data;
};

export const addUser = async (user: User) => {
    return await axiosClient.post("/users", user);
};

export const updateUser = async (user: User) => {
    return await axiosClient.put(`/users/${user.id}`, user)
};

export const deleteUser = async (id: string) => {
    return await axiosClient.delete(`/users/${id}`);
};
