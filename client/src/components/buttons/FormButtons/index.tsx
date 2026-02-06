import type { ReactNode } from "react";

interface Button {
  children: ReactNode;
}

export const PrimaryButtonLong = ({ children }: Button) => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center bg-blue-600 text-white px-2 py-1 w-full rounded-sm hover:opacity-95 transition-colors duration-200"
    >
      {children}
    </button>
  );
};

export const SecondaryButtonLong = ({ children }: Button) => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center bg-yellow-400 px-2 py-1 w-full rounded-sm hover:opacity-95 transition-colors duration-200"
    >
      {children}
    </button>
  );
};
