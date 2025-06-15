import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verifica la sesión al cargar la app
  const checkSession = async () => {
    try {
      const res = await fetch(`${apiUrl}/users/session`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
        console.log(err)
      setUser(null);
    }
  };

  const logout = async () => {
    await fetch(`${apiUrl}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    window.location.href = "/"; // Redirige al inicio después de cerrar sesión
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
