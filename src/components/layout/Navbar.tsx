import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/photographers", label: "Photographers" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const { user, space, logout } = useAuth();
  const navigate = useNavigate();

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

        {/* Nav Links */}
        <div className="flex items-center gap-1">
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
      </nav>
    </header>
  );
}
