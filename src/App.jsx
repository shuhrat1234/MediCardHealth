import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Moderator from "./pages/moderator/Moderator";
import Admin from "./pages/admin/Admin";
import User from "./pages/user/User";
import Doctor from "./pages/doctor/Doctor";
import Login from "./pages/login/Login";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import Page404 from "./pages/404/Page404";

export const Context = createContext();

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [token, role]);

  return (
    <Context.Provider
      value={{ sidebarOpen, setSidebarOpen, token, setToken, role, setRole }}
    >
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col">
          <Routes>
            {/* Публичный маршрут логина */}
            <Route path="/login" element={<Login />} />

            {/* Приватные маршруты — защищены через ProtectedRoutes */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/moderator/*" element={<Moderator />} />
              <Route path="/user/*" element={<User />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/doctor/*" element={<Doctor />} />

              {/* Только если авторизован — показать 404 */}
              <Route path="*" element={<Page404 />} />
            </Route>

            {/* Все остальные (если не авторизован) → редирект на логин */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
