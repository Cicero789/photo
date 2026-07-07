import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './data/queries/useAuth.js';
import { AppShell } from './components/layout/AppShell.js';
import { ProtectedRoute } from './components/auth/ProtectedRoute.js';

// Pages — lazy-loaded for code splitting
import { HomePage } from './pages/HomePage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SignupPage } from './pages/SignupPage.js';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.js';
import { ResetPasswordPage } from './pages/ResetPasswordPage.js';
import { InspirationMapPage } from './pages/InspirationMapPage.js';
import { PhotographerPage } from './pages/PhotographerPage.js';
import { PhotographerProfilePage } from './pages/PhotographerProfilePage.js';
import { SpacePage } from './pages/SpacePage.js';
import { EventDetailPage } from './pages/EventDetailPage.js';
import { GalleryPage } from './pages/GalleryPage.js';
import { SpaceGalleryPage } from './pages/SpaceGalleryPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { AlbumsPage } from './pages/AlbumsPage.js';
import { AlbumViewerPage } from './pages/AlbumViewerPage.js';
import { ClientsPage } from './pages/ClientsPage.js';
import { ClientEditorPage } from './pages/ClientEditorPage.js';
import { ClientSitePage } from './pages/ClientSitePage.js';
import { ClientBlogPostPage } from './pages/ClientBlogPostPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';

// Admin pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.js';
import { AdminPeoplePage } from './pages/admin/AdminPeoplePage.js';
import { AdminContentPage } from './pages/admin/AdminContentPage.js';
import { AdminCommercePage } from './pages/admin/AdminCommercePage.js';
import { AdminDiscoveryPage } from './pages/admin/AdminDiscoveryPage.js';
import { AdminSystemPage } from './pages/admin/AdminSystemPage.js';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Standalone — no nav/footer */}
        <Route path="/album/:token" element={<AlbumViewerPage />} />

        {/* App shell — with nav/footer */}
        <Route element={<AppShell />}>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/inspiration" element={<InspirationMapPage />} />
          <Route path="/photographers" element={<PhotographerPage />} />

          {/* Public space */}
          <Route path="/s/:spaceSlug" element={<SpacePage />} />
          <Route path="/s/:spaceSlug/e/:eventId" element={<EventDetailPage />} />
          <Route path="/s/:spaceSlug/e/:eventId/gallery" element={<GalleryPage />} />
          <Route path="/s/:spaceSlug/gallery" element={<SpaceGalleryPage />} />

          {/* Client sites */}
          <Route path="/sites/:slug" element={<ClientSitePage />} />
          <Route path="/blog/:siteSlug/:postSlug" element={<ClientBlogPostPage />} />

          {/* Dashboard — authenticated */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/dashboard/events/:eventId" element={<ProtectedRoute><EventDetailPage /></ProtectedRoute>} />
          <Route path="/dashboard/events/:eventId/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
          <Route path="/albums" element={<ProtectedRoute><AlbumsPage /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute><ClientsPage /></ProtectedRoute>} />
          <Route path="/clients/:id/edit" element={<ProtectedRoute><ClientEditorPage /></ProtectedRoute>} />

          {/* Admin — platform_owner only */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="platform_owner"><AdminDashboardPage /></ProtectedRoute>} />
          <Route path="/admin/people" element={<ProtectedRoute requiredRole="platform_owner"><AdminPeoplePage /></ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute requiredRole="platform_owner"><AdminContentPage /></ProtectedRoute>} />
          <Route path="/admin/commerce" element={<ProtectedRoute requiredRole="platform_owner"><AdminCommercePage /></ProtectedRoute>} />
          <Route path="/admin/discovery" element={<ProtectedRoute requiredRole="platform_owner"><AdminDiscoveryPage /></ProtectedRoute>} />
          <Route path="/admin/system" element={<ProtectedRoute requiredRole="platform_owner"><AdminSystemPage /></ProtectedRoute>} />

          {/* Professional profile — catch-all-ish (before 404) */}
          <Route path="/:slug" element={<PhotographerProfilePage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
