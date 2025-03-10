"use client";

import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";

const Newsletter = () => {
  const [emailData, setEmailData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/handlenewsletter", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setEmailData(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen bg-white opacity-30 flex justify-center items-center">
          <Spinner className="!text-blue-600" size="lg" color="primary" />
          <p className="text-2xl text-black font-semibold opacity-100 mx-3">
            Loading..
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableColumn>#</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Subscribed At</TableColumn>
          </TableHeader>

          <TableBody emptyContent="No Email Found">
            {emailData?.map((mail, index) => (
              <TableRow
                className="hover:bg-gray-100 transition-colors"
                key={mail._id}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{mail.email}</TableCell>
                <TableCell>
                  {mail.createdAt
                    ? format(new Date(mail.createdAt), "PPpp") // Format timestamp
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Newsletter;
