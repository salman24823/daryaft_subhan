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
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [searchParams]);

  async function fetchOrder(orderId) {
    setIsLoading(true);
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
      setOrderData(data);
      console.log(data);
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
        <Card className="w-full shadow-xl border rounded-2xl">
          {/* Shipping Details */}
          <CardHeader className="bg-gray-100 rounded-t-2xl px-6 py-4 border-b">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Shipping Details
            </h1>
          </CardHeader>
          <CardBody className="px-6 py-4 space-y-2 bg-white">
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
              <strong>Payment Method:</strong>{" "}
              {OrderData?.paymentMethod || "N/A"}
            </p>
          </CardBody>

          <Divider />

          {/* Cart Items */}
          <CardBody className="px-6 py-4 bg-gray-50">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
              Cart Items
            </h2>
            {OrderData?.cart?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {OrderData.cart.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-xl shadow-sm p-4 flex flex-col gap-2"
                  >
                    {item.thumbnail && (
                      <img
                      onClick={()=> console.log(item) }
                        src={item.thumbnail}
                        alt={item.name || "Product Image"}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                    )}
                    <p className="text-sm">
                      <strong>Name:</strong> {item.name || "N/A"}
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <strong>Color:</strong> {item.color || "N/A"}{" "}
                      {item.colorCode && (
                        <span
                          className="inline-block w-4 h-4 rounded-full border"
                          style={{ backgroundColor: item.colorCode }}
                          title={item.colorCode}
                        ></span>
                      )}
                    </p>
                    <p className="text-sm">
                      <strong>Size:</strong> {item.size || "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Quantity:</strong> {item.quantity || "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Price:</strong> {item.salePrice || "N/A"}
                    </p>
                    <Divider className="my-2" />
                    <p className="text-sm">
                      <strong>Logo:</strong>
                      {item.selectedLogo ? (
                        <img
                          src={item.selectedLogo}
                          alt="Logo"
                          className="w-14 h-14 object-contain" // You can adjust the width and height as needed
                        />
                      ) : (
                        "N/A"
                      )}
                    </p>

                    <p className="text-sm">
                      <strong>Logo Size:</strong> {item.logoSize || "N/A"}
                    </p>
                    <p className="text-sm">
                      <strong>Logo Position:</strong>{" "}
                      {item.logoPosition.x || "N/A"} = X 
                      {item.logoPosition.y || "N/A"} = Y
                    </p>
                    <p className="text-sm">
                      <strong>Logo Price:</strong> {item.logoPrice || "0"}
                    </p>
                    <p className="text-sm">
                      <strong>Stuff Price:</strong> {item.stuffPrice || "0"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-base text-gray-600">No cart items available</p>
            )}
          </CardBody>

          {/* Footer */}
          <CardFooter className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4 bg-white border-t rounded-b-2xl">
            <p className="text-base text-gray-700">
              <strong>Date:</strong>{" "}
              {OrderData?.createdAt
                ? new Date(OrderData.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-lg font-bold text-gray-800">
              <strong>Total Price:</strong> {OrderData?.totalPrice || "N/A"}
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
        <div className="w-full h-screen flex justify-center items-center text-black">
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
