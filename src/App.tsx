import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { GalleryPage } from "./pages/GalleryPage";
import { SpaceGalleryPage } from "./pages/SpaceGalleryPage";
import { SpacePage } from "./pages/SpacePage";
import { DashboardPage } from "./pages/DashboardPage";
import { EventDetailPage } from "./pages/EventDetailPage";
import { AdminAdsPage } from "./pages/AdminAdsPage";
import { AdminPhotographersPage } from "./pages/AdminPhotographersPage";
import { PhotographerPage } from "./pages/PhotographerPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { MainLayout } from "./components/layout/MainLayout";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/photographers" element={<PhotographerPage />} />
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
          {/* Platform owner routes */}
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
