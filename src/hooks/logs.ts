import { addActivity, getAllAcitivities } from "@/actions/logs";
import { ActivityLogs, AddActivityLog } from "@/lib/types";
import {
  QueryObserverResult,
  UseBaseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useFetchActivityLogs = (
  dept: string
): QueryObserverResult<ActivityLogs[]> => {
  return useQuery<ActivityLogs[]>({
    queryFn: async () => {
      const { data } = await getAllAcitivities(dept);
      return data;
    },
    queryKey: ["activity-logs"],
  });
};

export const useAddActivityLog = (): UseBaseMutationResult<
  AxiosResponse<AddActivityLog>,
  unknown,
  AddActivityLog,
  unknown
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activity: AddActivityLog) => addActivity(activity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity-logs"] });
    },
  });
};
