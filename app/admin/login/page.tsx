import Image from "next/image";
import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex bg-[#0a0f14]">

      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col w-[52%] relative overflow-hidden bg-forest-950">
        <Image
          src="/products/grade-A_converted.avif"
          alt="Premium Ugandan vanilla beans"
          fill
          className="object-cover opacity-30"
          sizes="52vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950/80 via-forest-950/50 to-transparent" />

        {/* Gold top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 via-gold-400/60 to-transparent" />

        <div className="relative z-10 flex flex-col h-full px-12 py-10">
          {/* Logo */}
          <Image
            src="/logo_clean.webp"
            alt="IK Food Uganda"
            width={100}
            height={40}
            className="h-10 w-auto object-contain opacity-90"
          />

          {/* Middle copy */}
          <div className="flex-1 flex flex-col justify-center">
            <span className="section-eyebrow-light mb-4">Admin Portal</span>
            <h1 className="text-4xl font-bold font-heading text-white leading-tight text-balance mb-4">
              IK Food Uganda<br />Management System
            </h1>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Manage orders, track customer enquiries, and oversee your vanilla export operations from one place.
            </p>

            {/* Stat pills */}
            <div className="flex gap-3 mt-10">
              {[
                { value: "7", label: "Products" },
                { value: "EU", label: "Certified" },
                { value: "2015", label: "Est." },
              ].map(({ value, label }) => (
                <div key={label} className="border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm bg-white/5">
                  <p className="text-lg font-bold font-heading text-gold-400 leading-none">{value}</p>
                  <p className="text-white/35 text-[10px] uppercase tracking-widest mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} IK Food Uganda. Restricted access.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10 text-center">
          <Image src="/logo_clean.webp" alt="IK Food Uganda" width={90} height={36} className="mx-auto h-9 w-auto object-contain opacity-90" />
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-heading text-white mb-1.5">Welcome back</h2>
            <p className="text-white/35 text-sm">Sign in to access your admin dashboard.</p>
          </div>

          <form action={login} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-white/40 uppercase tracking-widest mb-2">
                Admin Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••••••"
                required
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent transition-all"
              />
            </div>

            {params.error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <p className="text-red-400 text-xs">Incorrect password. Try again.</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gold-400 hover:bg-gold-300 text-forest-950 font-semibold text-sm py-3.5 rounded-xl transition-colors tracking-wide"
            >
              Sign In to Dashboard
            </button>
          </form>

          <p className="text-center text-white/20 text-xs mt-8">
            Access restricted to authorised personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
