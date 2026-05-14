import Image from "next/image";
import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-forest-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Image src="/logo_clean.webp" alt="IK Food Uganda" width={100} height={40} className="mx-auto mb-6 opacity-90 h-10 w-auto object-contain" />
          <p className="text-gold-400 text-xs uppercase tracking-widest mb-1">Admin Portal</p>
          <h1 className="text-2xl font-bold text-white font-heading">Sign In</h1>
        </div>

        <form action={login} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              required
              autoFocus
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
            />
          </div>

          {params.error && (
            <p className="text-red-400 text-xs text-center">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            className="w-full bg-gold-400 hover:bg-gold-300 text-forest-950 font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
