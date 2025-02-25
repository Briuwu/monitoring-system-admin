import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DueSoon() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-red-500">
          Due Soon
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          You have <span className="font-bold">2</span> subscriptions due soon.
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y-2">
        <div className="flex items-center justify-between py-4">
          <p className="text-sm font-semibold">Antivirus Software</p>
          <p className="text-sm text-muted-foreground">Due in 3 days</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p className="text-sm font-semibold">Cloud Storage Subscription</p>
          <p className="text-sm text-muted-foreground">Due in 5 days</p>
        </div>
      </CardContent>
    </Card>
  );
}
export default DueSoon;
