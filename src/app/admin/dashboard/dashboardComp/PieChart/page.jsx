"use client";

import React, { useEffect, useState } from 'react';

const TotalProducts = () => {

  const [ products , setProducts ] = useState([])

  useEffect(()=> {
    async function FetchProducts(params) {

      const response = await fetch("/api/handleProduct", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setProducts(data); // You can use the data here for further processing.
      
    }

    FetchProducts()
  },[])

  return (
    <div className="bg-white h-full p-6 flex justify-center flex-col gap-3 items-center rounded-lg shadow-md">
      {/* Reference the SVG from the public folder */}
      <img src="/productIcon.svg" alt="Product Icon" className="w-1/3 h-auto" />

      <h2 className='text-center font-semibold text-lg text-gray-800'>Total Products:</h2>
      <p className='text-2xl font-semibold underline text-red-500'> {products.length || "Loading..." } </p>
    </div>
  );
};

export default TotalProducts;