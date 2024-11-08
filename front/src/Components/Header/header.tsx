"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NavigationLinks from "@/Components/Header/navLinks";
import Logo from "@/Components/Header/logo";
import LogOut from "@/Components/Account/LogOut";

export default function Header({ font }: { font: string }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // Estado para verificar si estamos en el cliente
  const { user } = useSelector((state: any) => state.auth);

  // Usar `useEffect` para activar `isClient` después del renderizado inicial
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = () => {
    router.push("/account/login");
  };

  return (
    <div
      className={`flex items-center justify-between font-semibold ${font} p-3 bg-gray-500 backdrop-blur-lg shadow-md shadow-gray-500/20 z-10`}
    >
      <div className="flex items-center justify-between gap-5">
        <Logo />
        <NavigationLinks />
      </div>
      {/* Solo renderizar los botones cuando estemos en el cliente */}
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
