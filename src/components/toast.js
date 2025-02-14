import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

// interface ToastProps {
//   no: 1 | 2 | 3 | 4;
//   show?: boolean;
//   onClose?: () => void;
//   title?: string;
//   message?: string;
//   duration?: number;
// }

const Toast = ({ type = "info", title, message, duration = 5000 }) => {
  const variants = {
    success: {
      icon: <CheckCircle className="w-6 h-6 text-green-400" />,
      title: title || "Success",
      message: message || "Operation completed successfully!",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      progressColor: "bg-green-500",
    },
    error: {
      icon: <XCircle className="w-6 h-6 text-red-400" />,
      title: title || "Error",
      message: message || "Something went wrong. Please try again.",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      progressColor: "bg-red-500",
    },
    warning: {
      icon: <AlertCircle className="w-6 h-6 text-yellow-400" />,
      title: title || "Warning",
      message: message || "Please review the information before proceeding.",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      progressColor: "bg-yellow-500",
    },
    info: {
      icon: <Info className="w-6 h-6 text-blue-400" />,
      title: title || "Information",
      message: message || "Here's something you might want to know.",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      progressColor: "bg-blue-500",
    },
  };

  const variant = variants[type];

  return (
    <div className="min-w-72">
      <div
        className={`max-w-sm w-full ${variant.bgColor} backdrop-blur-xl rounded-lg border ${variant.borderColor} shadow-lg overflow-hidden`}
      >
        <div className="p-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">{variant.icon}</div>
            <div className="ml-3 w-0 flex-1">
              <p className="text-sm font-medium text-white">{variant.title}</p>
              <p className="mt-1 text-sm text-gray-400">{variant.message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              {/* <button
                onClick={handleClose}
                className="inline-flex text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <X className="h-5 w-5" />
              </button> */}
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-1 w-full bg-gray-800">
          <div
            className={`h-full ${variant.progressColor} transition-all duration-100 animate-toast ease-linear`}
          />
        </div>
      </div>
    </div>
  );
};

export default Toast;
