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

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function FormData(setContacts) {
    try {
      const response = await fetch("/api/handleContactForm", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error(response.message);
      }
      const data = await response.json();
      setContacts(data.contacts);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to show data.");
    }
  }

  useEffect(() => {
    FormData(setContacts);
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
            <TableColumn>Name</TableColumn>
            <TableColumn>Phone</TableColumn>
            <TableColumn>Email</TableColumn>
          </TableHeader>

          <TableBody emptyContent="No Contact Found">
            {contacts.map((contact, index) => (
              <TableRow
                className="hover:bg-gray-100 transition-colors"
                key={contact.id}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Contact;
