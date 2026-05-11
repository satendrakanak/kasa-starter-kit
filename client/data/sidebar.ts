import {
  LayoutDashboard,
  BookOpen,
  FolderTree,
  Users,
  Settings,
  TicketPercent,
  ShoppingBag,
  Mail,
  Award,
  Images,
  FileText,
  type LucideIcon,
} from "lucide-react";

export type SidebarItem = {
  title: string;
  url: string;
  requiredPermissions?: string[];
};

export type SidebarNavItem = SidebarItem & {
  icon?: LucideIcon;
  items?: SidebarItem[];
};

export const sidebarData = {
  user: {
    name: "Satendra",
    email: "satendra@example.com",
    avatar: "/avatars/user.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      requiredPermissions: ["view_dashboard"],
    },

    {
      title: "Courses",
      url: "/admin/courses",
      icon: BookOpen,
      requiredPermissions: [
        "view_course",
        "create_course",
        "update_course",
        "edit_assigned_course",
      ],
    },

    {
      title: "Coupons",
      url: "/admin/coupons",
      icon: TicketPercent,
      requiredPermissions: ["view_coupon", "create_coupon", "update_coupon"],
    },

    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingBag,
      requiredPermissions: ["view_order", "update_order"],
    },

    {
      title: "Media",
      url: "/admin/media",
      icon: Images,
      requiredPermissions: ["view_settings", "create_course", "update_course"],
    },

    {
      title: "Certificates",
      url: "/admin/certificates",
      icon: Award,
      requiredPermissions: ["view_certificate"],
    },

    {
      title: "Email Templates",
      url: "/admin/email-templates",
      icon: Mail,
      requiredPermissions: [
        "view_email_template",
        "create_email_template",
        "update_email_template",
      ],
    },

    {
      title: "CMS",
      url: "/admin/articles",
      icon: FileText,
      requiredPermissions: ["view_article", "view_testimonial", "view_contact_lead"],
      items: [
        {
          title: "Articles",
          url: "/admin/articles",
          requiredPermissions: ["view_article"],
        },
        {
          title: "Testimonials",
          url: "/admin/testimonials",
          requiredPermissions: ["view_testimonial"],
        },
        {
          title: "Contact Leads",
          url: "/admin/contact-leads",
          requiredPermissions: ["view_contact_lead"],
        },
      ],
    },

    {
      title: "Categories",
      url: "/admin/categories",
      icon: FolderTree,
      requiredPermissions: ["view_category", "create_category", "update_category"],
    },

    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
      requiredPermissions: ["view_user", "create_user", "update_user"],
    },

    {
      title: "Settings",
      url: "/admin/settings/site",
      icon: Settings,
      requiredPermissions: ["view_settings", "view_permission", "view_role"],
      items: [
        {
          title: "Site Settings",
          url: "/admin/settings/site",
          requiredPermissions: ["view_settings"],
        },
        {
          title: "Roles & Permissions",
          url: "/admin/settings/access-control",
          requiredPermissions: ["view_permission", "view_role"],
        },
      ],
    },
  ],
};
