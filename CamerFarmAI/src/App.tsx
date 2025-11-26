import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './app/HomePage';
import { LoginPage } from './app/LoginPage';
import { SignUpPage } from './app/SignUpPage';
import { ListPlantationsPage } from './app/ListPlantationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/plantations" element={<ListPlantationsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
