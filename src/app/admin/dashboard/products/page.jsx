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
  const [editingRow, setEditingRow] = useState({});
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
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  }

  const toggleEdit = (id) => {
    setEditingRow((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  async function editProduct(id) {
    if (!editingRow[id]) {
      toggleEdit(id); // Start editing if not already in edit mode
      return;
    }


    
    try {
      const productToUpdate = products.find((product) => product._id === id);
      const response = await fetch("/api/handleProduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ salePrice: productToUpdate.salePrice, id }),
      });

      if (!response.ok) {
        toast.error("Failed to update.");
        return;
      }

      toast.success("Successfully updated");
      getProducts();
      toggleEdit(id); // Exit editing mode after saving
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
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      toast.success("Product deleted successfully");
      getProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  }

  const handleInputChange = (id, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === id ? { ...product, [field]: value } : product
      )
    );
  };

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
            <TableColumn>Thumbnail</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Regular Price</TableColumn>
            <TableColumn>Sales Price</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>MetaTitle</TableColumn>
            <TableColumn>MetaDescription</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>

          <TableBody emptyContent="No Product Found">
            {products.map((product, index) => (
              <TableRow
                className="hover:bg-gray-100 hover:cursor-pointer transition-colors"
                key={product._id}
                onClick={()=> location.replace(`/admin/dashboard/products/edit?product_id=${product._id}`) }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-nowrap">
                  <div className="overflow-x-hidden w-12">
                    <img src={product.thumbnail} className="w-10 h-10" alt="thumbnail" />
                  </div>
                </TableCell>
                <TableCell className="text-nowrap">{product.name}</TableCell>
                <TableCell className="text-nowrap">
                  {editingRow[product._id] ? (
                    <input
                      type="text"
                      className="px-2 py-1 border-gray-500 border rounded-md"
                      value={product.regularPrice}
                      onChange={(e) =>
                        handleInputChange(product._id, "regularPrice", e.target.value)
                      }
                    />
                  ) : (
                    <p>{product.regularPrice}</p>
                  )}
                </TableCell>
                <TableCell className="text-nowrap">
                  {editingRow[product._id] ? (
                    <input
                      type="text"
                      className="px-2 py-1 border-gray-500 border rounded-md"
                      value={product.salePrice}
                      onChange={(e) =>
                        handleInputChange(product._id, "salePrice", e.target.value)
                      }
                    />
                  ) : (
                    <p>{product.salePrice}</p>
                  )}
                </TableCell>
                <TableCell className="text-nowrap">
                  {product.categories}
                </TableCell>
                <TableCell className="text-nowrap">
                  {editingRow[product._id] ? (
                    <input
                      type="text"
                      className="px-2 py-1 border-gray-500 border rounded-md"
                      value={product.metaTitle}
                      onChange={(e) =>
                        handleInputChange(product._id, "metaTitle", e.target.value)
                      }
                    />
                  ) : (
                    <p>{product.metaTitle}</p>
                  )}
                </TableCell>
                <TableCell className="text-nowrap">
                  {editingRow[product._id] ? (
                    <input
                      type="text"
                      className="px-2 py-1 border-gray-500 border rounded-md"
                      value={product.metaDescription}
                      onChange={(e) =>
                        handleInputChange(product._id, "metaDescription", e.target.value)
                      }
                    />
                  ) : (
                    <p>{product.metaDescription}</p>
                  )}
                </TableCell>
                <TableCell className="text-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => editProduct(product._id)}
                      className="text-gray-600 p-2 bg-yellow-400 rounded-lg"
                    >
                      {editingRow[product._id] ? <Check /> : <Pencil />}
                    </button>
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