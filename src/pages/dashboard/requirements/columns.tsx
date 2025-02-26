import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../components/data-table-column-header";
import { Ellipsis, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    header: "Entity",
    accessorKey: "entity",
  },
  {
    header: "Compliance List",
    accessorKey: "compliance_list",
  },
  {
    header: "Department",
    accessorKey: "department",
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Submitted" />
    ),
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
    accessorKey: "expiration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiration" />
    ),
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
    accessorKey: "remaining_days",
    header: "Remaining Days",
  },
  {
    accessorKey: "renewal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Renewal" />
    ),
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
    cell: ({ row }) => {
      const document = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <span>{document.document_reference}</span>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <FileText />
              Open Document
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Upload />
              Upload Document
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
