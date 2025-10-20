import type { ButtonHTMLAttributes } from "react";
import { useLanguage } from "../../context/LanguageContext";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({ children, isLoading, ...props }: ButtonProps) {
  const { t } = useLanguage();
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className="bg-button hover:bg-button-hover md:w-1/4 p-3 rounded-lg font-semibold disabled:bg-accent-disabled disabled:cursor-not-allowed transition-all duration-300 ease-in-out -shadow-md hover:shadow-lg"
    >
      {isLoading ? t.searchingButton : children}
    </button>
  );
}
