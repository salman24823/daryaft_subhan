"use client";

import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs/page";
import { useSearchParams } from "next/navigation";

import {
  Columns2,
  Columns3,
  Columns4,
  Grid,
  RectangleVertical,
} from "lucide-react"; // Added Grid for 5 columns
import { FaStar } from "react-icons/fa";
import { Spinner } from "@heroui/react";

const ShopContent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [columns, setColumns] = useState(5); // Default 5 columns
  const searchParams = useSearchParams();

  // Mapping object for grid classes
  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  };

  useEffect(() => {
    const getProducts = async () => {

      setLoading(true);
      try {
        let url = ""

        if(category){
          url = `/api/getProduct?category=${category}`
        } else if(collectionName){
          url = `/api/getProduct?collectionName=${collectionName}`
        }

        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          return;
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [category, collectionName]); // Refetch products when category or collectionName changes

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const collectionParam = searchParams.get("collectionName");
    if (categoryParam) {
      setCategory(categoryParam);
      setCollectionName(""); // Reset collectionName if category exists
    } else if (collectionParam) {
      setCollectionName(collectionParam);
      setCategory(""); // Reset category if collectionName exists
    } 

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
  }, [searchParams]);

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full h-[80vh] bg-[url(./../../public/banner/news2.png)] bg-cover bg-no-repeat"></div>
      <div className="flex justify-center bg-gray-100 gap-5">
        <a
          href={"/shop?category=Men"}
          className="text-medium py-5 px-2 hover:bg-[#be8049] w-24 text-center hover:text-white font-semibold text-gray-700"
        >
          Mens
        </a>
        <a
          href={"/shop?category=Women"}
          className="text-medium py-5 px-2 hover:bg-[#be8049] w-24 text-center hover:text-white font-semibold text-gray-700"
        >
          Womens
        </a>
        <a
          href={"/shop?category=Kids"}
          className="text-medium py-5 px-2 hover:bg-[#be8049] w-24 text-center hover:text-white font-semibold text-gray-700"
        >
          Kids
        </a>
      </div>

      {/* Products Section */}
      <div className="p-[5%] flex flex-col gap-12 bg-gray-50">
        {loading ? (
          <div className="w-full flex justify-center py-10">
            <Spinner />
          </div>
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
            <div>
              {products.length === 0 ? (
                <p className="text-center">No products found.</p>
              ) : (
                <div
                  className={`New_arrival w-full grid gap-5 items-stretch justify-between ${gridClasses[columns]}`}
                >
                  {products.map((product) => (
                    <Link
                      key={product._id}
                      href={`/detail?product_id=${product._id}`}
                      className="product_card hover:cursor-pointer"
                    >
                      <div key={product._id}>
                        <div className="card_image h-[70%] w-full relative">
                          <img
                            src={product.thumbnail || "/product.png"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover img_hide  absolute"
                          />
                          <img
                            src={product.hoverImage || "/product.png"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover img_show"
                          />
                        </div>
                        <div className="card_cont w-full h-[7.5rem] flex flex-col justify-between p-3">
                          <span className="text-gray-500 text-medium">
                          {product.categories.map((category)=> <p className="text-gray-600 text-sm font-semibold">{category}</p> )}
                          </span>
                          <strong className="text-[14px] lg:text-medium text-gray-800">
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
                              <span className="rating_count border-gray-400 border-l-2 px-2">
                                2278
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Shop = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
};

export default Shop;
