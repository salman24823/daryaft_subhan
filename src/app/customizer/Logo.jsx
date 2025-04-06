import { Button } from "@heroui/react";
import { CldUploadWidget } from "next-cloudinary";
import React, { useEffect, useState } from "react";

const Logo = ({ selectedLogo, setSelectedLogo ,logoPosition, setLogoPosition, setLogoSize, logoSize }) => {

  const [logo, setLogo] = useState([]);

  // Update the handleLosoPosition function
  const handleLogoPositionChange = (axis, value) => {
    setLogoPosition((prev) => ({
      ...prev,
      [axis]: value,
    }));
  };

  // Update the handleLogoSizeChange function
  const handleLogoSizeChange = (size) => {
    setLogoSize(size);
  };

  async function fetchLogo() {
    const response = await fetch("/api/handleLogo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      toast.error("Failed to fetch variation data");
    }
    const data = await response.json();
    setLogo(data)
  }

  useEffect(() => {
    fetchLogo()
  }, [])

  return (
    <div>

      {/* // Update the buttons for logo positions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 w-full text-center">
          Logo Position
        </h2>

        <div className="rounded-full overflow-hidden mb-4 grid grid-cols-3">
          <Button
            className={`px-0 rounded-none py-2 ${logoPosition.y === "start"
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onPress={() => handleLogoPositionChange("y", "start")}
          >
            Top
          </Button>
          <Button
            className={`px-0 rounded-none py-2 ${logoPosition.y === "center"
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onPress={() => handleLogoPositionChange("y", "center")}
          >
            Middle
          </Button>
          <Button
            className={`px-0 rounded-none py-2 ${logoPosition.y === "end"
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onPress={() => handleLogoPositionChange("y", "end")}
          >
            Bottom
          </Button>
        </div>

        <div className="rounded-full overflow-hidden mb-4 grid grid-cols-3">
          <Button
            className={`px-0 rounded-none py-2 ${logoPosition.x === "start"
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onPress={() => handleLogoPositionChange("x", "start")}
          >
            Left
          </Button>
          <Button
            className={`px-0 rounded-none py-2 ${logoPosition.x === "center"
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onPress={() => handleLogoPositionChange("x", "center")}
          >
            Center
          </Button>
          <Button
            className={`px-0 rounded-none py-2 ${logoPosition.x === "end"
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onPress={() => handleLogoPositionChange("x", "end")}
          >
            Right
          </Button>
        </div>
      </div>

      {/* // Update the buttons for logo size */}
      <div className="rounded-full overflow-hidden mb-4 grid grid-cols-3">
        <Button
          className={`px-0 rounded-none py-2 ${logoSize === "sm"
            ? "bg-gray-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          onPress={() => handleLogoSizeChange("sm")}
        >
          Small
        </Button>
        <Button
          className={`px-0 rounded-none py-2 ${logoSize === "md"
            ? "bg-gray-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          onPress={() => handleLogoSizeChange("md")}
        >
          Medium
        </Button>
        <Button
          className={`px-0 rounded-none py-2 ${logoSize === "lg"
            ? "bg-gray-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          onPress={() => handleLogoSizeChange("lg")}
        >
          Large
        </Button>
      </div>

      {/* All Logos */}
      <div>
        <h1 className="text-lg font-semibold text-gray-900 mb-4 w-full text-center" onClick={() => console.log(selectedLogo, "logo")} >Select Logo</h1>
        <div className="flex flex-wrap gap-3 justify-center">
          {logo?.logo?.map((logo, index) => (
            <div
              key={index}
              className={`p-2 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition ${selectedLogo === logo
                ? "border-blue-600 shadow-lg"
                : "border-gray-300"
                }`}
              onClick={() => setSelectedLogo(logo.url)}
            >
              <img
                src={logo.url}
                alt={`Logo ${index + 1}`}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          ))}

          <CldUploadWidget
            uploadPreset="ml_default"
            options={{ sources: ["local", "url"] }}
            onSuccess={(result) => {
              setSelectedLogo(result.info.secure_url);
            }}
          >
            {({ open }) => (
              <button
                className="text-white font-semibold text-sm rounded-lg px-4 py-2 bg-[#a16c3d]"
                onClick={() => open()}
              >
                Upload Logo
              </button>
            )}
          </CldUploadWidget>
        </div>

      </div>

    </div>
  );
};

export default Logo;
