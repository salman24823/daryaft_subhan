"use client";
import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Customizer = () => {
  const [logo, setLogo] = useState("");
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [vector, setVector] = useState("");
  const [customData, setCustomData] = useState([]); // Store multiple records
  const [isUploading, setIsUploading] = useState(false);

  // 🔥 Fetch data when component loads
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("/api/handleCustomize", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setCustomData(data.data || []); // Store multiple records
      toast.success("Data fetched successfully.");
    } catch (error) {
      toast.error("Failed to show data.");
    }
  }

  async function customizeForm(e) {
    e.preventDefault();
    if (!logo || !vector) {
      toast.error("Please upload both Logo and Vector!");
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch("/api/handleCustomize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logo,
          colorName,
          colorCode,
          colorImage: vector,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload data.");
      }

      toast.success("Data uploaded successfully.");
      fetchData(); // 🔥 Refresh data after upload
    } catch (error) {
      toast.error("Failed to upload data.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <>
      {/* Upload Form */}
      <form
        className="flex flex-col items-center bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto gap-4"
        onSubmit={customizeForm}
      >
        {/* Upload Vector */}
        <CldUploadWidget
          uploadPreset="ml_default"
          options={{ sources: ["local", "url"] }}
          onSuccess={(result) =>
            result.info.secure_url && setVector(result.info.secure_url)
          }
        >
          {({ open }) => (
            <button
              type="button"
              className="w-full text-white font-semibold text-base rounded-lg px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition-all duration-300 shadow-md"
              onClick={() => open()}
            >
              📁 Upload Vector
            </button>
          )}
        </CldUploadWidget>

        {/* Color Name Input */}
        <input
          type="text"
          placeholder="Enter Color Name"
          className="w-full h-14 px-5 text-gray-900 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
        />

        {/* Color Code Input */}
        <input
          type="text"
          placeholder="Enter Color Code"
          className="w-full h-14 px-5 text-gray-900 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
          value={colorCode}
          onChange={(e) => setColorCode(e.target.value)}
        />

        {/* Upload Logo */}
        <CldUploadWidget
          uploadPreset="ml_default"
          options={{ sources: ["local", "url"] }}
          onSuccess={(result) =>
            result.info.secure_url && setLogo(result.info.secure_url)
          }
        >
          {({ open }) => (
            <button
              type="button"
              className="w-full text-white font-semibold text-base rounded-lg px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:opacity-90 transition-all duration-300 shadow-md"
              onClick={() => open()}
            >
              🖼 Upload Logo
            </button>
          )}
        </CldUploadWidget>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isUploading || !logo || !vector}
          className={`w-full h-14 px-6 text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 transition-all duration-300 rounded-lg shadow-lg ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          🎨 Customize
        </Button>
      </form>

      {/* Display Table */}
      {customData.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="w-full max-w-4xl mx-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white text-left">
                <th className="border border-gray-300 px-4 py-2">Color Name</th>
                <th className="border border-gray-300 px-4 py-2">Color Code</th>
                <th className="border border-gray-300 px-4 py-2">Vector</th>
                <th className="border border-gray-300 px-4 py-2">Logo</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {customData.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.colorName || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.colorCode || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.colorImage ? (
                      <img
                        src={item.colorImage}
                        alt="Vector"
                        className="w-12 h-12 mx-auto"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt="Logo"
                        className="w-12 h-12 mx-auto"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="px-4 py-2 bg-red-500 rounded">
                    <Trash2  />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Customizer;
