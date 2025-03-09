"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await fetch("/api/handleProduct", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error(response.message);
      }
      const data = await response.json();
      console.log(data, "data");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to submit form.");
    }
  }
  async function editProduct(productId) {
    try {
    } catch (error) {}
  }
  async function deleteProduct(productId) {}
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <button onClick={() => console.log(products)}>product</button>
      <Table>
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Regular Price</TableColumn>
          <TableColumn>Sales Price</TableColumn>
          <TableColumn>Stock Status</TableColumn>
          <TableColumn>Catogery</TableColumn>
          <TableColumn>Tags</TableColumn>
          <TableColumn>Variation</TableColumn>
          <TableColumn>Size</TableColumn>
          <TableColumn>Thumbnail</TableColumn>
          <TableColumn>MetaTitle</TableColumn>
          <TableColumn>MetaDescription</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody emptyContent="No Contact Found">
          {products.map((product, index) => (
            <TableRow
              className="hover:bg-gray-100 transition-colors"
              key={index.id}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.regularPrice}</TableCell>
              <TableCell>{product.salePrice}</TableCell>
              <TableCell>{product.stockStatus}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.tags}</TableCell>
              <TableCell>{product.variation}</TableCell>
              <TableCell>{product.sizes}</TableCell>
              <TableCell>
                <div className="overflow-x-scroll w-[100px]">
                  {product.thumbnail}
                </div>
              </TableCell>
              <TableCell>{product.metaTitle}</TableCell>
              <TableCell>{product.metaDescription}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-300 p-2 rounded-lg"
                    onClick={() => editProduct(product.id)}
                  >
                    <Pencil />
                  </button>
                  <button
                    className="bg-red-400 p-2 rounded-lg"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Products;
