import AdminThemeProvider from "@/components/AdminThemeProvider";
import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {children}
      </div>
    </AdminThemeProvider>
  );
}
