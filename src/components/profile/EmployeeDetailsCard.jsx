"use client";
import React, { useState, useRef, useEffect } from "react";
// button
import Button from "@/components/ui/button/Button";
// icons
import { FaUser } from "react-icons/fa";

export default function EmployeeDetailsCard() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // load saved image on from localstorage on initial render
  useEffect(() => {
    const savedImage = localStorage.getItem("employeeProfileImage");

    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    //reset error everytime user selects new image
    setError("");

    //file validation
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PNG and JPEG files are allowed.");
      e.target.value = "";
      return;
    }

    //size validation (2mb)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size must not exceed 2MB.");
      e.target.value = "";
      return;
    }

    //convert uploaded image into base64 format and save for persistence
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;

      setImage(base64Image);

      localStorage.setItem("employeeProfileImage", base64Image);
    };

    reader.readAsDataURL(file);
  };

  return (
    <section className="border rounded-xl p-6 bg-white shadow-sm">
      <header className="mb-6">
        <h2 className="h4">Employee Information</h2>
      </header>

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-end">
          {/* Avatar */}
          <div className="w-30 h-30 lg:w-35 lg:h-35 rounded-full border bg-muted flex items-center justify-center overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="text-muted text-4xl lg:text-5xl" />
            )}
          </div>

          {/* Upload */}
          <div className="flex flex-col items-center lg:items-start gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleImageChange}
            />

            <Button
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="lg:px-6 lg:py-3 text-sm"
            >
              Upload Photo
            </Button>

            {error ? (
              <p className="text-xs font-medium text-red-400">{error}</p>
            ) : (
              <p className="text-xs text-muted">JPEG or PNG only (max 2MB)</p>
            )}
          </div>
        </div>

        {/* Employee Details */}
        <div className="flex flex-col gap-3 text-center md:text-right">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">
              Employee Name
            </p>
            <p className="text-lg font-semibold">
              John Luis Nathaniel L. Mercado
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted">
              Employee ID
            </p>
            <p className="text-base">1123</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted">
              Position
            </p>
            <p className="text-base text-secondary">Front-end Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
