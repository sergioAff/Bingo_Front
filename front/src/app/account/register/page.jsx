"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pressStart2P } from "@/app/fonts/fonts";
import { register, reset } from "@/lib/auth/authSlice";
import Spinner from "@/Components/Account/Spinner";

export default function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { first_name, last_name, email, password, re_password } = formData;

  // Tipamos `useDispatch` y `useSelector`
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Manejar cambios en el formulario con tipos definidos
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Manejar el envío del formulario con tipos
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== re_password) {
      alert("Passwords do not match");
    } else {
      const userData = {
        first_name,
        last_name,
        email,
        password,
        re_password,
      };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      alert(
        "An activation email has been sent to your email. Please check your email"
      );
      // Redirigir al login utilizando window.location
      window.location.href = "/account/activate";
    }

    dispatch(reset());
  }, [isError, isSuccess, user, dispatch, message]);

  return (
    <div className="py-14">
      {isLoading && <Spinner />}
      <div
        className={`${pressStart2P.className} flex flex-col items-center justify-center mx-auto md:h-screen bg-pastelBlue`}
      >
        <div className="w-full rounded-lg shadow-lg sm:max-w-md bg-primary/85 ring-1 ring-gray-300 hover:ring-offset-2 transition-all duration-100 ease-in-out ring-offset-gray-300">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-base font-semibold md:text-lg text-gray-900">
              Create a new account
            </h1>
            <form className="space-y-4 md:space-y-6 auth__form">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={first_name}
                  onChange={handleChange}
                  className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
                  placeholder="Your first name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={last_name}
                  onChange={handleChange}
                  className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
                  placeholder="Your last name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
                  placeholder="name@company.com"
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
                  value={password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="re_password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="re_password"
                  id="re_password"
                  value={re_password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="border rounded-lg focus:ring-pastelYellow focus:border-pastelYellow block w-full p-2.5 bg-gray-100 border-gray-800 placeholder-gray-500 text-gray-900 focus:ring-2"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full text-white bg-pastelYellow hover:bg-pastelMint focus:ring-4 focus:outline-none focus:ring-pastelYellow font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:underline"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/account/login"
                  className="font-medium text-pastelYellow hover:underline text-pastelMint"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
