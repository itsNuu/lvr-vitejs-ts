import React from "react";

interface AlertProps {
  variant: "error" | "success" | "info";
  className?: string;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ variant, className, children }) => {
  let alertClass = "p-4 rounded-md ";

  switch (variant) {
    case "error":
      alertClass += "bg-red-100 text-red-800";
      break;
    case "success":
      alertClass += "bg-green-100 text-green-800";
      break;
    case "info":
      alertClass += "bg-blue-100 text-blue-800";
      break;
  }

  return <div className={`${alertClass} ${className}`}>{children}</div>;
};

export default Alert;
