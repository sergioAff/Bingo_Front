import Link from "next/link";
import { pressStart2P } from "@/app/fonts/fonts";

export default function Custom404() {
  return (
    <div
      className={`${pressStart2P.className} flex flex-col items-center justify-center h-screen `}
    >
      <h1 className="text-4xl font-bold text-gray-300">404</h1>
      <p className="text-lg text-gray-400">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-4 text-xl underline underline-offset-2 text-white"
      >
        Go back to Home
      </Link>
    </div>
  );
}
