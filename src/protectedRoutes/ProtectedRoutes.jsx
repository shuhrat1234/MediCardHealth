import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { refreshToken, verify } from "../api/services/authService";
import React from "react";
// ProtectedRoutes Component
export default function ProtectedRoutes() {
  const location = useLocation();
  const [isValid, setIsValid] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  const roleRoutes = {
    1: "/admin",
    2: "/moderator",
    3: "/doctor",
    4: "/user",
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (!accessToken) {
        setIsValid(false);
        return;
      }

      try {
        await verify({ token: accessToken });
        setIsValid(true);
      } catch (error) {
        if (error.response?.status === 401) {
          const refresh = localStorage.getItem("refreshToken");
          if (refresh) {
            try {
              const response = await refreshToken({ refresh });
              localStorage.setItem("accessToken", response.data.access);
              localStorage.setItem("refreshToken", response.data.refresh);
              setIsValid(true);
            } catch (refreshError) {
              setIsValid(false);
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("role");
            }
          } else {
            setIsValid(false);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("role");
          }
        } else {
          setIsValid(false);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("role");
        }
      }
    };

    checkTokenValidity();
  }, [accessToken]);

  if (isValid === null) {
    return <div className="text-center py-10">Tekshirilmoqda...</div>;
  }

  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const pathname = location.pathname;
  const role = parseInt(localStorage.getItem("role"));

  const allowedPath = roleRoutes[role];

  if (!allowedPath || !pathname.startsWith(allowedPath)) {
    return <Navigate to={allowedPath || "/login"} replace />;
  }

  return <Outlet />;
}
