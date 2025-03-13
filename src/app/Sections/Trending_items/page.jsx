"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Spinner } from "@heroui/react";
const Featured_products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectionName, setCollectionName] = useState("Trending");

  const getProducts = async () => {
    setLoading(true);
    try {
      const url = `/api/getProduct?collectionName=${collectionName}`;
      console.log("Fetching from URL:", url);

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

  useEffect(() => {
    getProducts();
  }, [collectionName]);

  return (
    <section className="w-full">
      <div className="p-[5%] flex flex-col items-center gap-12 bg-gray-50">
        <div className="text-center">
          <h2 className="heading--primary">Trending Products</h2>
        </div>

        {loading ? (
          <div className="flex gap-5">
            <Spinner />
          </div>
        ) : (
          <div>
            {/* Product Grid */}
            <div
              className={`New_arrival w-full grid gap-5 justify-between grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2`}
            >
              {products.length > 0 ? (
                products.slice(0, 4).map((product) => (
                  <Link
                    key={product._id}
                    href={`/detail?product_id=${product._id}`}
                    className="product_card hover:cursor-pointer"
                  >
                    <div key={product._id}>
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
                      <div className="flex gap-3">
                      {product.categories.map((category)=> <p className="text-gray-600 text-sm font-semibold">{category}</p> )}
                      </div>
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
                ))
              ) : (
                <div className="flex w-full text-center justify-center" >
                  <p className="w-full text-center">
                    No product available
                  </p>
                  </div>
              )}
            </div>
          </div>
        )}
                  <Link href={"/shop?collectionName=Trending"} className="self-end">
            {" "}
            <span className="flex justify-center mt-2 items-center gap-4">
              View All
              <FaArrowRight />
            </span>
          </Link>
      </div>
    </section>
  );
};

export default Featured_products;
