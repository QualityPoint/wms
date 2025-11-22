import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconMap,
  IconReport,
  IconSearch,
  IconSettings,
  IconStorm,
  IconUser,
} from "@tabler/icons-react";
import * as React from "react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

import { IconChecklist } from "@tabler/icons-react";
import { useFrappeAuth } from "frappe-react-sdk";
import { Calendar, Notebook, Phone } from "lucide-react";
import { useEffect } from "react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Operations",
      url: "/operations",
      icon: IconMap,
    },
    {
      title: "Leads",
      url: "/leads",
      icon: IconUser,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconStorm,
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: Calendar,
    },
    {
      title: "Organisations",
      url: "/organisations",
      icon: IconUser,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: Notebook,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: IconChecklist,
    },
    {
      title: "Calllogs",
      url: "/calllogs",
      icon: Phone,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentUser } = useFrappeAuth();

  const getCurrentUser = async () => {
    const res = await fetch("/api/method/frappe.auth.get_logged_user");
    const data = await res.json();
    return data.message;
  };

  const getUserRoles = async () => {
    const user = await getCurrentUser();

    const res = await fetch(`/api/resource/User/${user}?fields=["roles"]`);
    const data = await res.json();

    return data.data.roles.map((r) => r.role);
  };

  const getCurrentUserDetails = async () => {
    // 1) Get logged user ID/email
    const userRes = await fetch("/api/method/frappe.auth.get_logged_user");
    const userId = (await userRes.json()).message;

    // 2) Get full User document
    const userDocRes = await fetch(`/api/resource/User/${userId}`);
    const userDoc = (await userDocRes.json()).data;

    // 3) Get custom user permissions
    const permsRes = await fetch(
      "/api/method/frappe.permissions.get_user_permissions"
    );
    const userPerms = (await permsRes.json()).message;

    return {
      userId,
      fullName: userDoc.full_name,
      email: userDoc.email,
      roles: userDoc.roles?.map((r) => r.role) ?? [],
      language: userDoc.language,
      timeZone: userDoc.time_zone,
      permissions: userPerms,
      raw: userDoc, // full Frappe user record
    };
  };

  useEffect(() => {
    getCurrentUserDetails().then(console.log);
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: currentUser || "",
            email: currentUser || "",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
