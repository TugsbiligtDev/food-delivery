"use client";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";

export default function TestPage() {
  const [imageId, setImageId] = useState("");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Cloudinary Test</h1>

      <CldUploadWidget
        uploadPreset="food-images"
        onSuccess={(result: any) => {
          setImageId(result.info.public_id);
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>

      {imageId && (
        <div style={{ marginTop: "2rem" }}>
          <CldImage
            src={imageId}
            width={400}
            height={300}
            alt="Uploaded image"
            crop="fill"
          />
          <p>Public ID: {imageId}</p>
        </div>
      )}
    </div>
  );
}
