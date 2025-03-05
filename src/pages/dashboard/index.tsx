import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate, Outlet } from "react-router";
import { useEffect } from "react";
import { useFetchUser } from "@/hooks/users";

function DashboardLayout() {
  const navigate = useNavigate();

  const userObj = JSON.parse(localStorage.getItem("user") || "{}");

  const { data: userData } = useFetchUser(userObj.uid);

  useEffect(() => {
    if (userData?.role !== "admin") {
      navigate("/client");
    }
  }, [navigate, userData]);
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
