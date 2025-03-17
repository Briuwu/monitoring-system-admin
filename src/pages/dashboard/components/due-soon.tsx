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

function DueSoon() {
  const { data: requirements, isLoading } = useFetchRequirements();

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
            to={`/dashboard/requirements/${item.$id}`}
            key={item.$id}
            className="flex items-center justify-between py-4"
          >
            <p className="text-sm font-semibold">{item.complianceList}</p>
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
