import { useFetchActivityLogs } from "@/hooks/logs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
          You have <span className="font-bold">1</span> activity
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y-2 sm:max-h-[400px] overflow-auto">
        {data.map((item) => (
          <div
            key={item.$id}
            className="flex items-center justify-between py-4 px-2 hover:bg-neutral-100"
          >
            <p>{item.email}</p>
            <p className="font-semibold">
              {item.action} in {item.department}
            </p>
            <p className="text-sm text-muted-foreground">{item.$createdAt}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
