'use client';

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/animate-ui/radix-sidebar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronsUpDown, LogOut } from 'lucide-react';

import useUa from '@/utils/ua.js';
import dbL from '@/dbL.js';
import LanButton from '@/components/lan-button.js';
import { PC_MENU_LIST, MOBILE_MENU_LIST, CDN_SERVER } from '@/config';

const Layout = ({ children, contentClass, rootClass }) => {
  const { t } = useTranslation();
  const ua = useUa();
  const location = useLocation();
  const isMobile = useIsMobile();

  const [openNavbar, setOpenNavbar] = useState(false);
  const [activeTeam, setActiveTeam] = useState({
    name: 'Default Team',
    plan: 'Free',
  });

  const resetNur = () => {
    dbL
      .set('selected', {
        supports: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
        player: {},
        races: [],
      })
      .write();
  };

  const menuList = ua.isPhone ? MOBILE_MENU_LIST : PC_MENU_LIST;

  return (
    <SidebarProvider>
      <div className={rootClass || 'flex flex-col w-screen min-h-screen'}>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold">{activeTeam.name}</span>
                    <span className="text-xs">{activeTeam.plan}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t('Menu')}</SidebarGroupLabel>
              <SidebarMenu>
                {menuList.map((item) => (
                  <SidebarMenuItem key={item.text}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.link}
                        className={
                          location.pathname === item.link
                            ? 'text-primary font-semibold'
                            : ''
                        }
                      >
                        <item.icon className="mr-2" />
                        <span>{t(item.text)}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={`${CDN_SERVER}/avatar.png`} alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="ml-2 flex-1 text-left text-sm">
                    <div className="font-semibold">User</div>
                    <div className="text-xs">user@example.com</div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={resetNur}>
                  <LogOut />
                  <span>{t('Reset')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <LanButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-16 items-center px-4">
            <SidebarTrigger className="mr-2" />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <span className="text-lg font-semibold">{t('Dashboard')}</span>
          </header>

          <main className={`flex-1 p-4 ${contentClass || ''}`}>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
