import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({ children, isLoading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className="bg-button-background hover:bg-button-hover px-3 py-3 rounded-lg text-text-primary font-semibold disabled:bg-accent-disabled disabled:cursor-not-allowed transition-all duration-300 ease-in-out -shadow-md hover:shadow-lg"
    >
      {isLoading ? "Searching..." : children}
    </button>
  );
}
