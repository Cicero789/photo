import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole) {
    const roleRank: Record<string, number> = { viewer: 0, staff: 1, page_admin: 2, platform_owner: 3 };
    const requiredRank = roleRank[requiredRole] ?? 0;
    const userRank = roleRank[user.role] ?? 0;
    if (userRank < requiredRank) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-neutral-700">Access denied</h2>
            <p className="mt-2 text-neutral-500">You need {requiredRole} or higher. Your role: {user.role}.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
