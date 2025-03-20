"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Spinner } from "@heroui/react";
const Featured_products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectionName, setCollectionName] = useState("Featured");

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
    <section id="featured-products" className="w-full">
      <div className="p-[5%] flex flex-col items-center gap-12 bg-gray-50">
        <div className="text-center">
          <h2 className="heading--primary">Featured Products</h2>
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
              {products.slice(0, 4).map((product) => (
                <Link
                  key={product._id}
                  href={`/detail?product_id=${product._id}`}
                  className="product_card hover:cursor-pointer"
                >
                  <div className=""
                    key={product._id}
                  >
                    <div className="card_image h-[70%] w-full relative">
                      <img
                        src={product.thumbnail || "/product.png"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover img_hide absolute"
                      />
                      <img
                        src={product.hoverImage || "/product.png"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover img_show "
                      />
                    </div>
                    <div className="card_cont w-full h-[7.2rem] flex flex-col  justify-between p-3">
                      <div className="flex gap-3">
                      {product.categories.map((category)=> <p className="text-gray-600 text-sm font-semibold">{category}</p> )}
                      </div>
                      <strong className="text-[14px] lg:text-medium text-gray-800">
                        {product.name}
                      </strong>
                      <div className="w-full  flex justify-between ">
                        <div className="flex gap-2 lg:gap-3">
                          <span className="font-bold">
                            ${product.salePrice}
                          </span>
                          <span className="line-through text-red-600 font-semibold">
                            ${product.regularPrice}
                          </span>
                        </div>

                        <span className="flex items-center  text-gray-400">
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
          </div>
        )}
        <Link href={"/shop?collectionName=Featured"} className="self-end">
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
