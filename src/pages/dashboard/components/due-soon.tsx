import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchRequirements } from "@/hooks/requirements";
import { getRemainingDays } from "@/lib/utils";
import { Link } from "react-router";

function DueSoon() {
  const { data: requirements, isLoading } = useFetchRequirements();

  if (isLoading || !requirements) {
    return <div>Loading...</div>;
  }
  const annualDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "annual" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 90
  );

  const semiAnnualDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "semi annual" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 60
  );

  const quarterlyDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "quarterly" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 40
  );

  const monthlyDueSoon = requirements.filter(
    (item) =>
      item.frequencyOfCompliance.toLowerCase() === "monthly" &&
      getRemainingDays(item.expiration) > 0 &&
      getRemainingDays(item.expiration) < 30
  );

  const data = [
    ...annualDueSoon,
    ...semiAnnualDueSoon,
    ...quarterlyDueSoon,
    ...monthlyDueSoon,
  ].sort((a, b) => {
    return getRemainingDays(a.expiration) - getRemainingDays(b.expiration);
  });

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
            to={`/dashboard/requirements/${item.id}`}
            key={item.id}
            className="flex items-center justify-between py-4"
          >
            <p className="text-sm font-semibold">{item.entity}</p>
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
