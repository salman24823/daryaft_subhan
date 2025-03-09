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

const Orders = () => {
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
    }
  }

  useEffect(() => {
    fetchData(setOrders);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen bg-white opacity-30 flex justify-center items-center">
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
            <TableColumn>Email</TableColumn>
            <TableColumn>Address</TableColumn>
            <TableColumn>Payment Method</TableColumn>
          </TableHeader>
          <TableBody>
            {orders.Orders.map((data, index) => (
              <TableRow
                className="hover:bg-gray-100 transition-colors"
                key={data.index}
                >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.paymentMethod}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Orders;
