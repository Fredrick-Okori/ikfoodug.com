"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { LogOut, RefreshCw, Package, Clock, CheckCircle2, XCircle, Users } from "lucide-react";
import { type Order, type OrderStatus } from "@/lib/supabase";
import { logout, updateOrderStatus } from "@/app/admin/actions";

const STATUS_OPTIONS: { value: OrderStatus; label: string; color: string; bg: string }[] = [
  { value: "new",       label: "New",       color: "text-gold-400",   bg: "bg-gold-400/10 border-gold-400/30" },
  { value: "contacted", label: "Contacted", color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/30" },
  { value: "confirmed", label: "Confirmed", color: "text-green-400",  bg: "bg-green-400/10 border-green-400/30" },
  { value: "completed", label: "Completed", color: "text-white/40",   bg: "bg-white/5 border-white/10" },
  { value: "cancelled", label: "Cancelled", color: "text-red-400",    bg: "bg-red-400/10 border-red-400/30" },
];

function StatusBadge({ status }: { status: OrderStatus }) {
  const s = STATUS_OPTIONS.find((o) => o.value === status) ?? STATUS_OPTIONS[0];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider border ${s.bg} ${s.color}`}>
      {s.label}
    </span>
  );
}

function StatusSelect({ orderId, current }: { orderId: string; current: OrderStatus }) {
  const [, startTransition] = useTransition();
  const [value, setValue] = useState(current);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as OrderStatus;
    setValue(next);
    startTransition(() => updateOrderStatus(orderId, next));
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="text-xs bg-forest-900 border border-white/10 text-white rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold-400 cursor-pointer"
    >
      {STATUS_OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminDashboard({ orders }: { orders: Order[] }) {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const counts = {
    all:       orders.length,
    new:       orders.filter((o) => o.status === "new").length,
    contacted: orders.filter((o) => o.status === "contacted").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const visible = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const stats = [
    { label: "Total Orders",    value: counts.all,       icon: Package,      color: "text-white" },
    { label: "New",             value: counts.new,       icon: Clock,        color: "text-gold-400" },
    { label: "Confirmed",       value: counts.confirmed, icon: CheckCircle2, color: "text-green-400" },
    { label: "Total Customers", value: new Set(orders.map((o) => o.email)).size, icon: Users, color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-forest-950 text-white">
      {/* Header */}
      <header className="border-b border-white/8 px-6 py-4 flex items-center justify-between sticky top-0 bg-forest-950 z-10">
        <div className="flex items-center gap-4">
          <Image src="/logo_clean.webp" alt="IK Food Uganda" width={80} height={32} className="h-8 w-auto object-contain opacity-90" />
          <div className="h-5 w-px bg-white/10" />
          <div>
            <p className="text-xs text-white/40 uppercase tracking-widest">Admin</p>
            <p className="text-sm font-semibold text-white leading-none mt-0.5">Order Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-forest-900 border border-white/8 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-white/40 uppercase tracking-widest">{label}</p>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className={`text-3xl font-bold font-heading ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {(["all", "new", "contacted", "confirmed", "completed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                filter === s
                  ? "bg-gold-400 text-forest-950 border-gold-400"
                  : "bg-white/5 text-white/40 border-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s]})
            </button>
          ))}
        </div>

        {/* Orders table */}
        {visible.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No orders {filter !== "all" ? `with status "${filter}"` : "yet"}.</p>
          </div>
        ) : (
          <div className="bg-forest-900 border border-white/8 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    {["Date", "Customer", "Contact", "Country", "Quantity", "Date Needed", "Status", "Update"].map((h) => (
                      <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-white/35 uppercase tracking-widest whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {visible.map((order) => (
                    <tr key={order.id} className="hover:bg-white/3 transition-colors">
                      <td className="px-5 py-4 text-white/50 whitespace-nowrap text-xs">
                        {fmt(order.created_at)}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="font-medium text-white">{order.name}</p>
                        <p className="text-xs text-white/40 mt-0.5">{order.email}</p>
                      </td>
                      <td className="px-5 py-4 text-white/50 text-xs whitespace-nowrap">
                        {order.phone}
                      </td>
                      <td className="px-5 py-4 text-white/70 whitespace-nowrap">
                        {order.country}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-semibold text-gold-400">{order.quantity}</span>
                        <span className="text-white/40 text-xs ml-1">{order.unit}</span>
                      </td>
                      <td className="px-5 py-4 text-white/50 text-xs whitespace-nowrap">
                        {order.date_needed ? fmt(order.date_needed) : <span className="text-white/20">—</span>}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusSelect orderId={order.id} current={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-white/8 text-xs text-white/25">
              Showing {visible.length} of {orders.length} orders
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
