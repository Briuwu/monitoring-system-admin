import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchRequirementsByDept } from "@/hooks/requirements";
import { dues, getRemainingDays } from "@/lib/utils";
import { Link } from "react-router";

function DueSoon() {
  const department = JSON.parse(localStorage.getItem("user-department")!);
  const { data: requirements, isLoading } =
    useFetchRequirementsByDept(department);

  if (isLoading || !requirements) {
    return <div>Loading...</div>;
  }

  const data = dues(requirements);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-red-500">
          Due Soon
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          You have <span className="font-bold">{data.length}</span>{" "}
          subscriptions due soon.
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y-2 overflow-y-auto sm:max-h-[325px]">
        {data.map((item) => (
          <Link
            to={`/client/requirements/${item.$id}`}
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
  );
}
export default DueSoon;
