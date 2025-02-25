import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
export default DashboardLayout;
