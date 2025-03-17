import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, User } from "lucide-react";
import { Link } from "react-router";
import { Logout } from "./logout";

const items = [
  {
    title: "Overview",
    url: "#",
    icon: Home,
  },
  {
    title: "Requirements Table",
    url: "requirements",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "calendar",
    icon: Calendar,
  },
  {
    title: "Users",
    url: "users",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex gap-2 items-center flex-row py-4">
        <div className="w-8 aspect-square rounded-full">
          <img src="./skpi-logo.webp" alt="" />
        </div>
        <h1 className="text-black text-xs font-semibold uppercase group-data-[collapsible=icon]:hidden font-logo">
          Seiwa Kaiun Monitoring System
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={`/dashboard/${item.url}`} className="py-5">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Logout />
      </SidebarFooter>
    </Sidebar>
  );
}
