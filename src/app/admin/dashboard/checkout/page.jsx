"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { useState } from "react";

const checkout = () => {
  const [order, setOrder] = useState([
    {
      id: 1,
      price: 100,
      quantity: 2,
      totalAmount: 200,
      paymentStatus: "paid",
      paymentMethod: "Card",
      shippingAddress: "123 Main St, City, State, ZIP",
      orderStatus: "shipped",
    },
    {
      id: 2,
      price: 150,
      quantity: 1,
      totalAmount: 150,
      paymentStatus: "pending",
      paymentMethod: "Cash on Delivery",
      shippingAddress: "456 Elm St, City, State, ZIP",
      orderStatus: "pending",
    },
    {
      id: 3,
      price: 200,
      quantity: 3,
      totalAmount: 600,
      paymentStatus: "paid",
      paymentMethod: "Online",
      shippingAddress: "789 Oak St, City, State, ZIP",
      orderStatus: "delivered",
    },
    {
      id: 4,
      price: 250,
      quantity: 2,
      totalAmount: 500,
      paymentStatus: "pending",
      paymentMethod: "Cash on delivery",
      shippingAddress: "101 Maple St, City, State, ZIP",
      orderStatus: "cancelled",
    },
    {
      id: 5,
      price: 300,
      quantity: 1,
      totalAmount: 300,
      paymentStatus: "paid",
      paymentMethod: "Card",
      shippingAddress: "Satiyana Road Faisalabad, 38000",
      orderStatus: "shipped",
    },
  ]);
  return (
    <>
      <Table>
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Total Amount</TableColumn>
          <TableColumn>Payment Status</TableColumn>
          <TableColumn>Payment Method</TableColumn>
          <TableColumn>Shipping Address</TableColumn>
          <TableColumn>Order Status</TableColumn>
        </TableHeader>

        <TableBody emptyContent="Nothing to show">
          {order.map((orders, index) => (
            <TableRow
              key={orders.id}
              className="hover:bg-gray-100 transition-colors"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{orders.price}</TableCell>
              <TableCell>{orders.quantity}</TableCell>
              <TableCell>{orders.totalAmount}</TableCell>
              <TableCell>{orders.paymentStatus}</TableCell>
              <TableCell>{orders.paymentMethod}</TableCell>
              <TableCell>{orders.shippingAddress}</TableCell>
              <TableCell>{orders.orderStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default checkout;
