"use client";
import { Button } from "@heroui/react";
import { CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Customizer = () => {
  const [logo, setLogo] = useState("");
  const [colorName, setColorName] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [vector, setVector] = useState("");
  const [customData, setCustomData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logo,
          colorName, // ✅ Match Backend API Field
          colorCode,
          colorImage: vector,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload data.");
      }

      const data = await response.json();
      setCustomData(data.customizer);
      toast.success("Data uploaded successfully.");
    } catch (error) {
      toast.error("Failed to upload data.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <>
      <form
        className="flex flex-col items-center bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto gap-4"
        data-aos="zoom-in"
        data-aos-delay="700"
        onSubmit={customizeForm} // ✅ Submit function
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
          className="w-full h-14 px-5 text-gray-900 transition duration-300 border-2 border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
        />

        {/* Color Code Input */}
        <input
          type="text"
          placeholder="Enter Color Code"
          className="w-full h-14 px-5 text-gray-900 transition duration-300 border-2 border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
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
          disabled={isUploading || !logo || !vector} // ✅ Prevent submission if upload is incomplete
          className={`w-full h-14 px-6 text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 transition-all duration-300 rounded-lg shadow-lg ${
            isUploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          🎨 Customize
        </Button>
      </form>

      {customData && (
        <table className="w-full max-w-md mx-auto mt-6 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Color Name</td>
              <td className="border border-gray-300 px-4 py-2">
                {customData.colorName || "N/A"} {/* ✅ Fixed Key */}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Color Code</td>
              <td className="border border-gray-300 px-4 py-2">
                {customData.colorCode || "N/A"} {/* ✅ Fixed Key */}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Vector</td>
              <td className="border border-gray-300 px-4 py-2">
                {customData.colorImage ? (
                  <img
                    src={customData.colorImage}
                    alt="Vector"
                    className="w-16 h-16"
                  />
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Logo</td>
              <td className="border border-gray-300 px-4 py-2">
                {customData.logo ? (
                  <img src={customData.logo} alt="Logo" className="w-16 h-16" />
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default Customizer;
