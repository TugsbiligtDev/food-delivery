"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image, Upload, X, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { foodSchema, foodFormData } from "@/lib/schemas/food";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationMsg from "@/components/auth/ValidationMsg";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Category {
  _id: string;
  categoryName: string;
  count: number;
}

const AddDishDialog = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<foodFormData>({ resolver: zodResolver(foodSchema) });

  console.log("Form errors:", errors);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Image upload states
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: false,
  });

  const uploadImageToCloudinary = async () => {
    if (!selectedImage) return null;

    console.log("🖼️ Starting image upload to Cloudinary...");
    console.log("📁 File:", selectedImage.name, selectedImage.size, "bytes");

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      // Check if environment variables exist
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      console.log("🔧 Environment check:");
      console.log("- Upload Preset:", uploadPreset ? "✅ Set" : "❌ Missing");
      console.log("- Cloud Name:", cloudName ? "✅ Set" : "❌ Missing");

      if (!uploadPreset || !cloudName) {
        throw new Error(
          "Missing Cloudinary environment variables. Please check your .env.local file."
        );
      }

      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("📡 Cloudinary response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Cloudinary error response:", errorText);
        throw new Error(`Upload failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("✅ Cloudinary upload successful:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("💥 Cloudinary upload failed:", error);
      throw error;
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const onSubmit = async (data: foodFormData) => {
    console.log("🚀 Form submission started");
    console.log("📝 Form data:", data);
    console.log("🖼️ Has image:", !!selectedImage);

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // Upload image if one is selected
      if (selectedImage) {
        console.log("⬆️ Uploading image...");
        imageUrl = await uploadImageToCloudinary();
        console.log("✅ Image uploaded:", imageUrl);
      }

      const payload = {
        foodName: data.foodName,
        price: parseFloat(data.price), // Convert to number
        ingredients: data.ingredients.split(",").map((item) => item.trim()), // Convert to array
        category: data.category,
        image: imageUrl, // Use 'image' instead of 'imageUrl'
      };

      console.log("📦 Final payload:", payload);

      const token = localStorage.getItem("token");
      console.log("🔐 Token exists:", !!token);

      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      console.log("📡 Sending request to backend...");
      const response = await axios.post(
        "http://localhost:8000/api/foods",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Backend response:", response.data);

      if (response.data.success) {
        alert("Food added successfully!");
        reset();
        removeImage();
      } else {
        throw new Error(
          response.data.message || "Backend returned success: false"
        );
      }
    } catch (error) {
      console.error("💥 Submission error:", error);

      // More detailed error handling
      if (axios.isAxiosError(error)) {
        console.error("🌐 Backend error details:");
        console.error("- Status:", error.response?.status);
        console.error("- Data:", error.response?.data);
        console.error("- Headers:", error.response?.headers);

        if (error.response?.status === 401) {
          alert("Authentication failed. Please login again.");
        } else if (error.response?.status === 400) {
          alert(
            `Validation error: ${error.response.data.message || "Invalid data"}`
          );
        } else {
          alert(
            `Server error: ${error.response?.data?.message || error.message}`
          );
        }
      } else if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Click</DialogTrigger>

      <DialogContent className="max-w-xl bg-white text-midnight-black">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold leading-7">
            Add new Dish to Appetizers
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-between flex-1 gap-6">
            <div className="flex-1">
              <Label className="form-label">Food name</Label>
              <Input type="text" {...register("foodName")} />
              {errors.foodName && (
                <ValidationMsg message={errors.foodName.message || ""} />
              )}
            </div>
            <div className="flex-1">
              <Label className="form-label">Food price</Label>
              <Input type="number" step="0.01" {...register("price")} />
              {errors.price && (
                <ValidationMsg message={errors.price.message || ""} />
              )}
            </div>
          </div>

          <div>
            <Label className="form-label">Ingredients</Label>
            <Textarea {...register("ingredients")} />
            {errors.ingredients && (
              <ValidationMsg message={errors.ingredients.message || ""} />
            )}
          </div>

          <div>
            <Label className="form-label">Category</Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.categoryName}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No categories available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.category && (
              <ValidationMsg message={errors.category.message || ""} />
            )}
          </div>

          <div>
            <Label className="form-label">Food Image</Label>
            {imagePreview ? (
              // Image preview with remove button
              <div className="w-full border border-dashed border-[#2563EB33] bg-[#2563EB0D] rounded-md p-4">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Food preview"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              // Dropzone
              <div
                {...getRootProps()}
                className={`w-full border border-dashed border-[#2563EB33] flex flex-col justify-center items-center bg-[#2563EB0D] px-4 py-10 gap-2 rounded-md min-h-[200px] cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <>
                    <Upload className="text-blue-500" size={32} />
                    <p className="text-blue-600 font-medium">
                      Drop your image here!
                    </p>
                  </>
                ) : (
                  <>
                    <Image className="text-gray-400" size={32} />
                    <p className="text-gray-600">
                      Choose a file or drag & drop it here
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            type="submit"
            className="bg-midnight-black text-snow-white pointer w-fit disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add Dish"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDishDialog;
