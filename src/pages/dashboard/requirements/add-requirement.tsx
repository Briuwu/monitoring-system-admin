import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddRequirementForm } from "./add-requirement-form";

export const AddRequirement = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add Requirement</Button>
      </DialogTrigger>
      <DialogContent className="space-y-5 md:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Create a new requirement document</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new requirement document.
          </DialogDescription>
        </DialogHeader>
        <AddRequirementForm />
      </DialogContent>
    </Dialog>
  );
};
