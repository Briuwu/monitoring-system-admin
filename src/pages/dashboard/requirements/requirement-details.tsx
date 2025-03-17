import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useDeleteRequirement,
  useFetchRequirement,
  useUpdateRequirement,
  useUpdateRequirementRenewal,
} from "@/hooks/requirements";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { useParams, useNavigate, Link } from "react-router";
import { AutoRenew } from "@/components/auto-renew";
import { UploadNewDoc } from "@/components/upload-new-doc";
import { EndOfContract } from "@/components/end-of-contract";

type Props = {
  isClient?: boolean;
};

function RequirementDetails({ isClient }: Props) {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: requirement,
    isLoading,
    isError,
  } = useFetchRequirement(params.requirementId!);
  const { mutate: deleteRequirement } = useDeleteRequirement();
  const { mutate: updateRequirementRenewal } = useUpdateRequirementRenewal(
    params.requirementId!
  );
  const { mutate: updateRequirementStatus } = useUpdateRequirement(
    params.requirementId!
  );

  // Handle viewing the document
  const handleViewDocument = (fileUrl: string) => {
    window.open(fileUrl, "_blank"); // Open the file in a new tab
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!requirement) {
    return <div>No data found</div>;
  }

  return (
    <div className={cn("max-w-5xl mx-auto space-y-5", isClient && "my-14")}>
      <div className="flex items-center justify-between">
        <Button variant={"destructive"} asChild>
          <Link to={isClient ? "/client" : "/dashboard/requirements"}>
            Back
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          {!isClient && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>Delete Document</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your document.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteRequirement(params.requirementId!);
                      navigate(
                        isClient ? "/client" : "/dashboard/requirements"
                      );
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button asChild>
            <Link
              to={`/${isClient ? "client" : "dashboard"}/requirements/update/${
                params.requirementId
              }`}
            >
              Edit Document
            </Link>
          </Button>
        </div>
      </div>
      <div className="space-y-10 border p-4 rounded-xl border-black">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <p className="text-xl text-neutral-500 font-medium">
              {requirement.entity}
            </p>
            <div className="flex items-center gap-4">
              <p className="font-bold underline text-lg">
                {requirement.documentReference}
              </p>
              <p
                className={cn(
                  "p-2 px-4 uppercase rounded-full text-white bg-black",
                  requirement.status === "Pending" && "bg-yellow-500",
                  requirement.status === "Active" && "bg-green-500",
                  requirement.status === "Inactive" && "bg-neutral-500",
                  requirement.status === "Expired" && "bg-red-500"
                )}
              >
                {requirement.status}
              </p>
            </div>
          </div>
          <h2 className="text-2xl font-bold">
            {requirement.complianceList} - {requirement.typeOfCompliance}
          </h2>
          <p className="text-neutral-500">
            Department:{" "}
            <span className="font-bold text-black">
              {requirement.department}
            </span>
          </p>
          <p className="text-neutral-500">
            Person in Charge:{" "}
            <span className="font-bold text-black">
              {requirement.personInCharge}
            </span>
          </p>
        </div>
        <Separator />
        <div className="grid grid-cols-3 place-items-center text-center">
          <div>
            <p className="text-neutral-500">Date Submitted</p>
            <p className="text-3xl font-bold">{requirement.dateSubmitted}</p>
          </div>
          <div>
            <p className="text-neutral-500">Renewal</p>
            <div>
              <p className="text-3xl font-bold text-green-500">
                {requirement.renewal}
              </p>
              <AutoRenew
                handleRenew={() => {
                  updateRequirementRenewal({
                    renewal: formatDate(new Date(), "yyyy-MM-dd"),
                    frequency: requirement.frequencyOfCompliance,
                  });
                  navigate(
                    `/${isClient ? "client" : "dashboard"}/requirements/${
                      params.requirementId
                    }`,
                    {
                      replace: true,
                    }
                  );
                }}
              />
            </div>
          </div>
          <div>
            <p className="text-neutral-500">Expiration</p>
            <p className="text-3xl font-bold text-red-500">
              {requirement.expiration}
            </p>
          </div>
        </div>
        <div className="max-w-md mx-auto">
          <EndOfContract
            handleEndContract={() => {
              const {
                complianceList,
                dateSubmitted,
                department,
                entity,
                personInCharge,
                typeOfCompliance,
                frequencyOfCompliance,
                expiration,
              } = requirement;

              updateRequirementStatus({
                status: "Inactive",
                dateSubmitted,
                complianceList,
                department,
                entity,
                personInCharge,
                typeOfCompliance,
                frequencyOfCompliance,
                expiration,
              });
              navigate(
                `/${isClient ? "client" : "dashboard"}/requirements/${
                  params.requirementId
                }`,
                {
                  replace: true,
                }
              );
            }}
          />
        </div>
        <Separator />
        <div className="grid gap-5 grid-cols-2">
          <Button
            className="min-h-[100px] bg-blue-500 font-black uppercase text-lg"
            onClick={() => handleViewDocument(requirement.uploadedFileUrl)}
          >
            Open Document
          </Button>
          <UploadNewDoc
            documentId={requirement.$id}
            department={requirement.department}
          />
        </div>
      </div>
    </div>
  );
}
export default RequirementDetails;
