import {
  Calendar,
  CalendarCurrentDate,
  CalendarMonthView,
  CalendarNextTrigger,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
  CalendarViewTrigger,
} from "@/components/full-calendar";
import { useFetchRequirements } from "@/hooks/requirements";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
  const { data: requirements, isLoading } = useFetchRequirements();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!requirements) {
    return <div>Add some requirements first</div>;
  }

  type ColorVariant = "green" | "pink" | "blue" | "purple";

  const events = requirements.map((requirement) => ({
    id: requirement.$id,
    start: new Date(requirement.expiration),
    title: requirement.entity,
    color: (requirement.status === "Active" ? "green" : "pink") as ColorVariant,
  }));

  return (
    <Calendar events={events}>
      <div className="h-dvh flex flex-col">
        <div className="flex px-6 items-center gap-2 mb-6">
          <CalendarViewTrigger
            view="month"
            className="aria-[current=true]:bg-accent"
          >
            Month
          </CalendarViewTrigger>

          <span className="flex-1" />

          <CalendarCurrentDate />

          <CalendarPrevTrigger>
            <ChevronLeft size={20} />
            <span className="sr-only">Previous</span>
          </CalendarPrevTrigger>

          <CalendarTodayTrigger>Today</CalendarTodayTrigger>

          <CalendarNextTrigger>
            <ChevronRight size={20} />
            <span className="sr-only">Next</span>
          </CalendarNextTrigger>
        </div>

        <div className="flex-1 px-6 overflow-hidden">
          <CalendarMonthView />
        </div>
      </div>
    </Calendar>
  );
}
