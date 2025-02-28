import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate, Outlet } from "react-router";
import useAuth from "@/context/use-auth";
import { useEffect } from "react";

function DashboardLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  if (!user) {
    return null;
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
