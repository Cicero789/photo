import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { GalleryPage } from "./pages/GalleryPage";
import { DashboardGalleryPage } from "./pages/DashboardGalleryPage";
import { SpaceGalleryPage } from "./pages/SpaceGalleryPage";
import { InspirationMapPage } from "./pages/InspirationMapPage";
import { HealthPage } from "./pages/HealthPage";
import { SpacePage } from "./pages/SpacePage";
import { DashboardPage } from "./pages/DashboardPage";
import { EventDetailPage } from "./pages/EventDetailPage";
import { AdminAdsPage } from "./pages/AdminAdsPage";
import { AdminPhotographersPage } from "./pages/AdminPhotographersPage";
import { PhotographerPage } from "./pages/PhotographerPage";
import { AlbumViewerPage } from "./pages/AlbumViewerPage";
import { AlbumsPage } from "./pages/AlbumsPage";
import { PhotographerProfilePage } from "./pages/PhotographerProfilePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MainLayout } from "./components/layout/MainLayout";

function CustomDomainRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const host = window.location.hostname;
    if (host === "framenest.photos" || host === "localhost" || host.endsWith(".photo-ll2.pages.dev")) { setChecked(true); return; }
    fetch(`/api/spaces/by-domain?domain=${host}`).then(r => r.json()).then((d: any) => {
      if (d.slug && location.pathname === "/") navigate(`/s/${d.slug}`, { replace: true });
      setChecked(true);
    }).catch(() => setChecked(true));
  }, [navigate, location.pathname]);
  return checked ? null : <div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" /></div>;
}

export default function App() {
  return (
    <AuthProvider>
      <CustomDomainRedirect />
      <Routes>
        {/* Standalone pages (no nav/footer) */}
        <Route path="/album/:token" element={<AlbumViewerPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/photographers" element={<PhotographerPage />} />
          <Route path="/p/:slug" element={<PhotographerProfilePage />} />
          <Route path="/inspiration" element={<InspirationMapPage />} />
          {/* Public space routes */}
          <Route path="/s/:spaceSlug" element={<SpacePage />} />
          <Route path="/s/:spaceSlug/e/:eventId" element={<EventDetailPage />} />
          <Route path="/s/:spaceSlug/e/:eventId/gallery" element={<GalleryPage />} />
          <Route path="/s/:spaceSlug/gallery" element={<SpaceGalleryPage />} />
          {/* Protected dashboard routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/events/:eventId"
            element={
              <ProtectedRoute>
                <EventDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/events/:eventId/gallery"
            element={
              <ProtectedRoute>
                <GalleryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/gallery"
            element={
              <ProtectedRoute>
                <DashboardGalleryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/albums"
            element={
              <ProtectedRoute>
                <AlbumsPage />
              </ProtectedRoute>
            }
          />
          {/* Platform owner routes */}
          <Route
            path="/health"
            element={
              <ProtectedRoute requiredRole="platform_owner">
                <HealthPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ads"
            element={
              <ProtectedRoute requiredRole="platform_owner">
                <AdminAdsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/photographers"
            element={
              <ProtectedRoute requiredRole="platform_owner">
                <AdminPhotographersPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
