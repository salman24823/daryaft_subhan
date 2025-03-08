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

const Newsletter = () => {
  const [email, setEmail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function formData(setEmail) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/handlenewsletter", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error(response.message);
        setIsLoading(false);
      }
      const data = await response.json();
      console.log(data);
      setEmail(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to show data.");
    }
  }

  useEffect(() => {
    formData(setEmail);
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
          </TableHeader>

          <TableBody emptyContent="No Email Found">
            {email?.map((mail, index) => (
              <TableRow
                className="hover:bg-gray-100 transition-colors"
                key={mail.id}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{mail.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Newsletter;
