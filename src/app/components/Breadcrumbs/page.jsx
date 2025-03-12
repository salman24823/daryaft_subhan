"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Split path into parts
  const pathParts = pathname.split("/").filter((part) => part !== "");

  // Extract category from query parameters
  const category = searchParams.get("category");

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
                {index === pathParts.length - 1 && !category ? (
                  <span className="font-semibold">{formattedPart}</span> // Current page without category
                ) : (
                  <Link href={url} className="text-gray-600 hover:underline">
                    {formattedPart}
                  </Link>
                )}
              </li>
            );
          })}

        {/* Display Category if exists */}
        {category && (
          <li className="flex items-center">
            <span className="mx-2"> &gt; </span>
            <span className="font-semibold">{category}</span>
          </li>
        )}
      </ol>
    </nav>
  );
}
