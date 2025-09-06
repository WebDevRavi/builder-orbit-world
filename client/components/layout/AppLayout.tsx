import { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  MapPin,
  FolderOpen,
  Building2,
  Bell,
  LayoutDashboard,
  Globe,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { logout, role } = useAuth();
  const { lang, setLang, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { to: "/dashboard", icon: LayoutDashboard, label: t("dashboard") },
    { to: "/map", icon: MapPin, label: t("map") },
    { to: "/issues", icon: FolderOpen, label: t("issues") },
    { to: "/departments", icon: Building2, label: t("departments") },
    { to: "/analytics", icon: BarChart3, label: t("analytics") },
  ];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="size-7 rounded-md bg-primary text-primary-foreground grid place-items-center font-bold">
              CI
            </div>
            <div className="text-sm font-semibold leading-tight">
              Civic Issues
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menu.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn("block", isActive && "font-medium")
                      }
                    >
                      <SidebarMenuButton
                        isActive={location.pathname.startsWith(item.to)}
                        tooltip={item.label}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2">
            <div className="text-xs text-muted-foreground mb-1">Role</div>
            <Badge variant="outline" className="w-full justify-center">
              {role || "Guest"}
            </Badge>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center gap-2 px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <div className="font-semibold truncate">{t("appTitle")}</div>
            <div className="ml-auto flex items-center gap-2">
              <Select value={lang} onValueChange={(v) => setLang(v as any)}>
                <SelectTrigger className="w-[120px]">
                  <Globe className="mr-2 size-4" />
                  <SelectValue placeholder={t("language")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
                title="Notifications"
              >
                <Bell className="size-5" />
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="size-4 mr-2" /> {t("logout")}
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
        <footer className="border-t p-4 text-sm text-muted-foreground">
          <div className="max-w-7xl mx-auto grid gap-2 sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="font-medium">
                Government of Jharkhand — Department of Higher & Technical
                Education
              </div>
              <div><p>Contact: Ravisolanki@gmail.com | +91 0000000000</p></div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">
                About
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
