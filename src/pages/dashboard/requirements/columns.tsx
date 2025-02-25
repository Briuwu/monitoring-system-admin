import { ColumnDef } from "@tanstack/react-table";

type Requirements = {
  id: string;
  compliance_list: string;
  department: string;
  entity: string;
  frequency_of_compliance: string;
  type_of_compliance: string;
  date_submitted: Date;
  expiration: Date;
  remaining_days: number;
  renewal: Date;
  person_in_charge: string;
  status: string;
  document_reference: string;
};

export const columns: ColumnDef<Requirements>[] = [
  {
    header: "Compliance List",
    accessorKey: "compliance_list",
  },
  {
    header: "Department",
    accessorKey: "department",
  },
  {
    header: "Entity",
    accessorKey: "entity",
  },
  {
    header: "Frequency of Compliance",
    accessorKey: "frequency_of_compliance",
  },
  {
    header: "Type of Compliance",
    accessorKey: "type_of_compliance",
  },
  {
    accessorKey: "date_submitted",
    header: "Date Submitted",
    cell: ({ row }) => {
      const date = row.getValue("date_submitted") as Date;
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return formattedDate;
    },
  },
  {
    header: "Expiration",
    accessorKey: "expiration",
    cell: ({ row }) => {
      const date = row.getValue("expiration") as Date;
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return formattedDate;
    },
  },
  {
    header: "Remaining Days",
    accessorKey: "remaining_days",
  },
  {
    header: "Renewal",
    accessorKey: "renewal",
    cell: ({ row }) => {
      const date = row.getValue("renewal") as Date;
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return formattedDate;
    },
  },
  {
    header: "Person in Charge",
    accessorKey: "person_in_charge",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Document Reference",
    accessorKey: "document_reference",
  },
];
