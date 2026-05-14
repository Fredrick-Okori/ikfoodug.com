"use client";

import { useState, useTransition } from "react";
import { Mail, MessageSquare, RefreshCw, ChevronDown, ChevronUp, Building2, Phone } from "lucide-react";
import { type Enquiry, type EnquiryStatus } from "@/lib/supabase";
import { updateEnquiryStatus } from "@/app/admin/actions";

const STATUS_OPTIONS: { value: EnquiryStatus; label: string; color: string; bg: string }[] = [
  { value: "unread",   label: "Unread",   color: "text-amber-600 dark:text-gold-400",  bg: "bg-amber-50 border-amber-200 dark:bg-gold-400/10 dark:border-gold-400/30" },
  { value: "read",     label: "Read",     color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-50 border-blue-200 dark:bg-blue-400/10 dark:border-blue-400/30" },
  { value: "replied",  label: "Replied",  color: "text-green-600 dark:text-green-400", bg: "bg-green-50 border-green-200 dark:bg-green-400/10 dark:border-green-400/30" },
  { value: "archived", label: "Archived", color: "text-gray-400 dark:text-white/30",   bg: "bg-gray-100 border-gray-200 dark:bg-white/5 dark:border-white/10" },
];

function StatusBadge({ status }: { status: EnquiryStatus }) {
  const s = STATUS_OPTIONS.find((o) => o.value === status) ?? STATUS_OPTIONS[0];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider border ${s.bg} ${s.color}`}>
      {s.label}
    </span>
  );
}

function StatusSelect({ id, current }: { id: string; current: EnquiryStatus }) {
  const [, startTransition] = useTransition();
  const [value, setValue] = useState(current);

  return (
    <select
      value={value}
      onChange={(e) => {
        const next = e.target.value as EnquiryStatus;
        setValue(next);
        startTransition(() => updateEnquiryStatus(id, next));
      }}
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

function EnquiryRow({ enquiry }: { enquiry: Enquiry }) {
  const [expanded, setExpanded] = useState(enquiry.status === "unread");

  return (
    <div className={`bg-white dark:bg-[#0a0f14] border rounded-2xl overflow-hidden transition-all ${
      enquiry.status === "unread"
        ? "border-amber-200 dark:border-gold-400/20"
        : "border-gray-200 dark:border-white/8"
    }`}>
      {/* Header row */}
      <div
        className="flex items-start gap-4 p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
        onClick={() => setExpanded((e) => !e)}
      >
        {/* Unread dot */}
        <div className="mt-1 shrink-0">
          {enquiry.status === "unread"
            ? <span className="w-2 h-2 rounded-full bg-amber-400 dark:bg-gold-400 block" />
            : <span className="w-2 h-2 rounded-full bg-gray-200 dark:bg-white/10 block" />
          }
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0 grid sm:grid-cols-4 gap-2 items-start">
          <div className="sm:col-span-1">
            <p className={`text-sm font-semibold truncate ${enquiry.status === "unread" ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-white/70"}`}>
              {enquiry.name}
            </p>
            <p className="text-xs text-gray-400 dark:text-white/35 truncate mt-0.5">{enquiry.email}</p>
          </div>
          <div className="sm:col-span-1">
            <p className="text-xs text-gray-500 dark:text-white/40 truncate">{enquiry.enquiry_type}</p>
            {enquiry.company && (
              <p className="text-xs text-gray-400 dark:text-white/25 truncate mt-0.5 flex items-center gap-1">
                <Building2 className="w-3 h-3 shrink-0" />{enquiry.company}
              </p>
            )}
          </div>
          <div className="sm:col-span-1 flex items-center gap-2 flex-wrap">
            <StatusBadge status={enquiry.status} />
          </div>
          <div className="sm:col-span-1 flex items-center justify-between gap-3">
            <p className="text-xs text-gray-400 dark:text-white/30">{fmt(enquiry.created_at)}</p>
            {expanded
              ? <ChevronUp className="w-4 h-4 text-gray-400 dark:text-white/30 shrink-0" />
              : <ChevronDown className="w-4 h-4 text-gray-400 dark:text-white/30 shrink-0" />
            }
          </div>
        </div>
      </div>

      {/* Expanded message */}
      {expanded && (
        <div className="border-t border-gray-100 dark:border-white/6 px-5 pb-5 pt-4">
          {/* Contact details */}
          <div className="flex flex-wrap gap-4 mb-4">
            <a
              href={`mailto:${enquiry.email}`}
              className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/40 hover:text-forest-600 dark:hover:text-gold-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {enquiry.email}
            </a>
            {enquiry.phone && (
              <a
                href={`tel:${enquiry.phone}`}
                className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/40 hover:text-forest-600 dark:hover:text-gold-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {enquiry.phone}
              </a>
            )}
          </div>

          {/* Message body */}
          <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/6 rounded-xl p-4 mb-4">
            <p className="text-xs font-medium text-gray-400 dark:text-white/30 uppercase tracking-widest mb-2">Message</p>
            <p className="text-sm text-gray-700 dark:text-white/70 leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <StatusSelect id={enquiry.id} current={enquiry.status} />
            <a
              href={`mailto:${enquiry.email}?subject=Re: ${encodeURIComponent(enquiry.enquiry_type)} — IK Food Uganda`}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-forest-950 dark:bg-gold-400 text-white dark:text-forest-950 hover:opacity-90 transition-opacity"
            >
              <Mail className="w-3.5 h-3.5" />
              Reply via Email
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminEnquiries({ enquiries }: { enquiries: Enquiry[] }) {
  const [filter, setFilter] = useState<EnquiryStatus | "all">("all");

  const counts = {
    all:      enquiries.length,
    unread:   enquiries.filter((e) => e.status === "unread").length,
    read:     enquiries.filter((e) => e.status === "read").length,
    replied:  enquiries.filter((e) => e.status === "replied").length,
    archived: enquiries.filter((e) => e.status === "archived").length,
  };

  const visible = filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter);

  const stats = [
    { label: "Total",   value: counts.all,    color: "text-gray-800 dark:text-white" },
    { label: "Unread",  value: counts.unread,  color: "text-amber-600 dark:text-gold-400" },
    { label: "Replied", value: counts.replied, color: "text-green-600 dark:text-green-400" },
  ];

  return (
    <div className="flex flex-col flex-1 p-6 md:p-8 space-y-7">

      {/* Header */}
      <div className="flex items-center justify-between pt-2 md:pt-0">
        <div className="pl-12 md:pl-0">
          <h1 className="text-xl font-bold font-heading text-gray-900 dark:text-white">Enquiries</h1>
          <p className="text-gray-500 dark:text-white/35 text-sm mt-0.5">Messages submitted via the contact form</p>
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
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-[#0a0f14] border border-gray-200 dark:border-white/8 rounded-2xl p-5 shadow-sm dark:shadow-none">
            <p className="text-xs text-gray-400 dark:text-white/35 uppercase tracking-widest mb-2">{label}</p>
            <p className={`text-3xl font-bold font-heading ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "unread", "read", "replied", "archived"] as const).map((s) => (
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

      {/* Enquiry cards */}
      {visible.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-24 text-gray-300 dark:text-white/20">
          <MessageSquare className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-sm">No enquiries{filter !== "all" ? ` with status "${filter}"` : " yet"}.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((enquiry) => (
            <EnquiryRow key={enquiry.id} enquiry={enquiry} />
          ))}
        </div>
      )}
    </div>
  );
}
