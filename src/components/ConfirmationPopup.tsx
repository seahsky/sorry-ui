"use client";

import { type FC, useEffect, useRef } from "react";

interface ConfirmationPopupProps {
  isOpen: boolean;
  level: number;
  onConfirm: () => void;
  onCancel: () => void;
}

interface ConfirmationMessage {
  text: string;
  gif?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationPopup: FC<ConfirmationPopupProps> = ({ isOpen, level, onConfirm, onCancel }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (!audioRef.current) {
        audioRef.current = new Audio('/assets/audios/bongocat.mp3');
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const messages: ConfirmationMessage[] = [
    { 
      text: "確定要拒絕道歉嗎?",
      confirmText: "拒絕",
      cancelText: "再想想"
    },
    { 
      text: "真的確定要拒絕嗎？",
      confirmText: "堅持拒絕",
      cancelText: "算了"
    },
    { 
		text: "你忍心拒絕這個真誠的道歉嗎？ 🥺",
		confirmText: "狠心拒絕",
		cancelText: "心軟了"
    },
	{ 
	  text: "給我一次機會吧？",
	  confirmText: "不給",
	  cancelText: "好吧"
	},
    { 
      text: "表演籃球給妳看，原諒我嘛 pleaseeeeeeee～ 🥺",
      gif: "/assets/images/cxk2.gif",
      confirmText: "還是不要",
      cancelText: "好啦好啦"
    }
  ];

  const currentMessage = messages[level % messages.length] ?? messages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-xl max-w-md w-full">
        <p className="mb-4 text-lg text-center">{currentMessage?.text}</p>
        {currentMessage?.gif && (
          <div className="mb-4 flex justify-center">
            <img 
              src={currentMessage.gif} 
              alt="Confirmation GIF"
              className="max-w-full h-auto rounded-lg"
              style={{ maxHeight: '200px' }}
            />
          </div>
        )}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }
              onCancel();
            }}
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            {currentMessage?.cancelText ?? "取消"}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            {currentMessage?.confirmText ?? "確定"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup; 