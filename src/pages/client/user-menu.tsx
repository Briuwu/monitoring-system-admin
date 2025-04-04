import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { UpdatePasswordModal } from "./update-password-modal";
import { Logout } from "@/components/logout";

export const UserMenu = () => {
  const name = JSON.parse(localStorage.getItem("name")!) ?? "User";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-emerald-500">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="text-xs">
          Welcome, <span className="font-bold">{name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <UpdatePasswordModal />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
