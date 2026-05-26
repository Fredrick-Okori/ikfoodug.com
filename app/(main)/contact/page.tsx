"use client";
import React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const contactDetails = [
  { icon: Phone,   label: "Phone",          value: "+256 776 341 713",       href: "tel:+256776341713",           sub: "Mon–Fri, 8am–5pm EAT" },
  { icon: Mail,    label: "Email",           value: "sales@ikfooduganda.com", href: "mailto:sales@ikfooduganda.com", sub: "Reply within 24 hours" },
  { icon: MapPin,  label: "Location",        value: "Kampala, Uganda",        href: null,                          sub: "East African headquarters" },
  { icon: Clock,   label: "Business Hours",  value: "Mon–Fri · 8am – 5pm",   href: null,                          sub: "EAT (UTC+3)" },
];

const enquiryTypes = [
  "Product Sourcing Enquiry",
  "Export & Logistics",
  "Partnership Opportunities",
  "Quality & Standards Questions",
  "Media & Press",
  "General Enquiry",
];

type State = "idle" | "sending" | "success";

export default function ContactPage() {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "", enquiryType: "", message: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    const { error } = await supabase.from("enquiries").insert({
      name: form.name,
      email: form.email,
      company: form.company || null,
      phone: form.phone || null,
      enquiry_type: form.enquiryType,
      message: form.message,
    });
    if (!error) {
      setState("success");
    } else {
      console.error("Enquiry submission error:", error.message);
      setState("idle");
    }
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-shadow";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-end pb-20 pt-32 overflow-hidden" aria-label="Contact hero">
        <Image
          src="/vanilla_bean_harvest.avif"
          alt="IK Food Uganda premium vanilla beans"
          fill className="object-cover" priority sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/65 to-forest-950/25" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto container-px w-full">
          <span className="section-eyebrow-light mb-4">Reach Out</span>
          <h1 className="text-display-2xl font-bold text-white text-balance max-w-lg">
            Contact Us
          </h1>
          <p className="text-white/55 mt-4 text-lg max-w-md">
            Sourcing enquiries, partnerships, or simply learning more.
            Our team is ready.
          </p>
        </div>
      </section>

      {/* ── Quote strip ── */}
      <div className="bg-parchment py-7 border-b border-vanilla-200/60">
        <div className="max-w-7xl mx-auto container-px text-center">
          <blockquote className="text-forest-800 text-base md:text-lg italic font-heading max-w-2xl mx-auto">
            &ldquo;Agriculture is our wisest pursuit, because it will in the end
            contribute most to real wealth, good morals &amp; happiness.&rdquo;
            <cite className="block text-sm text-forest-600 font-sans font-normal not-italic mt-2">
              — Thomas Jefferson
            </cite>
          </blockquote>
        </div>
      </div>

      {/* ── Main contact section ── */}
      <section className="section-y bg-cream map-bg" aria-label="Contact form and info">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Info col */}
            <div className="lg:col-span-2">
              <span className="section-eyebrow">Get in Touch</span>
              <h2 className="text-display-lg font-bold text-forest-950 mb-4 text-balance">
                Talk to Our Team
              </h2>
              <div className="h-rule mb-6" aria-hidden="true" />
              <p className="text-gray-600 leading-relaxed mb-10">
                Our team is based in Kampala, Uganda, and ready to discuss
                sourcing, certifications, logistics, and more.
              </p>
              <ul className="space-y-7 mb-10" role="list">
                {contactDetails.map(({ icon: Icon, label, value, href, sub }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-forest-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-forest-700" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="label-tag text-gray-400 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="font-semibold text-forest-950 hover:text-forest-700 transition-colors text-sm link-underline focus-visible:outline-none">
                          {value}
                        </a>
                      ) : (
                        <p className="font-semibold text-forest-950 text-sm">{value}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Map image */}
              <div className="relative rounded-2xl overflow-hidden h-44 shadow-sm border border-forest-100" aria-label="Kampala, Uganda location">
                <Image
                  src="/ibanda.avif"
                  alt="Kampala, Uganda, IK Food Uganda location"
                  fill className="object-cover" sizes="33vw"
                />
                <div className="absolute inset-0 bg-forest-950/35 flex items-center justify-center">
                  <div className="bg-white rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-forest-700" aria-hidden="true" />
                    <span className="text-sm font-semibold text-forest-900">Kampala, Uganda</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form col */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-4xl shadow-sm border border-gray-100/80 p-8 md:p-10">
                {state === "success" ? (
                  <div className="text-center py-16" role="alert" aria-live="polite">
                    <div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8 text-forest-600" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-forest-950 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-8">
                      Thank you. Our team will respond within 24 hours.
                    </p>
                    <button
                      onClick={() => { setState("idle"); setForm({ name:"",email:"",company:"",phone:"",enquiryType:"",message:"" }); }}
                      className="btn-outline-dark"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold font-heading text-forest-950 mb-7">Send Us a Message</h2>
                    <form onSubmit={submit} noValidate aria-label="Contact form">
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="c-name" className="block text-xs font-medium text-gray-600 mb-1.5">
                            Full Name <span className="text-red-400" aria-hidden="true">*</span>
                          </label>
                          <input id="c-name" name="name" type="text" value={form.name} onChange={change} required aria-required="true" autoComplete="name" placeholder="Your full name" className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="c-email" className="block text-xs font-medium text-gray-600 mb-1.5">
                            Email <span className="text-red-400" aria-hidden="true">*</span>
                          </label>
                          <input id="c-email" name="email" type="email" value={form.email} onChange={change} required aria-required="true" autoComplete="email" placeholder="your@email.com" className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="c-company" className="block text-xs font-medium text-gray-600 mb-1.5">Company</label>
                          <input id="c-company" name="company" type="text" value={form.company} onChange={change} autoComplete="organization" placeholder="Your company" className={inputCls} />
                        </div>
                        <div>
                          <label htmlFor="c-phone" className="block text-xs font-medium text-gray-600 mb-1.5">Phone</label>
                          <input id="c-phone" name="phone" type="tel" value={form.phone} onChange={change} autoComplete="tel" placeholder="+1 234 567 8900" className={inputCls} />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="c-type" className="block text-xs font-medium text-gray-600 mb-1.5">
                          Enquiry Type <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        <select id="c-type" name="enquiryType" value={form.enquiryType} onChange={change} required aria-required="true"
                          className={inputCls}
                        >
                          <option value="" disabled>Select an enquiry type</option>
                          {enquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="c-msg" className="block text-xs font-medium text-gray-600 mb-1.5">
                          Message <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        <textarea id="c-msg" name="message" value={form.message} onChange={change} required aria-required="true" rows={5} placeholder="Tell us about your requirements, products of interest, quantities..." className={`${inputCls} resize-none`} />
                      </div>
                      <button type="submit" disabled={state === "sending"} className="btn-dark disabled:opacity-60 disabled:cursor-not-allowed" aria-label={state === "sending" ? "Sending…" : "Send message"}>
                        {state === "sending" ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" aria-hidden="true" />
                            Send Message
                          </>
                        )}
                      </button>
                      <p className="text-xs text-gray-400 mt-3">
                        Fields marked <span className="text-red-400" aria-hidden="true">*</span> are required. We reply within 24 hours.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-y bg-forest-950 noise-overlay relative" aria-label="FAQ">
        <div className="max-w-3xl mx-auto container-px">
          <div className="text-center mb-12">
            <span className="section-eyebrow-light">FAQ</span>
            <h2 className="text-display-lg font-bold text-white text-balance">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What is the minimum order quantity?",                     a: "We work with buyers of all sizes. MOQs vary by product and destination. Contact us to discuss your specific requirements and receive a tailored quotation." },
              { q: "Do your products meet international quality standards?",   a: "Yes. All IK Food Uganda products meet international export standards and hold full phytosanitary export licences. Full documentation is available on request." },
              { q: "Which markets do you export to?",                          a: <>We currently export to <strong>Europe (UK, Germany, Netherlands, France)</strong> and <strong>Asia (Japan, South Korea)</strong>, and are expanding into the Middle East.</> },
              { q: "Can you provide samples before a bulk order?",             a: "Yes. We can arrange product samples for qualified buyers. Contact our sales team with your details and product interest." },
              { q: "How do you ensure quality from farm to shipment?",         a: "Rigorous quality control at every stage, from farmer training and on-farm audits, to in-house laboratory testing, grading, packing, and cold-chain logistics." },
            ].map(({ q, a }) => (
              <details key={q} className="group border border-white/10 rounded-2xl">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-medium text-sm hover:text-vanilla-300 transition-colors">
                  {q}
                  <span className="text-gold-400 text-xl leading-none group-open:rotate-45 transition-transform duration-200 ml-4 shrink-0" aria-hidden="true">+</span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-white/50 text-sm leading-relaxed">{a}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-white/40 text-sm mb-5">Still have questions?</p>
            <Link href="mailto:sales@ikfooduganda.com" className="btn-gold">
              Email Our Team
              <Mail className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
