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

export const AddUser = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add User</Button>
      </DialogTrigger>
      <DialogContent className="space-y-5">
        <DialogHeader>
          <DialogTitle>Create a new user</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new user.
          </DialogDescription>
        </DialogHeader>
        <AddUserForm />
      </DialogContent>
    </Dialog>
  );
};
