import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
  const [token, setToken] = useState(() => localStorage.getItem("token") || false);
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", token ? role : null);
  }, [token, role]);

  return (
    <Context.Provider value={{ sidebarOpen, setSidebarOpen, token, setToken, role, setRole }}>
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col">
          <Routes>
            {/* Защищённые маршруты */}
            <Route element={<ProtectedRoutes />}>
              <Route path="moderator/*" element={<Moderator />} />
              <Route path="user/*" element={<User />} />
              <Route path="admin/*" element={<Admin />} />
              <Route path="doctor/*" element={<Doctor />} />
            </Route>

            {/* Публичный маршрут логина */}
            <Route path="login" element={<Login />} />

            {/* Страница 404 — должна быть в самом конце */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
