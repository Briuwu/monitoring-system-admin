import { addUser, deleteUser, getAllUsers, getUser } from "@/actions/users";
import { AddUser, User } from "@/lib/types";
import {
  QueryObserverResult,
  UseBaseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
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
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (user: AddUser) => addUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/dashboard/users", { replace: true });
    },
    onError: (error) => {
      toast.error("Failed to add user. Please try again.");
      console.error("Error adding user", error);
    },
  });
};
