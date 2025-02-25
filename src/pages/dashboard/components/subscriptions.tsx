import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

type Props = {
  item: {
    id: number;
    title: string;
    value: number;
    color: string;
  };
};

export const Subscriptions = ({ item: { id, title, value, color } }: Props) => {
  return (
    <div key={id} className={cn("p-4 rounded-xl space-y-1 text-white", color)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{title}</p>
        <Dialog>
          <DialogTrigger>
            <Users className="w-5" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Showing {title}</DialogTitle>
              <DialogDescription>
                You have {value} {title.toLowerCase()}.
              </DialogDescription>
            </DialogHeader>
            <div>
              {[...Array(value)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <p className="text-sm font-semibold">
                    Subscription {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
};
