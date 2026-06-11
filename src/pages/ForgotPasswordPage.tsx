import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError("");
    setSending(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset email");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
            <span className="text-4xl">📧</span>
            <h1 className="mt-4 text-xl font-bold text-emerald-800">Check your email</h1>
            <p className="mt-2 text-sm text-emerald-700">
              If an account exists for <strong>{email}</strong>, we've sent a password reset link.
            </p>
            <p className="mt-1 text-xs text-emerald-600">
              The link expires in 1 hour. Check your spam folder if you don't see it.
            </p>
            <Link to="/login" className="mt-6 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
              &larr; Back to login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-neutral-900">Forgot password</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Enter your email and we'll send you a reset link.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email
              </label>
              <input id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
            </div>
            <button type="submit" disabled={sending}
              className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50">
              {sending ? "Sending..." : "Send reset link"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-neutral-500">
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              &larr; Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
