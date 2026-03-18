import * as React from "react";
import { cn } from "../../lib/utils";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  className?: string;
  disabled?: boolean;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, value, onChange, name, className, disabled = false }, ref) => {
    return (
      <div ref={ref} className={cn("flex gap-6", className)}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center gap-2 cursor-pointer group",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <div className="relative flex items-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => !disabled && onChange?.(e.target.value)}
                disabled={disabled}
                className="sr-only"
              />
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  value === option.value
                    ? "border-[#212833] bg-white"
                    : "border-gray-300 bg-white group-hover:border-gray-400"
                )}
              >
                {value === option.value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#212833]" />
                )}
              </div>
            </div>
            <span className="text-sm font-normal text-[#212833] select-none">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
