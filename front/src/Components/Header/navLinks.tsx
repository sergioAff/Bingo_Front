"use client";

import { NavigationsLinks } from "@/Data/NavigationsLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <ul className="flex gap-4">
      {NavigationsLinks.map((link) => (
        <li
          key={link.name}
          className={clsx(
            "hover:scale-105 duration-150 ease-in-out transition-all text-lg hover:cursor-pointer",
            {
              "underline underline-offset-4 decoration-2 decoration-gray-800":
                pathName === link.path,
            }
          )}
        >
          <Link href={link.path}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
}
