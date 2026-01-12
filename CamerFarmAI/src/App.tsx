import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/authProvider';
import { NotificationProvider } from './contexts/NotificationContext';
import { CookieProvider } from './contexts/CookieContext';
import { CookieBanner } from './components/cookies/CookieBanner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicRoute } from './components/auth/PublicRoute';
import { RoleBasedRoute } from './components/auth/RoleBasedRoute';
import { UserRole } from './types/enums';
import { HomePage } from './app/HomePage';
import { LoginPage } from './app/LoginPage';
import { SignUpPage } from './app/SignUpPage';
import { ForgotPasswordPage } from './app/ForgotPasswordPage';
import { ResetPasswordPage } from './app/ResetPasswordPage';
import { ListPlantationsPage } from './app/ListPlantationsPage';
import { PlantationDetailPage } from './app/PlantationDetailPage';
import { GraphsPage } from './app/GraphsPage';
import { MonitoringPage } from './app/MonitoringPage';
import { ProfilePage } from './app/ProfilePage';
import { ChatboxPage } from './app/ChatboxPage';
import { NotificationsPage } from './app/NotificationsPage';
import TechnicianDashboardPage from './app/TechnicianDashboardPage';
import { AdminPage } from './app/AdministrationPage';
import { GuidePage } from './app/GuidePage';
import { DocumentationPage } from './app/DocumentationPage';
import { PrivacyPage } from './app/PrivacyPage';
import { TermsPage } from './app/TermsPage';
import { CookiesPage } from './app/CookiesPage';
import { SupportPage } from './app/SupportPage';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CookieProvider>
          <BrowserRouter>
            <Routes>
              {/* Routes publiques */}
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignUpPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPasswordPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <PublicRoute>
                    <ResetPasswordPage />
                  </PublicRoute>
                }
              />

              {/* Pages légales et documentation (Publiques) */}
              <Route path="/docs" element={<DocumentationPage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />

              {/* Routes protégées - nécessitent une authentification */}
              <Route
                path="/plantations"
                element={
                  <ProtectedRoute >
                    <ListPlantationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/plantations/:id"
                element={
                  <ProtectedRoute >
                    <PlantationDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/graphs"
                element={
                  <ProtectedRoute >
                    <GraphsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/monitoring"
                element={
                  <ProtectedRoute >
                    <MonitoringPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai"
                element={
                  <ProtectedRoute >
                    <ChatboxPage />
                  </ProtectedRoute>
                }
              />
              {/* Support route - Page de support */}
              <Route
                path="/support"
                element={<SupportPage />}
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute >
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute >
                    <NotificationsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/technicien"
                element={
                  <RoleBasedRoute allowedRoles={[UserRole.TECHNICIAN]} redirectTo="/">
                    <TechnicianDashboardPage />
                  </RoleBasedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <RoleBasedRoute allowedRoles={[UserRole.ADMIN]} redirectTo="/">
                    <AdminPage />
                  </RoleBasedRoute>
                }
              />

              {/* Route catch-all - redirige vers la page d'accueil */}
              <Route path="*" element={<Navigate to="/" replace />} />
              {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
            </Routes>
          </BrowserRouter>
          <CookieBanner />
        </CookieProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
