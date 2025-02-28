import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";

function DashboardLayout() {
  // const navigate = useNavigate();

  const [user, setUser] = useState<User | null>();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user)
    });

    return () => unsubscribe()    
  }, [])


  // if(!user) {
  //   navigate('/');
  // }

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
