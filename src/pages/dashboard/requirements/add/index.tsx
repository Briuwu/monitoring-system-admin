import { Button } from "@/components/ui/button";
import { AddRequirementForm } from "@/components/add-requirement-form";
import { Link } from "react-router";

function AddRequirementPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold uppercase text-xl">
          Create new Requirement Document
        </h2>
        <Button asChild variant={"destructive"}>
          <Link to="/dashboard/requirements">Back</Link>
        </Button>
      </div>
      <AddRequirementForm />
    </div>
  );
}
export default AddRequirementPage;
