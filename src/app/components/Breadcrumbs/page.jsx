"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Split path into parts
  const pathParts = pathname.split("/").filter((part) => part !== "");

  return (
    <nav className="text-gray-600 text-sm">
      <ol className="flex space-x-2">
        {/* Home Link */}
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>

        {pathParts.length > 0 &&
          pathParts.map((part, index) => {
            const url = "/" + pathParts.slice(0, index + 1).join("/");
            const formattedPart = part.replace(/-/g, " ").toUpperCase(); // Format part

            return (
              <li key={url} className="flex items-center">
                <span className="mx-2"> &gt; </span>
                {index === pathParts.length - 1 ? (
                  <span className="font-semibold">{formattedPart}</span> // Current page
                ) : (
                  <Link href={url} className="text-blue-600 hover:underline">
                    {formattedPart}
                  </Link>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
}
