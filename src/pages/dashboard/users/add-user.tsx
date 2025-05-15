import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddUserForm } from "./add-user-form";
import { useState } from "react";

/**
 * This is the main add user component for the monitoring system.
 * It is used to add a new user to the monitoring system.
 */
export const AddUser = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add User</Button>
      </DialogTrigger>
      <DialogContent className="space-y-5 md:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a new user</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new user.
          </DialogDescription>
        </DialogHeader>
        <AddUserForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};
