import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../data/queries/useAuth.js';
import { Button } from '../ui/Button.js';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-display font-bold text-primary-600">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-primary-500">
              <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.1" />
              <path d="M8 12l8-6 8 6v10l-8 6-8-6V12z" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="16" cy="14" r="3" fill="currentColor" />
            </svg>
            FrameNest
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/inspiration" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Inspiration
            </Link>
            <Link to="/photographers" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Photographers
            </Link>
            <Link to="/s/demo" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
              Demo
            </Link>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/albums">
                  <Button variant="ghost" size="sm">Albums</Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="secondary" size="sm">Dashboard</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
