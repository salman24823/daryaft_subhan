"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

export default function FormTable() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function ContactForm() {
      try {
        const response = await fetch("/api/handleContactForm", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    ContactForm();
  }, []);

  return (
    <Table aria-label="Employee table">
      <TableHeader>
        <TableColumn>EMPLOYEE</TableColumn>
      </TableHeader>

      <TableBody emptyContent={loading ? "Loading..." : "NO EMPLOYEES FOUND"}>
        {!loading &&
          formData.contacts?.map((form) => (
            <TableRow
              key={form.id}
              className="hover:bg-gray-100 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-bold">{form.name}</p>
                    <p className="text-sm text-gray-500">{form.phone}</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
