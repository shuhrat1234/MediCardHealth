import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Context } from "../App";
import React from "react";
export default function ProtectedRoutes() {
  const { token, role } = useContext(Context);
  const location = useLocation();

  // Если нет токена — редирект на логин
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const pathname = location.pathname;

  const roleRoutes = {
    admin: "/admin",
    moderator: "/moderator",
    doctor: "/doctor",
    user: "/user",
  };

  const allowedPath = roleRoutes[role];

  // Если роль невалидна — логин
  if (!allowedPath) {
    return <Navigate to="/login" replace />;
  }

  // Если пользователь зашёл в чужой раздел — редирект в свой
  if (!pathname.startsWith(allowedPath)) {
    return <Navigate to={allowedPath} replace />;
  }

  // Если всё ок — отрисовываем вложенные маршруты
  return <Outlet />;
}
