import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Requirement } from "@/lib/types";

import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import { Link } from "react-router";

type Props = {
  title: string;
  item: Requirement[];
  color: string;
};

export const Subscriptions = ({ title, item, color }: Props) => {
  const value = item.length;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "p-4 rounded-xl space-y-1 h-auto text-white hover:scale-101 transition-transform cursor-pointer",
            color
          )}
        >
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{title}</p>
              <Users className="w-5" />
            </div>
            <p className="text-xl font-bold text-left">{value}</p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="md:max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Showing {title}</DialogTitle>
          <DialogDescription>
            You have {value} {title.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          {item.map((item) => (
            <Link
              to={`/dashboard/requirements/${item.$id}`}
              key={item.$id}
              className="text-sm flex items-center justify-between p-2 bg-white rounded-lg shadow"
            >
              <div className="flex flex-col">
                <span className="font-bold">{item.complianceList}</span>
                <span
                  className={cn(
                    "uppercase text-xs",
                    item.frequencyOfCompliance === "Annual"
                      ? "text-green-500"
                      : item.frequencyOfCompliance === "Semi Annual"
                      ? "text-red-500"
                      : item.frequencyOfCompliance === "Quarterly"
                      ? "text-yellow-500"
                      : item.frequencyOfCompliance === "Monthly"
                      ? "text-blue-500"
                      : "text-neutral-500"
                  )}
                >
                  {item.frequencyOfCompliance}
                </span>
              </div>
              <span className="text-neutral-500">{item.department}</span>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
