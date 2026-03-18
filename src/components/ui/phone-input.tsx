import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import {
  countryData,
  parsePhoneNumber,
  formatPhoneNumber,
} from "../../lib/countryUtils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  defaultCountryCode?: string;
  placeholder?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  defaultCountryCode = "hong-kong",
  placeholder = "Enter phone number",
  className,
  error,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(defaultCountryCode);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Parse incoming value
  useEffect(() => {
    if (value) {
      const parsed = parsePhoneNumber(value, defaultCountryCode);
      setSelectedCountry(parsed.countryCode);
      setPhoneNumber(parsed.phoneNumber);
    } else {
      setSelectedCountry(defaultCountryCode);
      setPhoneNumber("");
    }
  }, [value, defaultCountryCode]);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setIsOpen(false);
    // Update the combined value
    const newValue = formatPhoneNumber(countryCode, phoneNumber);
    onChange(newValue);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(newNumber);
    // Update the combined value
    const newValue = formatPhoneNumber(selectedCountry, newNumber);
    onChange(newValue);
  };

  // Only show the 5 supported countries
  const supportedCountryCodes = ["hong-kong", "singapore", "usa", "uk", "uae"];
  const countries = Object.values(countryData).filter((c) =>
    supportedCountryCodes.includes(c.code),
  );
  const currentCountry =
    countryData[selectedCountry] || countryData["hong-kong"];

  return (
    <div className={cn("relative flex", className)}>
      {/* Country Selector */}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "flex items-center gap-1 px-3 h-11 bg-[#f5f7fa] border border-r-0 border-gray-300 rounded-l-md text-sm",
            "hover:bg-gray-100 transition-colors",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500",
          )}
        >
          <span className="text-base">{currentCountry.flag}</span>
          <span className="text-gray-700 font-medium">
            {currentCountry.phoneCode}
          </span>
          <svg
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              isOpen && "rotate-180",
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleCountryChange(country.code)}
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-2 text-left text-sm hover:bg-gray-50",
                  selectedCountry === country.code &&
                    "bg-blue-50 text-blue-700",
                )}
              >
                <span className="text-base">{country.flag}</span>
                <span className="font-medium">{country.phoneCode}</span>
                <span className="text-gray-500 truncate">{country.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "flex-1 px-3 h-11 bg-[#f5f7fa] border border-gray-300 rounded-r-md text-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-red-500",
        )}
      />

      {/* Click outside handler */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
