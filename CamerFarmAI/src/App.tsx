import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/authProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './app/HomePage';
import { LoginPage } from './app/LoginPage';
import { SignUpPage } from './app/SignUpPage';
import { ListPlantationsPage } from './app/ListPlantationsPage';
import { PlantationDetailPage } from './app/PlantationDetailPage';
import { GraphsPage } from './app/GraphsPage';
import { MonitoringPage } from './app/MonitoringPage';
import { ProfilePage } from './app/ProfilePage';
import { ChatboxPage } from './app/ChatboxPage';
function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
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
            path="/ia" 
            element={
            
              <ChatboxPage />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
