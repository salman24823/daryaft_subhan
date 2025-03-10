"use client";

import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const [OrderData, setOrderData] = useState(null); // Initialized as null

  const searchParams = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("order_id");

    console.log(orderId,"orderId")

    if (orderId) {
      fetchOrder(orderId);
    }
  }, [searchParams]);

  async function fetchOrder(orderId) {
    console.log(orderId,"orderId12")
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
      console.log(data,"data")
      setOrderData(data);
    } catch (error) {
      toast.error("Error fetching order details");
    }
  }

  return (
    <Card className="w-[70%]">
      <CardHeader>Order Summary</CardHeader>
      <CardBody className="flex">

        <p>Name: {OrderData?.name || "N/A"}</p>
        <p>Address: {OrderData?.address || "N/A"}</p>
        <p>Phone: {OrderData?.phone || "N/A"}</p>
        <p>Status: {OrderData?.paymentMethod || "N/A"}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between items-center">
        <p>Date</p>
        <p>Total Price: {OrderData?.totalPrice || "N/A"}</p>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
