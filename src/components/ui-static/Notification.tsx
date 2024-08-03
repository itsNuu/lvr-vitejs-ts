import React from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  let backgroundColor = "";
  let textColor = "";

  switch (type) {
    case "success":
      backgroundColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "error":
      backgroundColor = "bg-red-100";
      textColor = "text-red-800";
      break;
  }

  return (
    <div
      className={`p-4 rounded-md ${backgroundColor} ${textColor} flex items-center justify-between`}
      role="alert"
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-lg">
        &times;
      </button>
    </div>
  );
};

export default Notification;
