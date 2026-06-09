import React, { useState, useEffect, useRef } from "react";
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

const allCountries = Object.values(countryData).sort((a, b) =>
  a.name.localeCompare(b.name),
);

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
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(defaultCountryCode);
  const [phoneNumber, setPhoneNumber] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setIsOpen(false);
    onChange(formatPhoneNumber(countryCode, phoneNumber));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(newNumber);
    onChange(formatPhoneNumber(selectedCountry, newNumber));
  };

  const filteredCountries = search.trim()
    ? allCountries.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.phoneCode.includes(search),
      )
    : allCountries;

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
          <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 flex flex-col">
            <div className="p-2 border-b border-gray-100">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country or code..."
                className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="overflow-y-auto max-h-52">
              {filteredCountries.length === 0 ? (
                <p className="px-3 py-4 text-sm text-gray-500 text-center">
                  No countries found
                </p>
              ) : (
                filteredCountries.map((country) => (
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
                    <span className="font-medium w-12 shrink-0">
                      {country.phoneCode}
                    </span>
                    <span className="text-gray-500 truncate">{country.name}</span>
                  </button>
                ))
              )}
            </div>
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
