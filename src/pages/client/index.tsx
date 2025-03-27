import { useState, lazy, Suspense } from "react";
import { Nav } from "./nav";
import { Button } from "@/components/ui/button";

const LazyRequirementsTable = lazy(() => import("./requirements-table"));
const LazyDashboardHome = lazy(() => import("@/components/dashboard-home"));

function ClientPage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Nav />
      <div className="p-5 space-y-5">
        <Button onClick={() => setOpen(!open)} className="bg-blue-500">
          Toggle Dashboard
        </Button>
        {open && (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyDashboardHome isClient />
          </Suspense>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <LazyRequirementsTable />
        </Suspense>
      </div>
    </div>
  );
}
export default ClientPage;
