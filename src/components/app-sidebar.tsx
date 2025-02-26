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
import { Calendar, Home, Inbox, Settings, User } from "lucide-react";
import { Link } from "react-router";

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
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex gap-2 items-center flex-row py-4">
        <div className="w-8 h-8 rounded-full bg-neutral-400"></div>
        <h1 className="text-black text-xs font-semibold uppercase group-data-[collapsible=icon]:hidden">
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
      <SidebarFooter />
    </Sidebar>
  );
}
