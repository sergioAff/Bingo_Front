"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/Components/Account/Spinner";
import { resetPassword } from "@/lib/auth/authSlice";
import { pressStart2P } from "@/app/fonts/fonts"; // Fuente personalizada si es necesario

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email };
    dispatch(resetPassword(userData));
  };

  useEffect(() => {
    if (isError) {
      alert(`Error: ${message}`);
    }

    if (isSuccess) {
      alert("A reset password email has been sent to you.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, [isError, isSuccess, message]);

  return (
    <div
      className={`py-14 flex justify-center items-center min-h-screen bg-pastelBlue ${pressStart2P.className}`}
    >
      <div className="w-full sm:max-w-md bg-primary/85 rounded-lg shadow-lg ring-1 ring-gray-300 hover:ring-offset-2 transition-all duration-100 ease-in-out ring-offset-gray-300">
        <div className="p-6 sm:p-8">
          <h1
            className={`text-base md:text-lg font-semibold text-gray-900 text-center mb-6`}
          >
            Reset Password
          </h1>
          {isLoading && <Spinner />} {/* Muestra el spinner si está cargando */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Campo de Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
                placeholder="name@company.com"
              />
            </div>

            {/* Botón de envío */}
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
  );
};

export default ResetPasswordPage;
