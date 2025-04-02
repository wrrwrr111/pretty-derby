"use client"

import * as React from "react"
import {
  AudioWaveform,
  Briefcase,
  Bot,
  Gamepad2,
  Medal,
  Users,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // 菜单列表
const MENU_LIST = [
  {
    title: ("角色"),
    url: "/",
    icon: Users,
  },
  {
    title: ("支援"),
    url: "/support",
    icon: Briefcase,
  },
  {
    title: ("技能"),
    url: "/skill",
    icon: Bot,
  },
  {
    title: ("比赛"),
    url: "/race",
    icon: Medal,
  },
  {
    title: ("育成"),
    url: "/nurturing",
    icon: Gamepad2,
  },
  {
    title: ("种马"),
    url: "/seed",
    icon: AudioWaveform,
  },
]
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
          <SidebarGroup >
            <SidebarGroupLabel>{"urarawin"}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {MENU_LIST.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {/* <SidebarMenuButton asChild isActive={item.isActive}> */}
                    <SidebarMenuButton asChild >
                    <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
