import {
  addRequirement,
  deleteRequirement,
  getAllRequirements,
  getRequirement,
  updateRequirement,
} from "@/actions/requirements";
import { AddRequirement, Requirement } from "@/lib/types";
import {
  QueryObserverResult,
  UseBaseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";

export const useFetchRequirements = (): QueryObserverResult<Requirement[]> => {
  return useQuery<Requirement[]>({
    queryFn: async () => {
      const { data } = await getAllRequirements();
      return data;
    },
    queryKey: ["requirements"],
    select: (data: Requirement[]) => [...data],
  });
};

export const useFetchRequirement = (
  requirementId: string
): QueryObserverResult<Requirement> => {
  return useQuery<Requirement>({
    queryFn: async () => {
      const { data } = await getRequirement(requirementId);
      return data;
    },
    queryKey: ["requirement", requirementId],
  });
};

export const useDeleteRequirement = (): UseBaseMutationResult<
  AxiosResponse,
  unknown,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (id: string) => deleteRequirement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
      navigate("/dashboard/requirements", { replace: true });
    },
  });
};

export const useAddRequirement = (): UseBaseMutationResult<
  AxiosResponse<AddRequirement>,
  unknown,
  AddRequirement,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (requirement: AddRequirement) => addRequirement(requirement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
      navigate("/dashboard/requirements", { replace: true });
    },
  });
};

export const useUpdateRequirement = (
  requirementId: string
): UseBaseMutationResult<
  AxiosResponse<AddRequirement>,
  unknown,
  AddRequirement,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (requirement: AddRequirement) =>
      updateRequirement(requirement, requirementId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requirements"],
      });
      navigate(`/dashboard/requirements/${requirementId}`, { replace: true });
    },
  });
};
