import { useState } from "react";
import DashboardHome from "./dashboard-home";
import { Nav } from "./nav";
import RequirementsTable from "./requirements-table";
import { Button } from "@/components/ui/button";

function ClientPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Nav />
      <div className="p-5 space-y-5">
        <Button onClick={() => setOpen(!open)} className="bg-blue-500">
          Toggle Dashboard
        </Button>
        {open && <DashboardHome />}
        <RequirementsTable />
      </div>
    </div>
  );
}
export default ClientPage;
