"use client"

import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Product from "@/../../public/product.png"
import { FaStar } from "react-icons/fa";
import Image from 'next/image'

const Shop = () => {

  const [products, setProducts] = useState([]);
  const [ loading , setLoading ] = useState(true);
  const [ collection , setCollection] = useState("Featured")

  const getProducts = async () => {

    setLoading(true);

    try {
      const response = await fetch(`/api/getProduct/${collection}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }

  };

  useEffect(()=> {
    getProducts()
  },[collection])

  return (
    <div className="w-full">
        {/* Banner */}
      <div className="w-full h-[80vh] bg-[url(./../../public/banner/news2.png)] bg-cover bg-no-repeat"></div>

      {/* products */}
      <div className="p-[5%] flex flex-col items-center gap-12 bg-gray-50">



        <div className="New_arrival w-full grid grid-cols-5 justify-between gap-5">

            <div className="product_card h-[440px]">
              <div className="card_image h-[70%] w-full">
                <Image src={Product} className="w-full h-[100%]" />
              </div>
              <div className="card_cont w-full h-[30%] flex flex-col justify-between p-3">
                <span className="text-gray-400">Hoodie</span>
                <strong className="text-[1.1rem]">
                  Essential Female's Regular-Fit Black Hoodie
                </strong>
                <div className="flex justify-between">
                  <span className="font-bold">$45.99</span>
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
        
        </div>



      </div>
    </div>
  );
};

export default Shop;
