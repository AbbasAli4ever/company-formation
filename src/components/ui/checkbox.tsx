import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked = false, onCheckedChange, label, className, disabled = false }, ref) => {
    const handleToggle = () => {
      if (!disabled) {
        onCheckedChange?.(!checked);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "inline-flex items-center gap-3 group cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <div
          className={cn(
            "h-5 w-5 shrink-0 rounded border-2 flex items-center justify-center transition-all duration-200",
            checked
              ? "bg-[#004eff] border-[#004eff]"
              : "bg-white border-gray-300 group-hover:border-gray-400"
          )}
        >
          {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
        </div>
        {label && (
          <span className="text-sm font-normal text-[#212833] leading-5 select-none">
            {label}
          </span>
        )}
      </button>
    );
  }
);

Checkbox.displayName = "Checkbox";
