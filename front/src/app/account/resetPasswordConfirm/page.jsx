"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordConfirm } from "@/lib/auth/authSlice";
import Spinner from "@/Components/Account/Spinner";

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
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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
      alert(message);
    }
    if (isSuccess) {
      alert("Your password was reset successfully.");
    }
  }, [isError, isSuccess, message]);

  return (
    <>
      <div className="container auth__container">
        <h1 className="main__title">Reset Password here</h1>

        {isLoading && <Spinner />}

        <form className="auth__form">
          <input
            type="password"
            placeholder="New password"
            name="new_password"
            onChange={handleChange}
            value={new_password}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            name="re_new_password"
            onChange={handleChange}
            value={re_new_password}
            required
          />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordPageConfirm;
