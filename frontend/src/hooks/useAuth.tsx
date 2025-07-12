"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface JwtPayload {
  sub: string;
  exp: number;
}

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (creds: { username: string; password: string }) => Promise<void>;
  register: (creds: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { sub: username, exp } = jwtDecode<JwtPayload>(token);
        if (Date.now() / 1000 < exp) {
          setUser({ username });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const { data } = await axios.post<{ access_token: string }>(
      `${API_URL}/sign-in`,
      form,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    const token = data.access_token;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const { sub } = jwtDecode<JwtPayload>(token);
    setUser({ username: sub });
  };

  const register = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await axios.post(`${API_URL}/sign-up`, { username, password });
    return login({ username, password });
  };

  const logout = async () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
