import { type FC } from "react";

interface ApologyFormProps {
  imageUrl: string; // You'll handle the image source
}

const ApologyForm: FC<ApologyFormProps> = ({ imageUrl }) => {
  return (
    <div className="mx-auto max-w-2xl p-4">
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
              <p><span className="font-semibold">道歉人：</span>謝凱宇</p>
              <p><span className="font-semibold">日期：</span>2024-12-12</p>
            </div>
            <p className="font-semibold">道歉原因：</p>
          </div>

          {/* Checkboxes */}
          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-5 w-5" />
              <span>我呼吸跑拍了</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-5 w-5" />
              <span>我沒有節操</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-5 w-5" />
              <span>我台語很雷</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-5 w-5" defaultChecked />
              <span>我砲台沒裝好被嗆到她</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-5 w-5" />
              <span>我每天不知道在忙三小</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-5 w-5" />
              <span>我裙子不夠短沒有誠意</span>
            </label>
          </div>

          {/* Footer Text */}
          <div className="text-center text-sm">
            <p className="mb-2">
              本人 謝凱宇 在此向 葉幸竺 道歉
            </p>
            <p>
              並保證未來開唱前會注意砲台有對準正確目標 避免誤傷情況再次發生
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApologyForm; 