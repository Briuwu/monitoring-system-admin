import { lazy, Suspense } from "react";

import { Button } from "@/components/ui/button";
const LazyAddRequirementForm = lazy(
  () => import("@/components/add-requirement-form")
);
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
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAddRequirementForm department={searchParams.get("department")!} />
      </Suspense>
    </div>
  );
}
export default AddRequirementClientPage;
