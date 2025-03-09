"use client";

import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Button } from "@heroui/react";

const Sales = () => {
  const [imageId, setImageId] = useState(null);

  return (
    <div>
      
      <CldUploadWidget
        uploadPreset="ml_default" 
        options={{ sources: ["local", "url"] }}
        onSuccess={(result) => {
            setImageId(result.info.public_id);
        }}
      >
        {({ open }) => <button onClick={() => open()}>Upload Image</button>}
      </CldUploadWidget>

      
      {imageId && (
        <div>
          <h2>Preview:</h2>
          <CldImage src={imageId} width={300} height={300} alt="Uploaded Image" />
        </div>
      )}
    </div>
  );
};

export default Sales;
