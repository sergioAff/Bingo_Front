"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login, reset, getUserInfo } from "../../lib/auth/authSlice";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
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
    const userData = {
      email,
      password,
    };
    dispatch(login(userData)); // Dispara la acción de login
  };

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess && user) {
      alert("Login successful!");
      localStorage.setItem("authToken", email);
      window.location.href = "../";
    }

    if (isSuccess && !user) {
      dispatch(getUserInfo());
    }

    return () => {
      dispatch(reset()); // Limpiar el estado después del efecto
    };
  }, [isError, isSuccess, user, dispatch, message, email]);

  return (
    <div
      className={`flex flex-col items-center justify-center mx-auto md:h-screen bg-pastelBlue`}
    >
      <div className="w-full rounded-lg shadow-lg sm:max-w-md bg-primary/85 ring-1 ring-gray-300 hover:ring-offset-2 transition-all duration-100 ease-in-out ring-offset-gray-300">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-base font-semibold md:text-lg text-gray-900">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2 "
                placeholder="name@company.com"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
                placeholder="••••••••"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/account/resetPassword"
                className="text-sm font-medium text-pastelMint hover:underline text-gray-900"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full text-black border bg-pastelYellow hover:bg-pastelMint focus:ring-4 focus:outline-none focus:ring-pastelYellow font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-600">
              Do not have an account yet?{" "}
              <Link
                href="/account/register"
                className="font-medium text-pastelYellow hover:underline text-pastelMint"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
