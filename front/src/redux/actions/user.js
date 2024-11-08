import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCES,
  ACTIVATION_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
} from "./type";
// import axios from "axios";

// // Definimos la estructura del estado inicial
// interface AuthState {
//   access: string | null;
//   refresh: string | null;
//   isAuthenticated: boolean | null;
//   isSuperUser: boolean | null;
//   loading: boolean;
//   user: any | null; // Cambiar "any" por una interfaz específica si se define
// }

// Definimos la estructura de cada acción
// interface AuthAction {
//   type: string;
//   payload?: any; // Cambiar "any" según el tipo de cada acción o definir un tipo para el payload
// }

const initialState = {
  access:
    typeof window !== "undefined"
      ? localStorage.getItem("access") || null
      : null,
  refresh:
    typeof window !== "undefined"
      ? localStorage.getItem("refresh") || null
      : null,
  isAuthenticated: null,
  isSuperUser: null,
  loading: false,
  user: null,
};

export default function User(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };

    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      if (payload) {
        localStorage.setItem("access", payload.access);
        localStorage.setItem("refresh", payload.refresh);
      }
      return {
        ...state,
        access: payload?.access || null,
        refresh: payload?.refresh || null,
        isAuthenticated: true,
        loading: false,
      };

    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload?.user || null,
        isSuperUser: payload?.isSuperUser || null,
        isAuthenticated: true,
      };

    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case REFRESH_SUCCESS:
      if (payload) {
        localStorage.setItem("access", payload.access);
      }
      return {
        ...state,
        access: payload?.access || null,
      };

    case AUTHENTICATED_FAIL:
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        isSuperUser: null,
        user: null,
        loading: false,
      };

    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
        isSuperUser: null,
      };

    case ACTIVATION_SUCCES:
    case ACTIVATION_FAIL:
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
      };

    case REFRESH_FAIL:
      localStorage.removeItem("access");
      return {
        ...state,
        access: null,
      };

    default:
      return state;
  }
}
