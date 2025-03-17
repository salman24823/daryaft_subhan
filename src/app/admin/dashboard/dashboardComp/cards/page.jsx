"use client";

import { useEffect, useState } from "react";
import { Users, Package, HandCoins } from "lucide-react";
import { toast } from "react-toastify";

const Cards = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  async function fetchCardInfo() {
    try {
      const response = await fetch("/api/handleOrder", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data, "data");

      if (data.Orders) {
        const totalOrders = data.Orders.length;
        const uniqueCustomers = new Set(data.Orders.map((order) => order.email)).size;
        const totalRevenue = data.Orders.reduce((sum, order) => sum + (order.price || 0), 0);

        setStats({
          totalOrders,
          totalCustomers: uniqueCustomers,
          totalRevenue,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  }

  useEffect(() => {
    fetchCardInfo();
  }, []);

  const cardData = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <Package className="text-blue-600" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: <Users className="text-green-600" />,
      bgColor: "bg-green-100",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <HandCoins className="text-yellow-600" />,
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} hover:bg-opacity-75 hover:-translate-y-1 cursor-pointer rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out transform`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-gray-600 text-xs font-semibold uppercase tracking-wide">
                {card.title}
              </h4>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">
                {card.value}
              </h2>
            </div>
            <div className="p-3 bg-white rounded-full">{card.icon}</div>
          </div>
          <p className="text-gray-500 text-xs mt-3">From 01, March</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
