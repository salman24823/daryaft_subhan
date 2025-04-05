import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import React, { useEffect, useState } from "react";

const Logo = () => {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [logos, setLogos] = useState([]);

  // Fetch existing logos on mount
  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const res = await fetch("/api/handleLogo");
      const data = await res.json();
      setLogos(data.logo || []);
    } catch (err) {
      console.error("Failed to fetch logos:", err);
    }
  };

  async function handleUpload() {
    if (!image) {
      setError("Please select an image first");
      return;
    }
    if (!price) {
      setError("Please enter a price");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/handleLogo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ logo: image, logoPrice: price }),
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      setImage("");
      setPrice("");
      fetchLogos(); // Refresh table after upload
    } catch (err) {
      setError(err.message || "Failed to upload logo");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/handleLogo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Sending the logo ID to delete
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      console.log("Logo deleted successfully");
      fetchLogos(); // Re-fetch logos after deletion
    } catch (err) {
      console.error("Failed to delete logo:", err);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      {/* Upload Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <CldUploadWidget
            uploadPreset="ml_default"
            options={{
              sources: ["local", "url"],
              multiple: false,
              maxFiles: 1,
            }}
            onSuccess={(result) => {
              setImage(result.info.secure_url);
              setError("");
            }}
            onError={(error) => {
              setError(error.message || "Image upload failed");
            }}
          >
            {({ open }) => (
              <Button
                onPress={() => open()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Select Logo
              </Button>
            )}
          </CldUploadWidget>

          {image && (
            <Button
              onPress={handleUpload}
              isDisabled={isLoading}
              className={`bg-green-600 hover:bg-green-700 text-white font-medium ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Uploading..." : "Upload Logo"}
            </Button>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border border-dashed rounded w-full"
          placeholder="Add Price here...."
        />

        {image ? (
          <div className="mt-4 border rounded-lg p-2">
            <img
              src={image}
              alt="Uploaded logo preview"
              className="max-h-40 object-contain mx-auto"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Image URL: {image.substring(0, 30)}...
            </p>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">No logo selected</p>
          </div>
        )}
      </div>

      {/* Cards Section */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Uploaded Logos</h2>
        {logos.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {logos.map((logo) => (
              <div
                key={logo._id}
                className="border rounded-lg p-4 shadow-md bg-white flex flex-col items-center"
              >
                <img
                  src={logo.url}
                  alt="Logo"
                  className="h-20 w-auto object-contain mb-4"
                />
                <p className="text-lg font-semibold">{logo.logoPrice}</p>
                <p className="text-sm text-gray-500">
                  {new Date(logo.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4">
                  <Trash2
                    onClick={() => handleDelete(logo._id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No logos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Logo;
