"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordConfirm } from "../../lib/auth/authSlice";

const ResetPasswordPageConfirm = () => {
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const [uid, setUid] = useState(null);
  const [token, setToken] = useState(null);

  const { new_password, re_new_password } = formData;

  const [isClient, setIsClient] = useState(false); // Estado para saber si es cliente

  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsClient(true); // Solo ejecutar esto cuando el componente se monta en el cliente
  }, []);

  useEffect(() => {
    // Solo ejecutar este código en el cliente
    if (isClient) {
      const urlParams = new URLSearchParams(window.location.search);
      setUid(urlParams.get("uid")); // Obtiene el parámetro uid
      setToken(urlParams.get("token")); // Obtiene el parámetro token
    }
  }, [isClient]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (uid && token) {
      // Asegúrate de que los parámetros estén presentes
      const userData = {
        uid,
        token,
        new_password,
        re_new_password,
      };

      dispatch(resetPasswordConfirm(userData));
    } else {
      alert("Invalid reset password link.");
    }
  };

  useEffect(() => {
    if (isError) {
      alert(message); // Mensaje de error
    }
    if (isSuccess) {
      alert("Your password was reset successfully.");
      // Aquí puedes redirigir a otra página si es necesario, por ejemplo:
      window.location.href = "/login"; // Redirige a la página de login
    }
  }, [isError, isSuccess, message]);

  return (
    <>
      <div
        className={`py-14 flex justify-center items-center min-h-screen bg-pastelBlue`}
      >
        <div className="w-full sm:max-w-md bg-primary/85 rounded-lg shadow-lg ring-1 ring-gray-300 hover:ring-offset-2 transition-all duration-100 ease-in-out ring-offset-gray-300">
          <div className="p-6 sm:p-8">
            <h1 className="text-base md:text-lg font-semibold text-gray-900 text-center mb-6">
              Reset Password
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo de nueva contraseña */}
              <div>
                <label
                  htmlFor="new_password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  value={new_password}
                  onChange={handleChange}
                  required
                  className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
                  placeholder="Enter new password"
                />
              </div>

              {/* Confirmar nueva contraseña */}
              <div>
                <label
                  htmlFor="re_new_password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="re_new_password"
                  name="re_new_password"
                  value={re_new_password}
                  onChange={handleChange}
                  required
                  className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
                  placeholder="Re-enter new password"
                />
              </div>

              {/* Botón de reset */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full text-white bg-pastelYellow hover:bg-pastelMint focus:ring-4 focus:outline-none focus:ring-pastelYellow font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Reset Password
                </button>
              </div>
            </form>
            <p className="text-sm font-light text-gray-600 text-center mt-4">
              If you have not received the email, check your spam folder
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPageConfirm;
