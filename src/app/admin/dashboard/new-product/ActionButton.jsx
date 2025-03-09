"use client";

import { Button } from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ActionButton = ({ productData, setProductData }) => {
  const [loading, setLoading] = useState(false);

  async function UploadProduct() {

    setLoading(true);

    try {
      const response = await fetch("/api/handleProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productData }),
      });

      if (!response.ok) {
        setLoading(false);
        return toast.error("Error in Uploading Product.");
      }

      const result = await response.json()
      
      setLoading(false);
      toast.success("Uplaoded Successfully.");

      setProductData({
        name: "",
        description: "",
        regularPrice: "",
        salePrice: "",
        stockStatus: "instock",
        category: "category1",
        tags: [],
        variations: [],
        sizes: [], 
        thumbnail: null,
        metaTitle: "",
        metaDescription: "",
      })

    } catch (error) {
      setLoading(false); 
      console.log(error, "error");
    }
  }

  return (
    <div className="flex justify-end bg-gray-100 rounded-3xl overflow-hidden mb-3 items-center">
      <Button
        isLoading={loading}
        onPress={UploadProduct}
        className="rounded-none font-semibold bg-blue-500 text-white"
      >
        {loading ? "Uploading..." : "Upload"} 
      </Button>
    </div>
  );
};

export default ActionButton;
