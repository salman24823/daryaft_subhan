"use client";

import { Button } from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ActionButton = ({ productData, product_id }) => {
  const [loading, setLoading] = useState(false);

  async function UploadProduct() {

    setLoading(true);

    try {
      const response = await fetch("/api/handleProduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productData , product_id }),
      });

      if (!response.ok) {
        setLoading(false);
        toast.error("Error in Uploading Product.");
      }

      const result = await response.json()
      
      setLoading(false);
      toast.success("Uplaoded Successfully.");

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
        {loading ? "Updating..." : "Update"} 
      </Button>
    </div>
  );
};

export default ActionButton;
