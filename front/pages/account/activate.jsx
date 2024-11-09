"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activate, reset } from "../../lib/auth/authSlice";
import Link from "next/link";

const ActivatePage = () => {
  const [uid, setUid] = useState(null);
  const [token, setToken] = useState(null);

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUid(urlParams.get("uid"));
    setToken(urlParams.get("token"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!uid || !token) {
      alert("Invalid activation link.");
      return;
    }

    const userData = { uid, token };
    dispatch(activate(userData));
    alert("Your account has been activated! You can login now.");
  };

  const handleUidChange = (e) => {
    setUid(e.target.value); // Actualiza el estado de uid con el valor del input
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value); // Actualiza el estado de token con el valor del input
  };

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess) {
      window.location.href = "/account/login/"; // Redirige al login
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  return (
    <div className="py-14 flex justify-center items-center min-h-screen bg-pastelBlue">
      <div className="w-full sm:max-w-md bg-primary/85 rounded-lg shadow-lg ring-1 ring-gray-300 hover:ring-offset-2 transition-all duration-100 ease-in-out ring-offset-gray-300">
        <div className="p-6 sm:p-8">
          <h1
            className={`text-base md:text-lg text-black  font-semibold text-center mb-6`}
          >
            Activate Account
          </h1>

          {/* Formulario de activación */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo de UID */}
            <div>
              <label
                htmlFor="uid"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                UID
              </label>
              <input
                type="text"
                id="uid"
                name="uid"
                value={uid || ""}
                onChange={handleUidChange} // Manejador para el cambio en el campo uid
                className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
              />
            </div>

            {/* Campo de Token */}
            <div>
              <label
                htmlFor="token"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Token
              </label>
              <input
                type="text"
                id="token"
                name="token"
                value={token || ""}
                onChange={handleTokenChange} // Manejador para el cambio en el campo token
                className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
              />
            </div>

            {/* Botón de activación */}
            <div className="flex justify-center">
              <button
                className="w-full text-black border bg-pastelYellow hover:bg-pastelMint focus:ring-4 focus:outline-none focus:ring-pastelYellow font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Activate Account
              </button>
            </div>
          </form>

          <p className="text-sm font-light text-gray-600 text-center mt-4">
            If you have not received the email, check your spam folder or{" "}
            <Link
              href="/resend-activation"
              className="font-medium text-pastelYellow hover:underline text-pastelMint"
            >
              resend the activation link.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivatePage;
