import { useFetchActivityLogs } from "@/hooks/logs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { format } from "date-fns";

export const Activities = ({
  isClient,
  dept,
}: {
  isClient?: boolean;
  dept: string;
}) => {
  const { data, isLoading, isError } = useFetchActivityLogs(
    isClient ? dept : ""
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
        <CardDescription>
          You have <span className="font-bold">{data.length}</span> activity
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y-2 sm:max-h-[400px] overflow-auto">
        {data.map((item) => (
          <div
            key={item.$id}
            className="py-4 px-2 hover:bg-neutral-100 flex items-center gap-20"
          >
            <p>{item.email}</p>
            <p className="font-semibold ml-auto">
              {item.action} in {item.department}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(item.$createdAt, "dd MMM yyyy")}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
