import { useState } from "react";
import { Nav } from "./nav";
import RequirementsTable from "./requirements-table";
import { Button } from "@/components/ui/button";
import DashboardHome from "@/components/dashboard-home";

function ClientPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Nav />
      <div className="p-5 space-y-5">
        <Button onClick={() => setOpen(!open)} className="bg-blue-500">
          Toggle Dashboard
        </Button>
        {open && <DashboardHome isClient />}
        <RequirementsTable />
      </div>
    </div>
  );
}
export default ClientPage;
