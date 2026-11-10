"use client";
import React from "react";

import { useState } from "react";
import { useRegion } from "@/components/RegionProvider";
import PageHero from "@/components/PageHero";
import { supabase } from "@/lib/supabase";
import { localize } from "@/lib/localize";

const enquiryTypes = (region: string) => [
  "Product Sourcing Enquiry",
  region === "us" ? "Shipping & Delivery" : "Export & Logistics",
  "Partnership Opportunities",
  "Quality & Standards Questions",
  "Media & Press",
  "General Enquiry",
];

type State = "idle" | "sending" | "success";

export default function ContactPage() {
  const region = useRegion();
  const contactDetails = [
    { label: "Phone",    value: region.phone.display, href: region.phone.href,       sub: `${region.hours.days}, ${region.hours.time}` },
    { label: "Email",    value: region.email,         href: `mailto:${region.email}`, sub: "Reply within 24 hours" },
    { label: "Location", value: region.locationLabel, href: null,                    sub: region.locationSub },
    { label: "Hours",    value: `${region.hours.days} · ${region.hours.time}`, href: null, sub: region.hours.timezone },
  ];
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
      // The column defaults to "ug", so Uganda enquiries keep working before the region migration runs.
      ...(region.code !== "ug" && { region: region.code }),
    });
    if (!error) {
      setState("success");
    } else {
      console.error("Enquiry submission error:", error.message);
      setState("idle");
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-[#dccba0] bg-white px-4 py-3.5 text-base text-forest-950 placeholder:text-forest-900/35 transition-colors focus:border-forest-950 focus:outline-none focus:ring-0";
  const labelCls = "mb-2 block text-sm font-bold text-forest-900/70";

  return localize(
    <>
      <PageHero
        title={<>Talk to us<span className="text-gold-500">.</span></>}
        image="/vanilla_bean_harvest.avif"
        alt="IK Food Uganda premium vanilla beans"
      >
        Sourcing, samples, partnerships or press. Our team in {region.locationLabel} replies within 24 hours.
      </PageHero>

      {/* ── Details + form ── */}
      <section className="bg-cream text-forest-950" aria-label="Contact details and form">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12 lg:py-32">
          <div>
            <h2 data-split className="h-display text-[clamp(2.5rem,5.5vw,4.75rem)]">Reach the team.</h2>
            <dl className="mt-12">
              {contactDetails.map(({ label, value, href, sub }) => (
                <div key={label} data-rule className="relative grid gap-1 py-6 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-forest-950/20" />
                  <dt data-rule-text className="text-sm font-bold text-forest-900/55">{label}</dt>
                  <dd data-rule-text>
                    {href ? (
                      <a href={href} className="break-words text-lg font-extrabold sm:text-xl tracking-[-0.02em] transition-colors hover:text-gold-600">{value}</a>
                    ) : (
                      <span className="text-xl font-extrabold tracking-[-0.02em]">{value}</span>
                    )}
                    <span className="mt-1 block text-sm text-forest-900/60">{sub}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <span className="block h-px bg-forest-950/20" />
            <blockquote data-reveal className="mt-12 max-w-sm text-lg font-bold leading-snug tracking-[-0.01em] text-forest-900/75">
              &ldquo;Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good
              morals &amp; happiness.&rdquo;
              <cite className="mt-3 block text-sm font-semibold not-italic text-forest-900/50">Thomas Jefferson</cite>
            </blockquote>
          </div>

          <div data-reveal className="rounded-[1.75rem] bg-parchment p-6 sm:p-10">
            {state === "success" ? (
              <div className="py-16 text-center" role="alert" aria-live="polite">
                <p className="h-display text-[clamp(2.25rem,4vw,3.5rem)]">Message sent<span className="text-gold-600">.</span></p>
                <p className="mx-auto mt-4 max-w-sm text-lg text-forest-900/70">Thank you. Our team will reply within 24 hours.</p>
                <button
                  onClick={() => { setState("idle"); setForm({ name: "", email: "", company: "", phone: "", enquiryType: "", message: "" }); }}
                  className="btn-outline-dark mt-10"
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <h2 data-no-reveal className="text-3xl font-extrabold tracking-[-0.04em]">Send a message</h2>
                <form onSubmit={submit} noValidate aria-label="Contact form" className="mt-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className={labelCls}>Full name <span className="text-[#cc5500]" aria-hidden="true">*</span></label>
                      <input id="c-name" name="name" type="text" value={form.name} onChange={change} required aria-required="true" autoComplete="name" placeholder="Your full name" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="c-email" className={labelCls}>Email <span className="text-[#cc5500]" aria-hidden="true">*</span></label>
                      <input id="c-email" name="email" type="email" value={form.email} onChange={change} required aria-required="true" autoComplete="email" placeholder="you@company.com" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="c-company" className={labelCls}>Company</label>
                      <input id="c-company" name="company" type="text" value={form.company} onChange={change} autoComplete="organization" placeholder="Your company" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="c-phone" className={labelCls}>Phone</label>
                      <input id="c-phone" name="phone" type="tel" value={form.phone} onChange={change} autoComplete="tel" placeholder="+1 234 567 8900" className={inputCls} />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="c-type" className={labelCls}>Enquiry type <span className="text-[#cc5500]" aria-hidden="true">*</span></label>
                    <select id="c-type" name="enquiryType" value={form.enquiryType} onChange={change} required aria-required="true" className={inputCls}>
                      <option value="" disabled>Select an enquiry type</option>
                      {enquiryTypes(region.code).map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="mt-5">
                    <label htmlFor="c-msg" className={labelCls}>Message <span className="text-[#cc5500]" aria-hidden="true">*</span></label>
                    <textarea id="c-msg" name="message" value={form.message} onChange={change} required aria-required="true" rows={5} placeholder="Products of interest, quantities, destination…" className={`${inputCls} resize-none`} />
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <button type="submit" disabled={state === "sending"} className="btn-dark">
                      {state === "sending" ? "Sending…" : "Send message"}
                    </button>
                    <p className="text-sm text-forest-900/55">
                      <span className="text-[#cc5500]" aria-hidden="true">*</span> Required. We reply within 24 hours.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-forest-950 text-cream" aria-labelledby="contact-faq-title">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-32">
          <div>
            <h2 id="contact-faq-title" data-split className="h-display text-[clamp(2.5rem,5.5vw,4.75rem)]">Common questions.</h2>
            <a href={`mailto:${region.email}`} className="link-line-light mt-10">Email the team</a>
          </div>
          <div>
            {[
              { q: "What is the minimum order quantity?",                   a: "We work with buyers of all sizes. MOQs vary by product and destination. Contact us to discuss your specific requirements and receive a tailored quotation." },
              { q: "Do your products meet international quality standards?", a: "Yes. All IK Food Uganda products meet international export standards and hold full phytosanitary export licences. Full documentation is available on request." },
              { q: "Which markets do you export to?",                        a: <>We currently export to <strong>Europe (UK, Germany, Netherlands, France)</strong> and <strong>Asia (Japan, South Korea)</strong>, and are expanding into the Middle East.{region.code === "us" && <> US orders are handled locally by <strong>{region.name}</strong>.</>}</> },
              { q: "Can you provide samples before a bulk order?",           a: "Yes. We can arrange product samples for qualified buyers. Contact our sales team with your details and product interest." },
              { q: "How do you ensure quality from farm to shipment?",       a: "Rigorous quality control at every stage, from farmer training and on-farm audits, to in-house laboratory testing, grading, packing, and cold-chain logistics." },
            ].map(({ q, a }) => (
              <details key={q} data-rule className="group relative [&_summary::-webkit-details-marker]:hidden">
                <span data-rule-line className="absolute inset-x-0 top-0 h-px origin-left bg-cream/15" />
                <summary data-rule-text className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-xl font-extrabold tracking-[-0.02em] transition-colors hover:text-gold-400 sm:text-2xl">
                  {q}
                  <span aria-hidden className="text-3xl font-light leading-none text-gold-400 transition duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="-mt-2 max-w-2xl pb-8 text-base leading-relaxed text-parchment/65 [&_strong]:text-cream">{a}</p>
              </details>
            ))}
            <span className="block h-px bg-cream/15" />
          </div>
        </div>
      </section>
    </>,
    region.code,
  );
}
