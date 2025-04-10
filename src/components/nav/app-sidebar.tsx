import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CurlyBraces } from "lucide-react";
import { Separator } from "../ui/separator";

// This is sample data.
const data = {
  navMain: [
    {
      title: "urarawin",
      url: "#",
      items: [
        {
          title: "player",
          url: "/",
        },
        {
          title: "support",
          url: "/support",
        },
        {
          title: "skill",
          url: "/skill",
        },
      ],
    },
  ],
};

export function AppSidebar({
  appName,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  appName: string;
}) {
  const { state, toggleSidebar } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="relative">
        <div
          className={cn(
            "logo flex items-center h-[calc(3rem-1rem-1px)]",
            state === "expanded" && "px-2"
          )}
        >
          <Button
            variant={"outline"}
            className="aspect-square size-8 p-0 flex items-center justify-center"
            onClick={toggleSidebar}
          >
            <CurlyBraces className="w-4 h-4"></CurlyBraces>
          </Button>

          <div
            className={cn(
              "text-lg transition-all overflow-hidden cursor-pointer",
              state === "collapsed" ? "max-w-0" : "max-w-20 ml-2"
            )}
            onClick={toggleSidebar}
          >
            <span>{appName}</span>
          </div>
        </div>
        <Separator
          orientation="horizontal"
          className="relative -left-full min-w-[100vw] w-screen"
        ></Separator>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
