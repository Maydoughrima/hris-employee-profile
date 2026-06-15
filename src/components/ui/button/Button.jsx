import React from "react";

export default function Button({
  className = "",
  size = "default",
  variant = "primary",
  onClick,
  children,
  type = "button",
  ...props
}) {
  // base style
  const baseStyle =
    "inline-flex items-center justify-center font-medium cursor-pointer";

  // variants
  const variants = {
    primary: "bg-cta text-white rounded-sm",
    secondary: "bg-transparent border border-gray-300 text-black rounded-sm",
    danger: "bg-danger text-white rounded-sm"
  };

  // size
  const sizeClasses = {
    sm: "px-2 py-2 text-xs",
    default: "px-12 py-4 text-base",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
