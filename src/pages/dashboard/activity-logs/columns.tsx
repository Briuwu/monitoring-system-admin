import { ColumnDef } from "@tanstack/react-table";
import { ActivityLogs } from "@/lib/types";

export const columns: ColumnDef<ActivityLogs>[] = [
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Department",
    accessorKey: "department",
  },
  {
    header: "Action",
    accessorKey: "action",
  },
  {
    header: "Date",
    accessorKey: "$createdAt",
    cell: ({ row }) => {
      const date = new Date(row.original.$createdAt);
      return date.toLocaleDateString();
    },
  },
];
