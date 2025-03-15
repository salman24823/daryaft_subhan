"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import MDEditor from "@uiw/react-md-editor";
import ActionButton from "./ActionButton";
import { Button, Checkbox, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

const NewProducts = () => {

    // get product id from url
  const searchParams = useSearchParams();
    const product_id = searchParams.get("product_id");

  const [ collectionName , setCollectionName ] = useState("")
  const categoryOptions = ["Men", "Women", "Kids", "Accessories"];

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    regularPrice: "",
    salePrice: "",
    stockStatus: "instock",
    categories: [],
    collectionName,
    tags: [],
    variations: [],
    sizes: [], // New field for sizes
    thumbnail: null,
    hoverImage : null,
    metaTitle: "",
    metaDescription: "",
  });

  useEffect(()=> {



    async function getProduct(){
        const response = await fetch(`/api/getProduct?product_id=${product_id}`)

        if (!response.ok) {
          console.error("Error response:", errorData);
          return;
        }

        const data = await response.json();
        setProductData(data);
    } 

    getProduct()
  },[searchParams])

  const handleCollectionChange = (option) => {
    setProductData((prev) => ({
      ...prev,
      collectionName: option, // Update the correct property in state
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleDescriptionChange = (value) => {
    setProductData({ ...productData, description: value });
  };

  const addVariation = (colorName, colorCode, image) => {
    setProductData((prev) => ({
      ...prev,
      variations: [...prev.variations, { colorName, colorCode, image }],
    }));
  };

  const removeVariation = (index) => {
    setProductData((prev) => {
      const updatedVariations = [...prev.variations];
      updatedVariations.splice(index, 1);
      return { ...prev, variations: updatedVariations };
    });
  };

  const addTag = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const newTag = e.target.value.trim();
      setProductData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      e.target.value = ""; // Clear the input after adding a tag
    }
  };

  const removeTag = (index) => {
    setProductData((prev) => {
      const updatedTags = [...prev.tags];
      updatedTags.splice(index, 1);
      return { ...prev, tags: updatedTags };
    });
  };

  const addSize = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const newSize = e.target.value.trim();
      setProductData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, newSize],
      }));
      e.target.value = ""; // Clear the input after adding a size
    }
  };

  const removeSize = (index) => {
    setProductData((prev) => {
      const updatedSizes = [...prev.sizes];
      updatedSizes.splice(index, 1);
      return { ...prev, sizes: updatedSizes };
    });
  };

  return (
    <div className="grid grid-cols-10 gap-4">

      {/* Left Column */}
      <div className="col-span-7 bg-white p-6 rounded-lg shadow-sm">

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Edit Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Men's Cotton T-Shirt"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Description
          </label>
          <MDEditor
            value={productData.description}
            onChange={handleDescriptionChange}
            height={200}
            preview="edit"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regular Price (PKR)
            </label>
            <input
              type="number"
              name="regularPrice"
              value={productData.regularPrice}
              onChange={handleInputChange}
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 1999"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sale Price (PKR)
            </label>
            <input
              type="number"
              name="salePrice"
              value={productData.salePrice}
              onChange={handleInputChange}
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 1499"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Variations
          </label>
          <CldUploadWidget
            uploadPreset="ml_default"
            options={{ sources: ["local", "url"] }}
            onSuccess={(result) => {
              const uploadedImage = result.info.secure_url;
              const colorName = prompt("Enter color name:");
              const colorCode = prompt("Enter color hex code (e.g., #fff):");
              if (colorName && colorCode)
                addVariation(colorName, colorCode, uploadedImage);
            }}
          >
            {({ open }) => (
              <button
                className="text-white font-semibold text-sm rounded-lg px-4 py-2 bg-blue-500"
                onClick={() => open()}
              >
                Add Variation
              </button>
            )}
          </CldUploadWidget>
          <div className="mt-4 flex flex-wrap gap-4">
            {productData.variations.map((v, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-8 shadow-sm shadow-black h-8 rounded-full"
                  style={{ backgroundColor: v.colorCode }}
                ></div>
                <img
                  src={v.image}
                  alt={v.colorName}
                  className="w-16 h-16 mt-2"
                />
                <p className="text-sm">{v.colorName}</p>
                <button
                  onClick={() => removeVariation(index)}
                  className="text-xs text-red-500 mt-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Category Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Categories
          </label>
          <div className="flex flex-wrap gap-4">
            {categoryOptions.map((category) => (
              <Checkbox
                key={category}
                isSelected={productData.categories.includes(category)}
                onChange={() => {
                  setProductData((prev) => ({
                    ...prev,
                    categories: prev.categories.includes(category)
                      ? prev.categories.filter((c) => c !== category)
                      : [...prev.categories, category],
                  }));
                }}
              >
                {category}
              </Checkbox>
            ))}
          </div>
        </div>

        {/* Add Sizes Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Sizes
          </label>
          <input
            type="text"
            onKeyDown={addSize}
            className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., S, M, L, XL"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {productData.sizes.map((size, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                <span>{size}</span>
                <button
                  onClick={() => removeSize(index)}
                  className="text-xs text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Tags Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Tags
          </label>
          <input
            type="text"
            onKeyDown={addTag}
            className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Summer, Casual, Cotton"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {productData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                <span>{tag}</span>
                <button
                  onClick={() => removeTag(index)}
                  className="text-xs text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Meta Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Title
          </label>
          <input
            type="text"
            name="metaTitle"
            value={productData.metaTitle}
            onChange={handleInputChange}
            className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Men's Cotton T-Shirt - Summer Collection"
          />
        </div>

        {/* Meta Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meta Description
          </label>
          <textarea
            name="metaDescription"
            value={productData.metaDescription}
            onChange={handleInputChange}
            className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Shop the latest Men's Cotton T-Shirt from our Summer Collection. Soft, breathable, and stylish."
            rows="3"
          ></textarea>
        </div>

      </div>

      {/* Right Column */}
      <div className="col-span-3 bg-white p-6 rounded-lg shadow-sm">
        <ActionButton
          productData={productData}
          product_id={product_id}
          setProductData={setProductData}
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Thumbnail
          </label>

          {productData.thumbnail ? (
            <img
              src={productData.thumbnail}
              alt="Product Thumbnail"
              className="w-full mt-2 rounded-lg"
            />
          ) : (
            <div className="w-full h-40 bg-gray-100 mt-2 rounded-lg flex items-center justify-center text-gray-400">
              Thumbnail Preview
            </div>
          )}

          <CldUploadWidget
            uploadPreset="ml_default"
            options={{ sources: ["local", "url"] }}
            onSuccess={(result) =>
              setProductData((prevData) => ({
                ...prevData,
                thumbnail: result.info.secure_url,
              }))
            }
          >
            {({ open }) => (
              <button
                className="text-white mt-2 font-semibold text-sm rounded-lg px-4 py-2 bg-blue-500"
                onClick={() => open()}
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>

        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product hover Image
          </label>

          {productData.hoverImage ? (
            <img
              src={productData.hoverImage}
              alt="Product hoverImage"
              className="w-full mt-2 rounded-lg"
            />
          ) : (
            <div className="w-full h-40 bg-gray-100 mt-2 rounded-lg flex items-center justify-center text-gray-400">
              hoverImage Preview
            </div>
          )}

          <CldUploadWidget
            uploadPreset="ml_default"
            options={{ sources: ["local", "url"] }}
            onSuccess={(result) =>
              setProductData((prevData) => ({
                ...prevData,
                hoverImage: result.info.secure_url,
              }))
            }
          >
            {({ open }) => (
              <button
                className="text-white mt-2 font-semibold text-sm rounded-lg px-4 py-2 bg-blue-500"
                onClick={() => open()}
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>

        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Collection Name
          </label>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <Button variant="bordered" className="w-full flex justify-between">
                {productData.collectionName || "Select Collection"}
                <ChevronDown className="text-gray-500" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {["Featured", "Trending"].map((option) => (
                <DropdownItem key={option} onPress={() => handleCollectionChange(option)}>
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

      </div>

    </div>
  );
};

export default NewProducts;
