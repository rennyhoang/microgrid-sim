'use client'
import { Home, Search, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from 'next/link'; // Import Link from Next.js for client-side navigation
import { usePathname } from "next/navigation";
import { useState } from "react";
 
export function AppSidebar() {
    const pathname = usePathname();
    const items = [
        {
          title: "Home",
          url: "/",
          icon: Home,
        },
        {
          title: "Interactive",
          url: "/interactive",
          icon: Search,
        },
      ]
    return (
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                      <Link href={item.url} className={pathname === item.url ? 'active' : ''}>
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
        </Sidebar>
      );
}