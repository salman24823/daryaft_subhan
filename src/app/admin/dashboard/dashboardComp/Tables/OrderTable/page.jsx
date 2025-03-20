"use client";
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/handleOrder", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Error fetching data");
        setIsLoading(false);
      }

      const data = await response.json();
      setOrders(data);
      setIsLoading(false);

    } catch (error) {
      toast.error("Failed to fetch data");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData(setOrders);
    setIsLoading(false);
  }, []);

  return (
    <div className="bg-white rounded-3xl">
      {isLoading ? (
        <div className="w-full h-72 bg-white opacity-30 flex justify-center items-center">
          <Spinner className="!text-blue-600" size="lg" color="primary" />
          <p className="text-2xl text-black font-semibold opacity-100 mx-3">
            Loading...
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Phone</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Amount</TableColumn>
          </TableHeader>
          <TableBody>
            {orders?.Orders?.slice(-8).map((data, index) => (
              <TableRow
                className="hover:bg-gray-100 transition-colors cursor-pointer"
                key={data.index}
                onClick={(_id) =>
                  location.replace(
                    `/admin/dashboard/orders/order-summary?order_id=${data?._id}`
                  )
                }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell
                  // className={
                  //   data.status === "Processing"
                  //     ? "text-orange-500"
                  //     : "text-green-500"
                  // }
                >
                  {data.status || "Processing"}
                </TableCell>

                <TableCell>
                  {data.cart.reduce(
                    (total, item) => total + item.salePrice * item.quantity,
                    0
                  )}{" "}
                  <span className="font-semibold text-green-600"> PKR</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrderTable;
