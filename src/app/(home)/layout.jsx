"use client";

import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/animate-ui/radix-sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/animate-ui/radix-collapsible";
import {
  AudioWaveform,
  ChevronRight,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
  Users,
  HeartHandshake,
  Sparkles,
  Trophy,
  Baby,
  Squirrel,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PageLayout({ children }) {
  const isMobile = useIsMobile();

  //   navMain: ,
  const navItems = isMobile
    ? [
        {
          title: "角色",
          url: "/",
          icon: Users,
          isActive: false,
        },
        {
          title: "支援",
          url: "/support",
          icon: HeartHandshake,
          isActive: false,
        },
        {
          title: "技能",
          url: "/skill",
          icon: Sparkles,
          isActive: false,
        },
        {
          title: "比赛",
          url: "/race",
          icon: Trophy,
          isActive: false,
        },
        {
          title: "育成",
          url: "/nurturingMo",
          icon: Baby,
          isActive: false,
        },
        {
          title: "种马",
          url: "/seedMo",
          icon: Squirrel,
          isActive: false,
        },
      ]
    : [
        {
          title: "角色",
          url: "/player",
          icon: Users,
          isActive: false,
        },
        {
          title: "支援",
          url: "/support",
          icon: HeartHandshake,
          isActive: false,
        },
        {
          title: "技能",
          url: "/skill",
          icon: Sparkles,
          isActive: false,
        },
        {
          title: "比赛",
          url: "/race",
          icon: Trophy,
          isActive: false,
        },
        {
          title: "育成",
          url: "/nurturing",
          icon: Baby,
          isActive: false,
        },
        {
          title: "种马",
          url: "/seed",
          icon: Squirrel,
          isActive: false,
        },
      ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        {/* <SidebarHeader>
        </SidebarHeader> */}

        <SidebarContent>
          {/* Nav Main */}
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <a href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          {/* Nav Main */}
        </SidebarContent>
        {/* <SidebarFooter></SidebarFooter> */}
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
