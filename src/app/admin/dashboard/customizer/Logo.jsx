import { Button } from '@heroui/react';
import { CldUploadWidget } from 'next-cloudinary';
import React, { useState } from 'react';

const Logo = () => {
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleUpload() {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch("/api/handleLogo", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logo: image }),
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      // Handle successful upload
      const data = await response.json();
      console.log('Upload successful:', data);
      
    } catch (err) {
      setError(err.message || 'Failed to upload logo');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4 max-w-md">
      <div className="flex items-center gap-3">
        <CldUploadWidget
          uploadPreset="ml_default"
          options={{ 
            sources: ["local", "url"],
            multiple: false,
            maxFiles: 1
          }}
          onSuccess={(result) => {
            setImage(result.info.secure_url);
            setError('');
          }}
          onError={(error) => {
            setError(error.message || 'Image upload failed');
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
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Uploading...' : 'Upload Logo'}
          </Button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

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
  );
};

export default Logo;