import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router";

function DashboardLayout() {
  const user = JSON.parse(localStorage.getItem("user-email")!) as string;
  useEffect(() => {
    if (user !== import.meta.env.VITE_ADMIN_EMAIL) {
      window.location.href = "/client";
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
export default DashboardLayout;
