import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children } : DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <AppSidebar />
                <SidebarTrigger/>
                {/* Content area */}
                <div className="flex-1 p-6 transition-all duration-300">
                    {children}
                </div>
            </div>
        </SidebarProvider>
    );
}
