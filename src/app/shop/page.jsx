"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Mens"); // Ensure category is a string

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
  }, [category]);

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full h-[80vh] bg-[url(./../../public/banner/news2.png)] bg-cover bg-no-repeat"></div>

      {/* Products Section */}
      <div className="p-[5%] flex flex-col items-center gap-12 bg-gray-50">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="New_arrival w-full grid grid-cols-5 justify-between gap-5">
            {products.map((product) => (
              <Link key={product._id} href={`/detail?product_id=${product._id}`}>
                <div key={product._id} className="product_card hover:cursor-pointer  h-[440px]">
                  <div className="card_image h-[70%] w-full">
                    <img
                      src={product.thumbnail || "/product.png"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="card_cont w-full h-[30%] flex flex-col justify-between p-3">
                    <span className="text-gray-500 text-medium">{product.collectionName}</span>
                    <strong className="text-medium text-gray-800">{product.name}</strong>
                    <div className="flex justify-between">
                      <div className="flex gap-3">
                      <span className="font-bold">${product.salePrice}</span>
                      <span className="line-through text-red-600 font-semibold">${product.regularPrice}</span>
                      </div>

                      <span className="flex items-center gap-2 text-gray-400">
                        <FaStar className="text-yellow-500" />
                        4.9 <span className="border-gray-400 border-l-2 px-2">2278</span>
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
  );
};

export default Shop;
