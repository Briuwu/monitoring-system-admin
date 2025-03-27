import { useFetchActivityLogs } from "@/hooks/logs";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ActivityLogsPage() {
  const { data, isLoading, isError } = useFetchActivityLogs("");

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
    <div className="space-y-10">
      <h1 className="uppercase font-bold text-2xl text-center">
        Activity Logs
      </h1>
      <DataTable
        columns={columns}
        data={data.sort(
          (a, b) =>
            new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        )}
      />
    </div>
  );
}
