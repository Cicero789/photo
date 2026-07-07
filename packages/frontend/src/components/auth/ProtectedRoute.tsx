import { Navigate } from 'react-router-dom';
import { useAuth } from '../../data/queries/useAuth.js';
import type { Role } from '@framenest/shared';

export function ProtectedRoute({ children, requiredRole }: {
  children: React.ReactNode;
  requiredRole?: Role;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-200 border-t-primary-600 rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const roleLevels: Record<string, number> = { viewer: 1, staff: 2, page_admin: 3, platform_owner: 4 };
    if ((roleLevels[user.role] ?? 0) < (roleLevels[requiredRole] ?? 0)) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900">Access Denied</h2>
            <p className="mt-2 text-neutral-600">You need {requiredRole} privileges to access this page.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
