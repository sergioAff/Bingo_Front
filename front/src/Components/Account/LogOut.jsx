"use client";

import { useDispatch } from "react-redux";
import { logout } from "@/lib/auth/authSlice"; // Acción para cerrar sesión

const LogOut = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    // Verificar si el usuario está autenticado
    const isAuthenticated = localStorage.getItem("authToken"); // Suponiendo que el token de autenticación está en localStorage

    if (isAuthenticated) {
      // Si está autenticado, cerramos la sesión
      dispatch(logout());
      localStorage.removeItem("authToken"); // Elimina el token de localStorage (si estás usando localStorage para mantener la sesión)
      alert("Logged out successfully!"); // Mensaje de éxito
      window.location.href = "/account/login"; // Redirige a la página de login
    } else {
      // Si no está autenticado, lo redirige a la página de login
      alert("No active session found. Redirecting to login.");
      window.location.href = "/account/login";
    }
  };

  return (
    <button
      className="ring ring-gray-700 rounded-lg p-3 hover:bg-white/20 text-gray-900 transition-all duration-200 ease-in-out"
      onClick={handleLogOut}
    >
      Log Out
    </button>
  );
};

export default LogOut;
