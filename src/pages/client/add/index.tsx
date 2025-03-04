import { Button } from "@/components/ui/button";
import { AddRequirementForm } from "./add-requirement-form";
import { Link, useSearchParams } from "react-router";

function AddRequirementClientPage() {
  const [searchParams] = useSearchParams();

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold uppercase text-xl">
          Create new Requirement Document
        </h2>
        <Button asChild variant={"destructive"}>
          <Link to="/client">Back</Link>
        </Button>
      </div>
      <AddRequirementForm department={searchParams.get("department")!} />
    </div>
  );
}
export default AddRequirementClientPage;
