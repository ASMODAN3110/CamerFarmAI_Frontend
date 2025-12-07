import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/authProvider';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicRoute } from './components/auth/PublicRoute';
import { HomePage } from './app/HomePage';
import { LoginPage } from './app/LoginPage';
import { SignUpPage } from './app/SignUpPage';
import { ListPlantationsPage } from './app/ListPlantationsPage';
import { PlantationDetailPage } from './app/PlantationDetailPage';
import { GraphsPage } from './app/GraphsPage';
import { MonitoringPage } from './app/MonitoringPage';
import { ProfilePage } from './app/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
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
            
            {/* Routes protégées - nécessitent une authentification */}
            <Route 
              path="/plantations" 
              element={
                <ProtectedRoute>
                  <ListPlantationsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/plantations/:id" 
              element={
                <ProtectedRoute>
                  <PlantationDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/graphs" 
              element={
                <ProtectedRoute>
                  <GraphsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/monitoring" 
              element={
                <ProtectedRoute>
                  <MonitoringPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            
            {/* Route catch-all - redirige vers la page d'accueil */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
