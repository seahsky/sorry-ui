import { create } from "zustand";
import { ApologyReason } from "../models/ApologyReason";

interface ApologyStore {
  reasons: ApologyReason[];
  addReason: (text: string) => void;
  toggleReason: (id: string) => void;
  deleteReason: (id: string) => void;
}

export const useApologyStore = create<ApologyStore>((set) => ({
  reasons: [
    { id: "1", text: "我呼吸跑拍了", checked: false },
    { id: "2", text: "我沒有節操", checked: false },
    { id: "3", text: "我台語很雷", checked: false },
    { id: "4", text: "我砲台沒裝好誤嗆到她", checked: true },
    { id: "5", text: "我每天不知道在忙三小", checked: false },
    { id: "6", text: "我裙子不夠短沒有誠意", checked: false }
  ],
  addReason: (text: string) =>
    set((state) => ({
      reasons: [
        ...state.reasons,
        { id: crypto.randomUUID(), text, checked: true },
      ],
    })),
  toggleReason: (id: string) =>
    set((state) => ({
      reasons: state.reasons.map((reason) =>
        reason.id === id ? { ...reason, checked: !reason.checked } : reason
      ),
    })),
  deleteReason: (id: string) =>
    set((state) => ({
      reasons: state.reasons.filter((reason) => reason.id !== id),
    })),
})); 