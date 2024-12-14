"use client";

import { type FC, useState } from "react";
import ApologyReason from "./ApologyReason";
import { useApologyStore } from "@/store/apologyStore";
import AcceptancePopup from "./AcceptancePopup";
import ConfirmationPopup from "./ConfirmationPopup";

interface ApologyFormProps {
  imageUrl: string;
}

const ApologyForm: FC<ApologyFormProps> = ({ imageUrl }) => {
  const { reasons, addReason, toggleReason, deleteReason } = useApologyStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [confirmationLevel, setConfirmationLevel] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showVolumeWarning, setShowVolumeWarning] = useState(true);

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
    setShowConfirmation(true);
  };

  const handleConfirmReject = () => {
    if (confirmationLevel < 4) {
      setConfirmationLevel((prev) => prev + 1);
    } else {
      setConfirmationLevel(0);
    }
  };

  const handleCancelReject = () => {
    setShowConfirmation(false);
    setConfirmationLevel(0);
  };

  const dismissVolumeWarning = () => {
    setShowVolumeWarning(false);
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      {showVolumeWarning && (
        <div className="fixed inset-x-0 top-4 z-50 mx-auto max-w-md">
          <div className="mx-4 rounded-lg bg-yellow-100 p-4 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  請注意音量！此網頁包含音效。
                </p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={dismissVolumeWarning}
                  className="inline-flex rounded-md p-1.5 text-yellow-600 hover:bg-yellow-200 focus:outline-none"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <AcceptancePopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
      <ConfirmationPopup
        isOpen={showConfirmation}
        level={confirmationLevel}
        onConfirm={handleConfirmReject}
        onCancel={handleCancelReject}
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
            <div className="flex flex-wrap justify-between mb-5">
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
          <p className="mb-2">本人 <u>謝凱宇</u> 在此向 <u>葉幸竺</u> 道歉</p>
          <p>並保證未來開嗆前會注意砲台有對準正確目標 避免誤傷情況再次發生</p>
        </div>

        {/* Buttons Section */}
        <div className="flex w-full flex-col gap-3 pt-4 sm:flex-row sm:justify-center sm:gap-4">
          <button
            onClick={handleAddReason}
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 sm:w-auto"
          >
            新增罪名
          </button>
          <button
            onClick={handleAcceptApology}
            className="w-full rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 sm:w-auto"
          >
            接受道歉
          </button>
          <button
            onClick={handleRejectApology}
            className="w-full rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 sm:w-auto"
          >
            拒絕道歉
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApologyForm;
