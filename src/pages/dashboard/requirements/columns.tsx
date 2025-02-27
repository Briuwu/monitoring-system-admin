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
import { Link } from "react-router";
import { Requirement } from "@/hooks/use-requirement";

export const columns: ColumnDef<Requirement>[] = [
  {
    header: "Entity",
    accessorKey: "entity",
  },
  {
    header: "Compliance List",
    accessorKey: "complianceList",
  },
  {
    header: "Department",
    accessorKey: "department",
  },
  {
    header: "Frequency of Compliance",
    accessorKey: "frequencyOfCompliance",
  },
  {
    header: "Type of Compliance",
    accessorKey: "typeOfCompliance",
  },
  {
    accessorKey: "dateSubmitted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Submitted" />
    ),
  },
  {
    accessorKey: "expiration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiration" />
    ),
  },
  {
    header: "Remaining Days",
    cell: ({ row }) => {
      const renewal = row.original.renewal;
      const calculateRemainingDays = (renewal: string) => {
        const currentDate = new Date();
        const renewalDate = new Date(renewal);
        const timeDiff = renewalDate.getTime() - currentDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
      };

      return calculateRemainingDays(renewal);
    },
  },
  {
    accessorKey: "renewal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Renewal" />
    ),
  },
  {
    header: "Person in Charge",
    accessorKey: "personInCharge",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Document Reference",
    accessorKey: "documentReference",
    cell: ({ row }) => {
      const document = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <span>{document.documentReference}</span>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                to={`/dashboard/requirements/${row.original.id}`}
                className="flex items-center gap-2"
              >
                <FileText />
                Open Document
              </Link>
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
