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

  useEffect(()=> {
    async function ContactForm(){
      const response = await fetch("/api/handleContactForm", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const data = await response.json();
      setFormData(data)
    }
    ContactForm();
  },[])

  return (
    // <div onClick={()=> console.log(formData,"formData") }>
    //   sa
    // </div>
    <Table aria-label="Employee table">
      <TableHeader>
        <TableColumn onClick={()=> console.log(formData,"formData") }>EMPLOYEE</TableColumn>
        {/* <TableColumn>ROLE</TableColumn> */}
      </TableHeader>

      <TableBody emptyContent="NO EMPLOYEES FOUND">
        {formData.contacts.map((form) => (
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
            {/* <TableCell>{employee.role}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
