import { account } from "@/appwrite";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

function DashboardLayout() {
  const [isLoading, setIsLoading] = useState(true);

  /**
   * This is the main layout for the dashboard.
   * It is used to wrap the sidebar and the main content.
   * It is used to check if the user is logged in and if the user is not logged in, it redirects to the login page.
   * It is used to check if the user is an admin and if the user is not an admin, it redirects to the client page.
   *
   */
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await account.get();
        if (data.labels[0] !== "admin") window.location.href = "/client";
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
