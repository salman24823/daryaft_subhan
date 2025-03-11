"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Breadcrumbs from "../components/Breadcrumbs/page";
import {
  Columns2,
  Columns3,
  Columns4,
  Grid,
  RectangleVertical,
} from "lucide-react"; // Added Grid for 5 columns
import { FaStar } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Men");
  const [columns, setColumns] = useState(5); // Default 5 columns

  // Mapping object for grid classes
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const url = `/api/getProduct?category=${category}`;
      console.log("Fetching from URL:", url);

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast.error(errorData.error || "Failed to fetch products");
        return;
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();

    const updateColumns = () => {
      if (window.innerWidth < 768) {
        setColumns(1); // Mobile (smaller than md)
      } else if (window.innerWidth < 1024) {
        setColumns(3); // Tablet (md)
      } else {
        setColumns(5); // Laptop (lg and above)
      }
    };

    updateColumns(); // Set initial value based on screen size
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, [category]);

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full h-[80vh] bg-[url(./../../public/banner/news2.png)] bg-cover bg-no-repeat"></div>

      {/* Products Section */}
      <div className="p-[5%] flex flex-col gap-12 bg-gray-50">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div>
            {/* Breadcrumbs */}
            <div className="max-md:mt-5 max-md:mb-5 mb-10 flex justify-between items-center">
              <Breadcrumbs />

              {/* Column Selector */}
              <div className="flex space-x-2">
                {[
                  { icon: <RectangleVertical />, value: 1 },
                  { icon: <Columns2 />, value: 2 },
                  { icon: <Columns3 />, value: 3 },
                  { icon: <Columns4 />, value: 4 },
                  { icon: <Grid />, value: 5 },
                ].map(({ icon, value }, index) => (
                  <button
                    key={value}
                    onClick={() => setColumns(value)}
                    className={`px-1 flex items-center justify-center ${
                      columns === value ? "text-amber-800" : ""
                    } 
                  ${
                    index > 1 ? "hidden md:inline-flex" : ""
                  } /* Mobile: Show only index 0, 1 */
                  ${
                    index > 2 ? "md:hidden lg:inline-flex" : ""
                  } /* Tablet: Show index 0, 1, 2 */
                  `}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div
              className={`New_arrival w-full grid gap-5 justify-between ${gridClasses[columns]}`}
            >
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/detail?product_id=${product._id}`}
                >
                  <div
                    key={product._id}
                    className="product_card hover:cursor-pointer  h-[440px]"
                  >
                    <div className="card_image h-[70%] w-full">
                      <img
                        src={product.thumbnail || "/product.png"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="card_cont w-full h-auto flex flex-col justify-between p-3">
                      <span className="text-gray-500 text-medium">
                        {product.collectionName}
                      </span>
                      <strong className="text-medium text-gray-800">
                        {product.name}
                      </strong>
                      <div className="flex justify-between">
                        <div className="flex gap-3">
                          <span className="font-bold">
                            ${product.salePrice}
                          </span>
                          <span className="line-through text-red-600 font-semibold">
                            ${product.regularPrice}
                          </span>
                        </div>

                        <span className="flex items-center gap-2 text-gray-400">
                          <FaStar className="text-yellow-500" />
                          4.9{" "}
                          <span className="border-gray-400 border-l-2 px-2">
                            2278
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
