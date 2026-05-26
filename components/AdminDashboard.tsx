"use client";

import { useState, useTransition } from "react";
import { Package, Clock, CheckCircle2, Users, RefreshCw } from "lucide-react";
import { type Order, type OrderStatus } from "@/lib/supabase";
import { updateOrderStatus } from "@/app/admin/actions";

const STATUS_OPTIONS: { value: OrderStatus; label: string; color: string; bg: string }[] = [
  { value: "new",       label: "New",       color: "text-amber-600 dark:text-gold-400",  bg: "bg-amber-50 border-amber-200 dark:bg-gold-400/10 dark:border-gold-400/30" },
  { value: "contacted", label: "Contacted", color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-50 border-blue-200 dark:bg-blue-400/10 dark:border-blue-400/30" },
  { value: "confirmed", label: "Confirmed", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 border-green-200 dark:bg-green-400/10 dark:border-green-400/30" },
  { value: "completed", label: "Completed", color: "text-gray-500 dark:text-white/40",   bg: "bg-gray-100 border-gray-200 dark:bg-white/5 dark:border-white/10" },
  { value: "cancelled", label: "Cancelled", color: "text-red-600 dark:text-red-400",     bg: "bg-red-50 border-red-200 dark:bg-red-400/10 dark:border-red-400/30" },
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
      className="text-xs bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gold-400 cursor-pointer"
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
    { label: "Total Orders",     value: counts.all,       icon: Package,      light: "text-gray-800", dark: "dark:text-white" },
    { label: "New",              value: counts.new,       icon: Clock,        light: "text-amber-600", dark: "dark:text-gold-400" },
    { label: "Confirmed",        value: counts.confirmed, icon: CheckCircle2, light: "text-green-600", dark: "dark:text-green-400" },
    { label: "Unique Customers", value: new Set(orders.map((o) => o.email)).size, icon: Users, light: "text-blue-600", dark: "dark:text-blue-400" },
  ];

  return (
    <div className="flex flex-col flex-1 p-6 md:p-8 space-y-7">

      {/* Page header */}
      <div className="flex items-center justify-between pt-2 md:pt-0">
        <div className="pl-12 md:pl-0">
          <h1 className="text-xl font-bold font-heading text-gray-900 dark:text-white">Orders</h1>
          <p className="text-gray-500 dark:text-white/35 text-sm mt-0.5">Manage and track all placed orders</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 px-3 py-2 rounded-xl transition-all bg-white dark:bg-transparent"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, light, dark }) => (
          <div key={label} className="bg-white dark:bg-[#0a0f14] border border-gray-200 dark:border-white/8 rounded-2xl p-5 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400 dark:text-white/35 uppercase tracking-widest">{label}</p>
              <Icon className={`w-4 h-4 ${light} ${dark}`} />
            </div>
            <p className={`text-3xl font-bold font-heading ${light} ${dark}`}>{value}</p>
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
                : "bg-white dark:bg-white/5 text-gray-500 dark:text-white/40 border-gray-200 dark:border-white/8 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20"
            }`}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}{" "}
            <span className="opacity-60">({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      {visible.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-24 text-gray-300 dark:text-white/20">
          <Package className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-sm">No orders{filter !== "all" ? ` with status "${filter}"` : " yet"}.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0a0f14] border border-gray-200 dark:border-white/8 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/8">
                  {["Date", "Customer", "Phone", "Country", "Product", "Type", "Quantity", "Date Needed", "Status", "Update"].map((h) => (
                    <th key={h} className="text-left px-5 py-4 text-[11px] font-semibold text-gray-400 dark:text-white/30 uppercase tracking-widest whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                {visible.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 text-gray-400 dark:text-white/40 whitespace-nowrap text-xs">{fmt(order.created_at)}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900 dark:text-white">{order.name}</p>
                      <p className="text-xs text-gray-400 dark:text-white/35 mt-0.5">{order.email}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-500 dark:text-white/45 text-xs whitespace-nowrap">{order.phone}</td>
                    <td className="px-5 py-4 text-gray-600 dark:text-white/60 whitespace-nowrap">{order.country}</td>
                    <td className="px-5 py-4 text-gray-600 dark:text-white/60 whitespace-nowrap text-xs">
                      {order.product ?? <span className="text-gray-200 dark:text-white/15">—</span>}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {order.is_sample
                        ? <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider border bg-purple-50 border-purple-200 text-purple-600 dark:bg-purple-400/10 dark:border-purple-400/30 dark:text-purple-400">Sample</span>
                        : <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider border bg-forest-50 border-forest-200 text-forest-700 dark:bg-forest-400/10 dark:border-forest-400/30 dark:text-forest-400">Full</span>
                      }
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-semibold text-gold-600 dark:text-gold-400">{order.quantity}</span>
                      <span className="text-gray-400 dark:text-white/35 text-xs ml-1">{order.unit}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 dark:text-white/40 text-xs whitespace-nowrap">
                      {order.date_needed ? fmt(order.date_needed) : <span className="text-gray-200 dark:text-white/15">—</span>}
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
                    <td className="px-5 py-4"><StatusSelect orderId={order.id} current={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 dark:border-white/6 text-xs text-gray-400 dark:text-white/20">
            Showing {visible.length} of {orders.length} orders
          </div>
        </div>
      )}
    </div>
  );
}
