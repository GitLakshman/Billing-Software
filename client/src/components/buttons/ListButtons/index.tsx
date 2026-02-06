import type { ReactNode } from "react";

interface Button {
  icon: ReactNode;
}

export const PrimaryWarningButton = ({ icon }: Button) => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center bg-red-500 text-white px-2 py-1 rounded-sm hover:opacity-95 transition-colors duration-200"
    >
      {icon}
    </button>
  );
};
