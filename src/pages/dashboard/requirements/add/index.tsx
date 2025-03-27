import { lazy, Suspense } from "react";

const AddRequirementForm = lazy(
  () => import("@/components/add-requirement-form")
);
import { Button } from "@/components/ui/button";
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
      <Suspense fallback={<div>Loading...</div>}>
        <AddRequirementForm />
      </Suspense>
    </div>
  );
}
export default AddRequirementPage;
