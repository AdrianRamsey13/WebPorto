"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { LayoutDashboard, User, FolderKanban, Briefcase, Wrench, BarChart2, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, group: "Overview" },
  { label: "Traffic", href: "/admin/traffic", icon: BarChart2, group: "Overview" },
  { label: "Profile", href: "/admin/profile", icon: User, group: "Content" },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban, group: "Content" },
  { label: "Experience", href: "/admin/experience", icon: Briefcase, group: "Content" },
  { label: "Skills", href: "/admin/skills", icon: Wrench, group: "Content" },
  { label: "Settings", href: "/admin/settings", icon: Settings, group: "System" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-5">
        <span className="text-lg font-bold tracking-tight">Porto Admin</span>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="px-2 py-3">
        {["Overview", "Content", "System"].map((group) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>
            <SidebarMenu>
              {menuItems.filter((i) => i.group === group).map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-4 py-3 text-xs text-muted-foreground">
        v0.1.0
      </SidebarFooter>
    </Sidebar>
  );
}
