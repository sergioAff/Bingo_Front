import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src="/icon.png"
        alt="logo"
        width={80}
        height={100}
        priority
        title="Logo del Bingo"
        className="cursor-pointer"
      />
    </Link>
  );
}
