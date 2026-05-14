"use client";

import { useState, useEffect, useRef } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Props {
  open: boolean;
  onClose: () => void;
}

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
  "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (DRC)","Congo (Republic)",
  "Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador",
  "Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau",
  "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
  "Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan",
  "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar",
  "Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia",
  "Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal",
  "Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan",
  "Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar",
  "Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","São Tomé and Príncipe","Saudi Arabia",
  "Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa",
  "South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan",
  "Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan",
  "Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City",
  "Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  country: "",
  quantity: "",
  unit: "kg",
  dateNeeded: "",
};

export default function OrderDrawer({ open, onClose }: Props) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInput.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => { setForm(initialForm); setSubmitted(false); }, 400);
    }
  }, [open]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  const set = (field: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("orders").insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      country: form.country,
      quantity: form.quantity,
      unit: form.unit,
      date_needed: form.dateNeeded || null,
    });
    setSubmitting(false);
    if (!error) {
      setSubmitted(true);
    } else {
      console.error("Order submission error:", error.message);
    }
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all";
  const labelCls = "block text-xs font-medium text-white/50 uppercase tracking-widest mb-1.5";

  return (
    <div
      className={`fixed inset-0 z-[70] transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Place an order"
      onKeyDown={handleKey}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — slides in from the left */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-[420px] bg-forest-950 shadow-2xl flex flex-col transition-transform duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Gold left accent bar */}
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-gold-400 via-gold-400/40 to-transparent" aria-hidden="true" />

        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-5 border-b border-white/8 shrink-0">
          <div>
            <p className="label-tag text-gold-400 mb-1">IK Food Uganda</p>
            <h2 className="text-xl font-bold font-heading text-white">Place an Order</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-7">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-12 gap-4">
              <CheckCircle2 className="w-14 h-14 text-gold-400" />
              <h3 className="text-xl font-bold text-white font-heading">Order Request Sent!</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Thank you, {form.name}. Our team will review your request and
                contact you at <span className="text-white/80">{form.email}</span> within 24 hours.
              </p>
              <button onClick={onClose} className="btn-gold mt-2 px-8">
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="order-name" className={labelCls}>Full Name</label>
                <input
                  ref={firstInput}
                  id="order-name"
                  type="text"
                  placeholder="Israel Kaweesa"
                  value={form.name}
                  onChange={set("name")}
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="order-email" className={labelCls}>Email Address</label>
                <input
                  id="order-email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={set("email")}
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="order-phone" className={labelCls}>Contact Number</label>
                <input
                  id="order-phone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.phone}
                  onChange={set("phone")}
                  required
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="order-country" className={labelCls}>Country</label>
                <select
                  id="order-country"
                  value={form.country}
                  onChange={set("country")}
                  required
                  className={`${inputCls} cursor-pointer bg-forest-900`}
                >
                  <option value="" disabled>Select your country…</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="order-quantity" className={labelCls}>Quantity of Vanilla</label>
                <div className="flex gap-2">
                  <input
                    id="order-quantity"
                    type="number"
                    min="1"
                    placeholder="500"
                    value={form.quantity}
                    onChange={set("quantity")}
                    required
                    className={`${inputCls} flex-[3]`}
                  />
                  <select
                    value={form.unit}
                    onChange={set("unit")}
                    className={`${inputCls} flex-[1] cursor-pointer bg-forest-900`}
                  >
                    <option value="kg">kg</option>
                    <option value="tonnes">tonnes</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="order-date" className={labelCls}>Date Needed</label>
                <input
                  id="order-date"
                  type="date"
                  value={form.dateNeeded}
                  onChange={set("dateNeeded")}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className={`${inputCls} [color-scheme:dark]`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold w-full justify-center py-3.5 mt-2 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Submit Order Request"
                )}
              </button>

              <p className="text-center text-white/25 text-xs pb-4">
                Our team will follow up within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
