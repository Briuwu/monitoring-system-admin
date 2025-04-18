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
import { HandleProcessing } from "@/components/handle-processing";
import { useAddActivityLog } from "@/hooks/logs";
import { useCurrentUser } from "@/hooks/users";

type Props = {
  isClient?: boolean;
};

function RequirementDetails({ isClient }: Props) {
  const params = useParams();
  const navigate = useNavigate();
  const currentUser = useCurrentUser()!;
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
  const { mutate: addActivity } = useAddActivityLog();

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
                      addActivity({
                        action: `Deleted the document: '${requirement.complianceList}'`,
                        department: requirement.department,
                        email: currentUser.email,
                        userId: currentUser.$id,
                      });
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
        <div className="space-y-10">
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
                  requirement.status === "On Process" && "bg-yellow-500",
                  requirement.status === "Active" && "bg-green-500",
                  requirement.status === "Inactive" && "bg-neutral-500",
                  requirement.status === "Expired" && "bg-red-500"
                )}
              >
                {requirement.status}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                {requirement.complianceType
                  ? `${requirement.complianceType} / `
                  : ""}{" "}
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
            <p className="self-start">
              Frequency:{" "}
              <span className="bg-black text-white py-2 rounded-full px-2 font-bold uppercase">
                {requirement.frequencyOfCompliance}
              </span>
            </p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-4 place-items-center text-center">
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
              {requirement.frequencyOfCompliance !== "N/A" ? (
                <AutoRenew
                  handleRenew={() => {
                    updateRequirementRenewal({
                      renewal: formatDate(new Date(), "yyyy-MM-dd"),
                      frequency: requirement.frequencyOfCompliance,
                    });

                    addActivity({
                      action: `Renewed the document: '${requirement.complianceList}'`,
                      department: requirement.department,
                      email: currentUser.email,
                      userId: currentUser.$id,
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
              ) : (
                <p>N/A</p>
              )}
            </div>
          </div>
          <div>
            <p className="text-neutral-500">Processed Date</p>
            <p className="text-3xl font-bold text-yellow-500">
              {requirement.onProcessedDate || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-neutral-500">Expiration</p>
            <p className="text-3xl font-bold text-red-500">
              {requirement.frequencyOfCompliance === "N/A"
                ? "N/A"
                : requirement.expiration}
            </p>
          </div>
        </div>

        <Separator />
        <div className="grid grid-cols-2 gap-5">
          <HandleProcessing
            handleProcess={() => {
              const {
                complianceList,
                dateSubmitted,
                department,
                entity,
                personInCharge,
                typeOfCompliance,
                frequencyOfCompliance,
                expiration,
                complianceType,
              } = requirement;

              updateRequirementStatus({
                status: "On Process",
                dateSubmitted,
                complianceList,
                department,
                entity,
                personInCharge,
                typeOfCompliance,
                frequencyOfCompliance,
                expiration,
                onProcessedDate: formatDate(new Date(), "yyyy-MM-dd"),
                complianceType,
              });

              addActivity({
                action: `Processed the document: '${requirement.complianceList}'`,
                department: requirement.department,
                email: currentUser.email,
                userId: currentUser.$id,
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
                onProcessedDate,
                complianceType,
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
                onProcessedDate,
                complianceType,
              });

              addActivity({
                action: `Ended the document: '${requirement.complianceList}'`,
                department: requirement.department,
                email: currentUser.email,
                userId: currentUser.$id,
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
        <div className="grid gap-5 grid-cols-2">
          <Button
            className="min-h-[80px] bg-blue-500 font-black uppercase text-lg"
            onClick={() => handleViewDocument(requirement.uploadedFileUrl)}
          >
            Open Document
          </Button>
          <UploadNewDoc
            documentId={requirement.$id}
            department={requirement.department}
            addActivity={() => {
              addActivity({
                action: `Uploaded a new document: '${requirement.complianceList}'`,
                department: requirement.department,
                email: currentUser.email,
                userId: currentUser.$id,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default RequirementDetails;
