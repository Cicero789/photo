import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { NotificationBell } from "@/components/shared/NotificationBell";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/s/demo", label: "Demo" },
  { to: "/inspiration", label: "Inspiration" },
  { to: "/photographers", label: "Photographers" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const { user, space, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary-600"
        >
          <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="currentColor" className="text-primary-100" />
            <rect
              x="6.5"
              y="6.5"
              width="19"
              height="19"
              rx="4"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary-600"
            />
            <path
              d="M10.5 20.5l3.5-4.5 2.5 3 2.5-3.5 2.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary-600"
            />
            <circle cx="20.5" cy="11.5" r="1.8" fill="currentColor" className="text-accent-400" />
          </svg>
          FrameNest
        </Link>

        {/* Desktop Nav Links — hidden on mobile */}
        <div className={cn("flex items-center gap-1", "max-lg:hidden")}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.to
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth area */}
          <div className="ml-4 flex items-center gap-2 border-l border-border pl-4">
            {user ? (
              <>
                <NotificationBell />
                <Link
                  to="/albums"
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === "/albums"
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                  )}
                >
                  Albums
                </Link>
                <Link
                  to="/dashboard"
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === "/dashboard"
                      ? "bg-primary-50 text-primary-700"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                  )}
                >
                  {space?.name ?? "Dashboard"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
                >
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Hamburger button — visible only on mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2" aria-label="Toggle menu">
          <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-border p-4 flex flex-col gap-2 shadow-lg z-40">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg",
                pathname === link.to
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-neutral-50",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border mt-2 pt-2 flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/albums" onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg">
                  Albums
                </Link>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg">
                  {space?.name ?? "Dashboard"}
                </Link>
                <button onClick={() => { setMenuOpen(false); handleLogout(); }}
                  className="px-3 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-50 rounded-lg text-left">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 rounded-lg">
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg text-center">
                  Sign up free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
