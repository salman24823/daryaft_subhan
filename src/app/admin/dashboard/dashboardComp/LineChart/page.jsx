"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Tab, Tabs } from "@heroui/react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [salesData, setSalesData] = useState({
    daily: { labels: [], datasets: [] },
    monthly: { labels: [], datasets: [] },
    yearly: { labels: [], datasets: [] },
  });

  const processData = (orders) => {
    const dailySales = {};
    const monthlySales = {};
    const yearlySales = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear().toString();

      const total = order.cart.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);

      dailySales[day] = (dailySales[day] || 0) + total;
      monthlySales[month] = (monthlySales[month] || 0) + total;
      yearlySales[year] = (yearlySales[year] || 0) + total;
    });

    setSalesData({
      daily: {
        labels: Object.keys(dailySales),
        datasets: [
          {
            label: "Daily Sales",
            data: Object.values(dailySales),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "#e1e1e12e",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      monthly: {
        labels: Object.keys(monthlySales),
        datasets: [
          {
            label: "Monthly Sales",
            data: Object.values(monthlySales),
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "#e1e1e12e",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      yearly: {
        labels: Object.keys(yearlySales),
        datasets: [
          {
            label: "Yearly Sales",
            data: Object.values(yearlySales),
            borderColor: "rgba(255, 159, 64, 1)",
            backgroundColor: "#e1e1e12e",
            tension: 0.4,
            fill: true,
          },
        ],
      },
    });
  };

  const fetchOrders = async () => {
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
      processData(data.Orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
      y: {
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

  return (
    <div className="bg-white h-full flex flex-col p-6 rounded-lg shadow-md">
      <div className="w-full flex justify-between">
        <h1 className="py-2 px-10 bg-gray-100 rounded-full shadow-sm">
          Detailed Analysis
        </h1>
        <Tabs
          color="white"
          value={timeRange}
          radius="full"
          aria-label="Options"
          selectedKey={timeRange}
          onSelectionChange={setTimeRange}
        >
          <Tab key="daily" title="Daily" />
          <Tab key="monthly" title="Monthly" />
          <Tab key="yearly" title="Yearly" />
        </Tabs>
      </div>

      <div className="flex-1">
        <Line data={salesData[timeRange]} options={options} />
      </div>
    </div>
  );
};

export default LineChart;