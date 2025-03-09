"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@heroui/react";
import { Check, Pencil, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [salePrice, setSalePrice] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to submit form.");
    }
  }
  async function editProduct(id) {
    setIsEditing(true);

    try {
      const response = await fetch("/api/handleProduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salePrice, id }),
      });

      if (!response.ok) {
        toast.error("Failed to update.");
        return;
      }

      toast.success("Successfully updated");
      getProducts();
      setIsEditing(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await fetch("/api/handleProduct", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      toast.success("Product deleted successfully");

      // Refresh product list after deletion
      getProducts();
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  }

  useEffect(() => {
    getProducts();
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
        <Table className="text-nowrap">
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

          <TableBody emptyContent="No Product Found">
            {products.map((product, index) => (
              <TableRow
                className="hover:bg-gray-100 transition-colors"
                key={index.id}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-nowrap">{product.name}</TableCell>
                <TableCell className="text-nowrap">
                  {product.description}
                </TableCell>
                <TableCell className="text-nowrap">
                  {isEditing === true ? (
                    <input type="text" />
                  ) : (
                    <p>{product.regularPrice}</p>
                  )}
                </TableCell>
                <TableCell className="text-nowrap">
                  {isEditing === true ? (
                    <input
                      type="text"
                      value={salePrice}
                      onChange={(e) => {
                        setSalePrice(e.target.value);
                        console.log(e.target.value); // Logs the latest value correctly
                      }}
                    />
                  ) : (
                    <p>{product.salePrice}</p>
                  )}
                </TableCell>
                <TableCell className="text-nowrap">
                  {product.stockStatus}
                </TableCell>
                <TableCell className="text-nowrap">
                  {product.category}
                </TableCell>
                <TableCell className="text-nowrap">{product.tags}</TableCell>
                <TableCell className="text-nowrap">
                  {product.variation}
                </TableCell>
                <TableCell className="text-nowrap">{product.sizes}</TableCell>
                <TableCell className="text-nowrap">
                  <div className="overflow-x-scroll w-[100px]">
                    {product.thumbnail}
                  </div>
                </TableCell>
                <TableCell className="text-nowrap">
                  {isEditing === true ? (
                    <input type="text" />
                  ) : (
                    <p>{product.metaTitle}</p>
                  )}
                </TableCell>
                <TableCell className="text-nowrap">
                  {isEditing === true ? (
                    <input type="text" />
                  ) : (
                    <p>{product.metaDescription}</p>
                  )}
                </TableCell>
                <TableCell className="text-nowrap">
                  <div className="flex gap-2">
                    {isEditing === false ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-gray-600 p-2 bg-yellow-400 rounded-lg"
                      >
                        <Pencil onClick={() => editProduct(product._id)} />
                      </button>
                    ) : (
                      <button onClick={editProduct} className="text-gray-600">
                        <Check />
                      </button>
                    )}

                    <button
                      className="bg-red-400 p-2 rounded-lg text-gray-600"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Products;
