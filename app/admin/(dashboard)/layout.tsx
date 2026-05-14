import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d1117] flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
