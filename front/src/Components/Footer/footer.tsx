import Link from "next/link";

export default function Footer({ font }: { font: string }) {
  return (
    <footer
      className={`bg-gray-800 text-white py-8 ${font} flex flex-col items-center justify-center z-10 `}
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-4">
        {/* Información de derechos de autor */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>
            &copy; {new Date().getFullYear()} BingoOnline. All Rights Reserved.
          </p>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex space-x-6 text-sm">
          <Link href="#" className="hover:text-pastelYellow transition-colors">
            About Us
          </Link>
          <Link href="#" className="hover:text-pastelYellow transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-pastelYellow transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
