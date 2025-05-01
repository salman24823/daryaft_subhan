<CldUploadWidget
    uploadPreset="ml_default"
    options={{ sources: ["local", "url"] }}
    onSuccess={(result) => {
        setImageURL(result.info.secure_url);
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