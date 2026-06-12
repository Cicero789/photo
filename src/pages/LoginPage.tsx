import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { api, setToken } from "@/lib/api";

export function LoginPage() {
  const { login, error, clearError, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicError, setMagicError] = useState("");

  // Handle magic login token
  useEffect(() => {
    const token = searchParams.get("magic");
    if (!token || user) return;
    setMagicLoading(true);
    api.post("/auth/magic-login", { token })
      .then((data: any) => { setToken(data.token); navigate("/dashboard", { replace: true }); })
      .catch(err => setMagicError(err instanceof Error ? err.message : "Invalid or expired magic link"))
      .finally(() => setMagicLoading(false));
  }, [searchParams, user, navigate]);

  // If already logged in, redirect
  if (user) { navigate((location.state as {from?:string})?.from ?? "/dashboard", { replace: true }); return null; }

  // Magic link loading
  if (magicLoading) {
    return <div className="flex min-h-[70vh] items-center justify-center"><div className="text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 mb-4" />
      <p className="text-lg font-medium text-neutral-700">Opening your space...</p>
      <p className="text-sm text-neutral-400 mt-1">One moment</p>
    </div></div>;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await login(email, password);
      const from = (location.state as { from?: string })?.from ?? "/dashboard";
      navigate(from, { replace: true });
    } catch {
      // error is set by useAuth
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-neutral-900">Welcome back</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Sign in to manage your photo space.
          </p>

          {magicError && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 mb-4">{magicError}</div>
          )}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">{error}</div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-2 text-center text-sm text-neutral-400">
            <Link to="/forgot-password" className="hover:text-primary-600">
              Forgot password?
            </Link>
          </p>
          <p className="mt-4 text-center text-sm text-neutral-500">
            Don&apos;t have a space?{" "}
            <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-700">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
