import { account } from "@/appwrite";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router";

function DashboardLayout() {
  useEffect(() => {
    const fetch = async () => {
      const data = await account.get();

      if (data.labels[0] !== "admin") window.location.href = "/client";
    };
    fetch();
  }, []);

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="p-4 w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
export default DashboardLayout;
