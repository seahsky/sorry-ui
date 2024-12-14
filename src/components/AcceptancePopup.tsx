import { type FC, useEffect, useRef } from "react";

interface AcceptancePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AcceptancePopup: FC<AcceptancePopupProps> = ({ isOpen, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(async () => {
        try {
          await audioRef.current?.play();
        } catch (error) {
          console.error('Failed to play audio:', error);
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      audioRef.current?.pause();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 text-center">
        <audio ref={audioRef} src="/assets/audios/zeizei.mp3" />
        <div className="animate-[bounce-in_1s_ease-out_forwards] mb-5">
          <img
            src="/assets/images/cxk1.gif"
            alt="CXK Dancing"
            className="mx-auto h-48 w-48 rounded-lg object-cover"
          />
        </div>
        <h2 className="mb-4 text-2xl font-bold">道歉已接受！</h2>
        <p className="mb-6">謝謝zeizei的原諒 🥹</p>
        <button
          onClick={onClose}
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          關閉
        </button>
      </div>
    </div>
  );
};

export default AcceptancePopup; 