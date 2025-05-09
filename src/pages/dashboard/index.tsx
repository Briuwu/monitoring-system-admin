import { account } from "@/appwrite";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

function DashboardLayout() {
  const [isLoading, setIsLoading] = useState(true);
  let user = JSON.parse(localStorage.getItem("session") || "false");
  useEffect(() => {
    const fetch = async () => {
      try {
        if (user) {
          const data = await account.get();
          if (data.labels[0] !== "admin") window.location.href = "/client";
        } else {
          localStorage.clear();
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  if (isLoading) return null;

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
