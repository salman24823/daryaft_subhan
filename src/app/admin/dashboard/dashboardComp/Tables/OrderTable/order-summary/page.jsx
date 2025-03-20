"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spinner,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Summary = () => {
  const [OrderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("order_id");

    console.log(orderId, "orderId");

    if (orderId) {
      fetchOrder(orderId);
    }
  }, [searchParams]);

  async function fetchOrder(orderId) {
    setIsLoading(false);
    try {
      const response = await fetch(`/api/getOrders?order_id=${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await response.json();
      console.log(data);
      setOrderData(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching order details");
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full p-6">
      {isLoading ? (
        <div className="w-full h-screen bg-white opacity-30 flex justify-center items-center">
          <Spinner className="!text-blue-600" size="lg" color="primary" />
          <p className="text-2xl text-black font-semibold opacity-100 mx-3">
            Loading...
          </p>
        </div>
      ) : (
        <Card className="w-full shadow-lg">
          <CardHeader className="p-6 bg-gray-100">
            <h1 className="text-xl md:text-2xl font-bold">Shipping Details:</h1>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 p-6">
            <p className="text-base">
              <strong>Name:</strong> {OrderData?.name || "N/A"}
            </p>
            <p className="text-base">
              <strong>Address:</strong> {OrderData?.address || "N/A"}
            </p>
            <p className="text-base">
              <strong>Phone:</strong> {OrderData?.phone || "N/A"}
            </p>
            <p className="text-base">
              <strong>Payment Method:</strong> {OrderData?.paymentMethod || "N/A"}
            </p>
          </CardBody>
          <Divider />

          {/* Display Cart Items */}
          <CardBody className="p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Items Details:</h2>
            {OrderData?.cart?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {OrderData.cart.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg shadow-sm flex flex-col items-center">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.name || "Product Image"}
                        className="w-32 h-32 object-cover rounded mb-3"
                      />
                    )}
                    <p className="text-base">
                      <strong>Color:</strong> {item.color || "N/A"}
                    </p>
                    <p className="text-base">
                      <strong>Size:</strong> {item.size || "N/A"}
                    </p>
                    <p className="text-base">
                      <strong>Quantity:</strong> {item.quantity || "N/A"}
                    </p>
                    <p className="text-base">
                      <strong>Price:</strong> ${item.salePrice || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base">No cart items available</p>
            )}
          </CardBody>

          <CardFooter className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4 bg-gray-100">
            <p className="text-base">
              <strong>Date:</strong> {OrderData?.createdAt ? new Date(OrderData.createdAt).toLocaleDateString() : "N/A"}
            </p>
            <p className="text-base font-bold">
              <strong>Total Price:</strong> ${OrderData?.totalPrice || "N/A"}
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default function OrderSummary() {
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
      <Summary />
    </Suspense>
  );
}
