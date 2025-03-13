"use client";

import { Button, Spinner } from "@heroui/react";
import React, { Suspense, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight, FolderUp, Heart } from "lucide-react";
import BuyAction from "./BuyAction";
import { useSearchParams } from "next/navigation";
import ProductRating from "../Sections/ProductRating/page";

const Detail = () => {
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [variantImage, setVariantImage] = useState(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const productIdFromUrl = searchParams.get("product_id");

    if (productIdFromUrl) {
      getProduct(productIdFromUrl);
    }
  }, [searchParams]);

  async function getProduct(productId) {
    try {
      const response = await fetch(`/api/getProduct?product_id=${productId}`);
      const data = await response.json();
      setProduct(data);

      const allImages = [
        data.thumbnail,
        ...(data.variations?.map((variation) => variation.image) || []),
      ];

      setImages(allImages);
      setVariantImage(data.thumbnail); // Set the main image initially
    } catch (error) {
      console.error(error);
    }
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImageIndex(images.indexOf(variantImage)); // Ensure index matches variantImage
    }
  }, [images]);

  useEffect(() => {
    if (images.length > 0) {
      setVariantImage(images[currentImageIndex]); // Sync variantImage when index changes
    }
  }, [currentImageIndex, images]);

  const handleNextImage = () => {
    console.log("next img");
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 < images.length ? prevIndex + 1 : 0
    );
  };

  const handlePrevImage = () => {
    console.log("pre img");
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : images.length - 1
    );
  };

  return (
    <main className="p-[5%] w-full bg-gray-50">
      {product ? (
        <div className="detailpage grid bg-white md:grid-cols-2 grid-cols-1 w-full">
          {/* Image Section */}
          <div className="detail_img p-[5%]">
            <div className="prod_img flex">
              <div className="w-full">
                {/* Main Image */}
                <img
                  src={variantImage}
                  alt="Product Image"
                  className="w-[90%] rounded-lg"
                />

                {/* Thumbnail Images */}
                <div className="flex gap-2 mt-4">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      onClick={() => {
                        setVariantImage(img);
                        setCurrentImageIndex(index); // Sync index with clicked image
                      }}
                      src={img}
                      alt={`Product Image ${index}`}
                      width={100}
                      className="cursor-pointer border rounded-lg hover:opacity-75 transition"
                    />
                  ))}
                </div>
              </div>

              {/* Buttons */}
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
                  <button
                    className="rounded-md bg-[#F2F2F2] p-2 hover:bg-gray-300 transition-all"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <button
                    className="rounded-md bg-[#F2F2F2] p-2 hover:bg-gray-300 transition-all"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
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

              <strong className="text-3xl font-bold">{product.name}</strong>

              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <span className="font-bold text-3xl text-[#B4531A]">
                    ${product.salePrice}
                  </span>

                  {product.regularPrice ? (
                    <span className="font-medium text-3xl line-through text-red-600">
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

            {/* Pass setVariantImage to BuyAction */}
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
      <ProductRating />
    </main>
  );
};

// Export the component wrapped in Suspense
export default function DetailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center text-black ">
          <div className="flex gap-5">
            <Spinner size="lg" />
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <Detail />
    </Suspense>
  );
}
