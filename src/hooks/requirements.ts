import {
  addRequirement,
  deleteRequirement,
  getAllRequirements,
  getAllRequirementsByDept,
  getRequirement,
  updateRequirement,
  updateRequirementRenewal,
} from "@/actions/requirements";
import { AddRequirement, Requirement, UpdateRequirement } from "@/lib/types";
import {
  QueryObserverResult,
  UseBaseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

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

export const useFetchRequirementsByDept = (
  dept: string
): QueryObserverResult<Requirement[]> => {
  return useQuery<Requirement[]>({
    queryFn: async () => {
      const { data } = await getAllRequirementsByDept(dept);
      return data;
    },
    queryKey: ["requirements", dept],
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
  return useMutation({
    mutationFn: (id: string) => deleteRequirement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
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
  return useMutation({
    mutationFn: (requirement: AddRequirement) => addRequirement(requirement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requirements"] });
    },
  });
};

export const useUpdateRequirement = (
  requirementId: string
): UseBaseMutationResult<
  AxiosResponse<UpdateRequirement>,
  unknown,
  UpdateRequirement,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requirement: UpdateRequirement) =>
      updateRequirement(requirement, requirementId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requirement"],
      });
    },
  });
};

export const useUpdateRequirementRenewal = (
  requirementId: string
): UseBaseMutationResult<
  AxiosResponse<string>,
  unknown,
  {
    renewal: string;
    frequency: string;
  },
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ renewal, frequency }) =>
      updateRequirementRenewal(renewal, frequency, requirementId),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
