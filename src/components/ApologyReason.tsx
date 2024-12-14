import { type FC } from "react";

interface ApologyReasonProps {
  text: string;
  checked: boolean;
  onChange: () => void;
  onDelete: () => void;
}

const ApologyReason: FC<ApologyReasonProps> = ({ text, checked, onChange, onDelete }) => {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 p-3 hover:bg-gray-50">
      <label className="flex cursor-pointer items-center space-x-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm">{text}</span>
      </label>
      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500"
        aria-label="Delete reason"
      >
        ×
      </button>
    </div>
  );
};

export default ApologyReason;