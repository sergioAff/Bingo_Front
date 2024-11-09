"use client";

import { useEffect, useState } from "react";
import NavigationLinks from "../Header/navLinks";
import Logo from "../Header/logo";
import LogOut from "../Account/LogOut";
import { useSelector } from "react-redux";

export default function Header({ font }) {
  const [isClient, setIsClient] = useState(false); // Estado para verificar si estamos en el cliente
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = () => {
    window.location = "/account/login";
  };

  return (
    <div
      className={`flex items-center justify-between font-semibold ${font} p-3 bg-gray-500 backdrop-blur-lg shadow-md shadow-gray-500/20 z-10`}
    >
      <div className="flex items-center justify-between gap-5">
        <Logo />
        <NavigationLinks />
      </div>
      {isClient &&
        (user ? (
          <LogOut />
        ) : (
          <button
            onClick={handleLogin}
            className="ring ring-gray-700 rounded-lg p-3 hover:bg-white/20 text-gray-900 transition-all duration-200 ease-in-out"
          >
            Log In
          </button>
        ))}
    </div>
  );
}
