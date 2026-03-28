import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('atm_session');
    if (session) {
      try { setUser(JSON.parse(session)); } catch(e) { localStorage.removeItem('atm_session'); }
    }
    setLoading(false);
  }, []);

  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem('atm_users') || '[]'); } catch { return []; }
  };

  const login = (identifier, password) => {
    const users = getUsers();
    const found = users.find(u => (u.cedula === identifier || u.email === identifier) && u.password === password);
    if (!found) return { success: false, error: 'Credenciales incorrectas. Verifique su cedula/email y contrasena.' };
    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem('atm_session', JSON.stringify(userData));
    return { success: true };
  };

  const register = (data) => {
    const users = getUsers();
    if (users.find(u => u.cedula === data.cedula)) return { success: false, error: 'Ya existe una cuenta con esta cedula.' };
    if (users.find(u => u.email === data.email)) return { success: false, error: 'Ya existe una cuenta con este email.' };
    const newUser = { ...data, fechaRegistro: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('atm_users', JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem('atm_session', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => { setUser(null); localStorage.removeItem('atm_session'); };

  const updateProfile = (data) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.cedula === user.cedula);
    if (idx !== -1) { users[idx] = { ...users[idx], ...data }; localStorage.setItem('atm_users', JSON.stringify(users)); }
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('atm_session', JSON.stringify(updated));
  };

  const getUserTramites = () => {
    try { return JSON.parse(localStorage.getItem(`atm_tramites_${user?.cedula}`) || '[]'); } catch { return []; }
  };

  const saveTramite = (tramite) => {
    const tramites = getUserTramites();
    tramites.unshift({ ...tramite, id: Date.now(), fecha: new Date().toISOString(), estado: 'En revision' });
    localStorage.setItem(`atm_tramites_${user.cedula}`, JSON.stringify(tramites));
    return tramites[0];
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout, updateProfile, getUserTramites, saveTramite }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth must be used within AuthProvider'); return ctx; };
