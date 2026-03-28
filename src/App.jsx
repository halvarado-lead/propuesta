import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ServiciosPage from './pages/ServiciosPage';
import TramiteDetailPage from './pages/TramiteDetailPage';
import TramiteOnlinePage from './pages/TramiteOnlinePage';
import NoticiasPage from './pages/NoticiasPage';
import TransparenciaPage from './pages/TransparenciaPage';
import ContactoPage from './pages/ContactoPage';
import InstitucionPage from './pages/InstitucionPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/servicios" element={<ServiciosPage />} />
            <Route path="/servicios/:slug" element={<TramiteDetailPage />} />
            <Route path="/noticias" element={<NoticiasPage />} />
            <Route path="/transparencia" element={<TransparenciaPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/institucion" element={<InstitucionPage />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
            />
            <Route
              path="/tramite/:slug"
              element={<ProtectedRoute><TramiteOnlinePage /></ProtectedRoute>}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
