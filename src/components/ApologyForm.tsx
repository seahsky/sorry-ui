"use client";

import { type FC, useState } from "react";
import ApologyReason from "./ApologyReason";
import { useApologyStore } from "@/store/apologyStore";
import AcceptancePopup from "./AcceptancePopup";

interface ApologyFormProps {
  imageUrl: string;
}

const ApologyForm: FC<ApologyFormProps> = ({ imageUrl }) => {
  const { reasons, addReason, toggleReason, deleteReason } = useApologyStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddReason = () => {
    const text = prompt("Enter new apology reason:");
    if (text) {
      addReason(text);
    }
  };

  const handleAcceptApology = async () => {
    const checkedReasons = reasons.filter((reason) => reason.checked);
    
    try {
      const response = await fetch("/api/apology/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reasons: checkedReasons }),
      });

      if (!response.ok) {
        throw new Error("Failed to accept apology");
      }

      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error accepting apology:", error);
      // Optionally show an error message to the user
    }
  };

  const handleRejectApology = () => {
    console.log("Apology rejected");
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <AcceptancePopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
      <div className="mb-8 flex flex-col items-center space-y-4">
        {/* Image and Title Section */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <img
            src={imageUrl}
            alt="Apology"
            className="h-48 w-48 rounded-lg object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">葉幸竺</h1>
            <h2 className="text-2xl">道歉表</h2>
          </div>
        </div>

        {/* Form Content */}
        <div className="w-full rounded-lg border border-gray-200 p-6 shadow-sm">
          {/* Header Information */}
          <div className="mb-6 space-y-2">
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <p>
                <span className="font-semibold">道歉人：</span>謝凱宇
              </p>
              <p>
                <span className="font-semibold">日期：</span>2024-12-12
              </p>
            </div>
            <p className="font-semibold">道歉原因：</p>
          </div>

          {/* Checkboxes */}
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reasons.map((reason) => (
              <ApologyReason
                key={reason.id}
                text={reason.text}
                checked={reason.checked}
                onChange={() => toggleReason(reason.id)}
                onDelete={() => deleteReason(reason.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center text-sm">
          <p className="mb-2">本人 謝凱宇 在此向 葉幸竺 道歉</p>
          <p>並保證未來開唱前會注意砲台有對準正確目標 避免誤傷情況再次發生</p>
        </div>

        {/* Buttons Section */}
        <div className="flex w-full flex-col gap-3 pt-4 sm:flex-row sm:justify-center sm:gap-4">
          <button
            onClick={handleAddReason}
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 sm:w-auto"
          >
            Add Apology Reason
          </button>
          <button
            onClick={handleAcceptApology}
            className="w-full rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 sm:w-auto"
          >
            Accept Apology
          </button>
          <button
            onClick={handleRejectApology}
            className="w-full rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 sm:w-auto"
          >
            Reject Apology
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApologyForm;
