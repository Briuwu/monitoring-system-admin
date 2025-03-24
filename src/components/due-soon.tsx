import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchRequirements } from "@/hooks/requirements";
import { dues, getRemainingDays } from "@/lib/utils";
import { Link } from "react-router";

function DueSoon({ isClient }: { isClient?: boolean }) {
  const department = JSON.parse(localStorage.getItem("user-department")!);

  const { data: requirements, isLoading } = useFetchRequirements(
    isClient ? department : ""
  );

  if (isLoading || !requirements) {
    return <div>Loading...</div>;
  }

  const data = dues(requirements, "Active");

  const processData = dues(requirements, "On Process");

  return (
    <div className="grid grid-cols-2 gap-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-red-500">
            Active Compliance Due Soon
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            You have <span className="font-bold">{data.length}</span>{" "}
            compliances due soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y-2 overflow-y-auto sm:max-h-[325px]">
          {data.map((item) => (
            <Link
              to={`/dashboard/requirements/${item.$id}`}
              key={item.$id}
              className="flex items-center justify-between py-4 px-2 hover:bg-neutral-100"
            >
              <p className="font-semibold">{item.complianceList}</p>
              <p className="text-sm text-muted-foreground">
                Due in {getRemainingDays(item.expiration)} days
              </p>
            </Link>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-amber-500">
            Processing Compliance Due Soon
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            You have <span className="font-bold">{processData.length}</span>{" "}
            compliances due soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y-2 overflow-y-auto sm:max-h-[325px]">
          {processData.map((item) => (
            <Link
              to={`/${isClient ? "client" : "dashboard"}/requirements/${
                item.$id
              }`}
              key={item.$id}
              className="flex items-center justify-between py-4 px-2 hover:bg-neutral-100"
            >
              <p className="font-semibold">{item.complianceList}</p>
              <p className="text-sm text-muted-foreground">
                Due in {getRemainingDays(item.expiration)} days
              </p>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
export default DueSoon;
