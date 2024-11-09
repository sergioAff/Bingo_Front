import { useRouter } from "next/navigation";

export const LogIn = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/account/login");
  };
  return (
    <button
      onClick={handleLogin}
      className="ring ring-gray-700 rounded-lg p-3 hover:bg-white/20 text-gray-900 transition-all duration-200 ease-in-out"
    >
      Log In
    </button>
  );
};
