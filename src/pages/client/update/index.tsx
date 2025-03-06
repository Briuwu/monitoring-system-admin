import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { UpdateRequirementClientForm } from "./update-requirement-form";
import { useParams } from "react-router";
import { useFetchRequirement } from "@/hooks/requirements";

function UpdateRequirementClientPage() {
  const params = useParams();
  const { data: requirement, isLoading } = useFetchRequirement(
    params.requirementId!
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold uppercase text-xl">
          Update Requirement Document
        </h2>
        <Button asChild variant={"destructive"}>
          <Link to="/client">Back</Link>
        </Button>
      </div>
      <UpdateRequirementClientForm requirement={requirement!} />
    </div>
  );
}
export default UpdateRequirementClientPage;
