import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Requirement } from "@/lib/types";
import { getRemainingDays } from "@/lib/utils";

function DueSoon({ data }: { data: Requirement[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-red-500">
          Due Soon
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          You have <span className="font-bold">{data.length}</span> subscriptions due soon.
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y-2">
        {data.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4">
            <p className="text-sm font-semibold">{item.entity}</p>
            <p className="text-sm text-muted-foreground">Due in {getRemainingDays(item.dateSubmitted, item.expiration)} days</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
export default DueSoon;
