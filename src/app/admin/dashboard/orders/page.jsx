"use client";

import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
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
        return;
      }

      const data = await response.json();
      setOrders(data.Orders);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch data");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch("/api/handleOrder", {
        method: "PUT", // Changed from POST to PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status: newStatus }), // Send the correct fields
      });

      if (!response.ok) {
        toast.error("Failed to update status");
        return;
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Status updated");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  return (
    <div className="p-6">
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
            <TableColumn>Email</TableColumn>
            <TableColumn>Phone</TableColumn>
            <TableColumn>Payment</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Address</TableColumn>
            <TableColumn>Date</TableColumn>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow
                key={order._id}
                className="hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() =>
                  location.replace(
                    `/admin/dashboard/orders/order-summary?order_id=${order._id}`
                  )
                }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell
                  onClick={(e) => e.stopPropagation()} // Stop redirect on dropdown click
                >
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        size="sm"
                        variant="bordered"
                        className={`capitalize text-sm ${
                          order.status === "Delivered"
                            ? "text-green-600 border-green-600"
                            : "text-yellow-600 border-yellow-600"
                        }`}
                      >
                        {order.status === "Delivered"
                          ? "Success"
                          : order.status}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Select Status"
                      disallowEmptySelection
                      selectionMode="single"
                      onAction={(key) =>
                        handleStatusChange(order._id, key.toString())
                      }
                    >
                      <DropdownItem key="Processing">Processing</DropdownItem>
                      <DropdownItem key="Delivered">Delivered</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Orders;
