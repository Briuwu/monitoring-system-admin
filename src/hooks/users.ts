import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "@/actions/users";
import { account } from "@/appwrite";
import { AddUser, UpdateUserInfo, User } from "@/lib/types";
import {
  QueryObserverResult,
  UseBaseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Models } from "appwrite";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useFetchUsers = (): QueryObserverResult<User[]> => {
  return useQuery<User[]>({
    queryFn: async () => {
      const { data } = await getAllUsers();
      return data;
    },
    queryKey: ["users"],
  });
};

export const useFetchUser = (userId: string): QueryObserverResult<User> => {
  return useQuery<User>({
    queryFn: async () => {
      const { data } = await getUser(userId);
      return data;
    },
    queryKey: ["user", userId],
  });
};

export const useDeleteUser = (): UseBaseMutationResult<
  AxiosResponse,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/dashboard/users", { replace: true });
    },
  });
};

export const useAddUser = (): UseBaseMutationResult<
  AxiosResponse<AddUser>,
  unknown,
  AddUser,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: AddUser) => addUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Failed to add user. Please try again.");
      console.error("Error adding user", error);
    },
  });
};

export const useUpdateUserById = (): UseBaseMutationResult<
  AxiosResponse<UpdateUserInfo>,
  unknown,
  UpdateUserInfo,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: UpdateUserInfo) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error("Failed to update user. Please try again.");
      console.error("Error updating user", error);
    },
  });
};

export function useCurrentUser() {
  const [currentUser, setCurrentUser] =
    useState<Models.User<Models.Preferences>>();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await account.get();
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching current user", error);
      }
    };
    fetchCurrentUser();
  }, []);

  return currentUser;
}
