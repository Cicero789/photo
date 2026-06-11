import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function SignupPage() {
  const { signup, error, clearError, loading, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [spaceSlug, setSpaceSlug] = useState("");
  const [gateKey, setGateKey] = useState("");
  const [password, setPassword] = useState("");

  // If already logged in, redirect
  if (user) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await signup({ name, email, password, spaceName, spaceSlug, gateKey });
      navigate("/dashboard", { replace: true });
    } catch {
      // error is set by useAuth
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-neutral-900">Create your photo space</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Set up your family or business photo home in under a minute. Free forever.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                Your name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Johnson"
                className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
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
                placeholder="jane@example.com"
                className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div>
              <label htmlFor="spaceName" className="block text-sm font-medium text-neutral-700">
                Space name
              </label>
              <input
                id="spaceName"
                type="text"
                required
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                placeholder="The Johnson Family"
                className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div>
              <label htmlFor="spaceSlug" className="block text-sm font-medium text-neutral-700">
                Your link
              </label>
              <div className="mt-1.5 flex rounded-lg border border-border focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100">
                <span className="flex items-center rounded-l-lg bg-muted px-3 text-sm text-neutral-500">
                  photo.app/s/
                </span>
                <input
                  id="spaceSlug"
                  type="text"
                  required
                  value={spaceSlug}
                  onChange={(e) => setSpaceSlug(e.target.value)}
                  placeholder="johnson-family"
                  className="block w-full rounded-r-lg bg-white px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="gateKey" className="block text-sm font-medium text-neutral-700">
                Gate key
              </label>
              <input
                id="gateKey"
                type="password"
                required
                value={gateKey}
                onChange={(e) => setGateKey(e.target.value)}
                placeholder="A password for your guests"
                className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <p className="mt-1 text-xs text-neutral-400">
                Share this with people you want to invite. They&apos;ll need it to view your photos.
              </p>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Admin password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your personal login password"
                className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50"
            >
              {loading ? "Creating your space..." : "Create your space"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-neutral-500">
            Already have a space?{" "}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
