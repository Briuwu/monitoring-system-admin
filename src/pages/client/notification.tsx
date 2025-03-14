import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import DueSoon from "./due-soon";

export const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Bell />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" className="mt-5 max-w-md">
        <DropdownMenuLabel>Notification</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DueSoon />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
