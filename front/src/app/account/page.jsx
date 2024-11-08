"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pressStart2P } from "@/app/fonts/fonts";
import { getUserInfo } from "@/lib/auth/authSlice"; // Importa la acción

export default function Account() {
  const { user, isLoading, isError, userInfo } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null); // Usar estado para email
  const [isAuthChecked, setIsAuthChecked] = useState(false); // Nuevo estado para controlar la carga

  useEffect(() => {
    const storedEmail = localStorage.getItem("authToken"); // Guardamos el email en una constante local
    if (storedEmail) {
      setEmail(storedEmail); // Actualizamos el estado con el valor de localStorage
    }

    if (!isAuthChecked) {
      setIsAuthChecked(true); // Marcar que la autenticación ha sido verificada

      // Redirigir al login si no hay usuario y no está en estado de carga
      if (!user && !isLoading) {
        setTimeout(() => {
          window.location.href = "/account/login";
        }, 1000);
      }

      // Si el usuario está logeado y los detalles no se han cargado, hacer la solicitud
      if (user) {
        const accessToken = user.access; // Accede al token
        if (accessToken) {
          dispatch(getUserInfo(accessToken)); // Llamada a la API para obtener los detalles
        }
      }
    }
  }, [user, isLoading, userInfo, dispatch, isAuthChecked]);

  // Mostrar un mensaje de carga mientras se verifica el estado de autenticación
  if (isLoading || !isAuthChecked) {
    return (
      <div className="flex justify-center items-center h-screen bg-pastelBlue">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  // Si hay error, mostrar un mensaje de error
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-pastelBlue">
        <div className="text-lg font-semibold text-red-600">
          Error occurred. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${pressStart2P.className} flex flex-col items-center justify-center mx-auto md:h-screen bg-pastelBlue`}
    >
      <div className="w-full rounded-lg shadow-lg sm:max-w-md bg-primary/85 ring-1 ring-gray-300 hover:ring-offset-2 transition-all duration-100 ease-in-out ring-offset-gray-300">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {user ? (
            <div>
              <h1 className="text-base font-semibold md:text-lg text-gray-900">
                Welcome!
              </h1>
              <p className="text-sm text-gray-600 mt-2">Email: {email}</p>{" "}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                You are not logged in.
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Please log in to view your account details.
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="mt-4 w-full py-2 px-4 bg-pastelYellow text-white rounded-lg hover:bg-pastelMint focus:outline-none focus:ring-2 focus:ring-pastelYellow"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
