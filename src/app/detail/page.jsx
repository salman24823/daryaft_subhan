"use client";

import { Button, Spinner } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight, FolderUp, Heart } from "lucide-react";
import BuyAction from "./BuyAction";
import { useSearchParams } from "next/navigation";

const Detail = () => {
  const [product, setProduct] = useState();
  
  const [variantImmage, setVariantImage] = useState()


  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the product_id from the query parameters
    const productIdFromUrl = searchParams.get("product_id");

    // Set the product_id in the state
    if (productIdFromUrl) {
      getProduct(productIdFromUrl); // Call getProduct with the productIdFromUrl
    }
  }, [searchParams]);

  async function getProduct(productId) {
    try {
      const response = await fetch(`/api/getProduct?product_id=${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="p-[9%] w-full bg-gray-50">
      {product ? (
        <div className="detailpage grid bg-white md:grid-cols-2 grid-cols-1 w-full">
          {/* Image Section */}

          <div className="detail_img p-[5%]">
            <div className="prod_img flex">
              <div className="w-full">
                <img
                  src={variantImmage? variantImmage : product.thumbnail}
                  alt="Product Image"
                  className="w-[90%] rounded-lg"
                />
              </div>
              <div className="image_ico w-[10%] flex flex-col justify-between items-center">
                <div className="flex flex-col gap-2">
                  <button className="rounded-md bg-[#F2F2F2] p-2 hover:bg-gray-300 transition-all">
                    <FolderUp className="w-5 h-5" />
                  </button>
                  <button className="rounded-md bg-[#F2F2F2] p-2 hover:bg-gray-300 transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="rounded-md bg-[#F2F2F2] p-2 hover:bg-gray-300 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="rounded-md bg-[#F2F2F2] p-2 hover:bg-gray-300 transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="related_images w-full mt-4">
              <div className="related_child flex gap-2">
                {/* Add related images here */}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="detail_cont p-[5%]">
            <div className="card_cont w-full flex flex-col gap-6">
              <div className="flex gap-4">
                {product.categories.map((value, index) => (
                  <span
                    key={index}
                    className="text-gray-400 font-semibold text-sm"
                  >
                    {value}
                  </span>
                ))}
              </div>

              <strong
                onClick={() => console.log(product, "product")}
                className="text-3xl font-bold"
              >
                {product.name}
              </strong>
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <span className="font-bold text-3xl text-[#B4531A]">
                    ${product.salePrice}
                  </span>

                  {product.regularPrice ? (
                    <span className="font-medium text-xl line-through text-red-600">
                      ${product.regularPrice}
                    </span>
                  ) : null}
                </div>

                <span className="flex items-center gap-2 text-black font-bold">
                  <FaStar className="text-yellow-500" /> 4.9{" "}
                  <span className="border-gray-400 border-l-2 px-2">2278</span>
                </span>
              </div>
              <div className="description">
                <span className="text-xl font-bold">Description</span>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>
            </div>
            <BuyAction setVariantImage={setVariantImage} product={product} />
          </div>
        </div>
      ) : (
        <div className="h-screen w-full fixed top-0 left-0 flex justify-center items-center bg-white">
          <div className="flex flex-col gap-5 justify-center text-center">
            <Spinner size="lg" />
            <p>Loading...</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Detail;
