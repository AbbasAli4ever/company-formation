import React from "react";
import { cn } from "../../lib/utils";
import { Input } from "./input";
import { Select, SelectOption } from "./select";

export interface AddressData {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const countryOptions: SelectOption[] = [
  { value: "hong-kong", label: "Hong Kong" },
  { value: "singapore", label: "Singapore" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "uae", label: "United Arab Emirates" },
];

interface AddressInputProps {
  value: AddressData;
  onChange: (value: AddressData) => void;
  errors?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  className?: string;
  disabled?: boolean;
  defaultCountry?: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  errors,
  className,
  disabled,
  defaultCountry,
}) => {
  const handleChange = (field: keyof AddressData, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  // Set default country if none is set
  React.useEffect(() => {
    if (defaultCountry && !value.country) {
      onChange({
        ...value,
        country: defaultCountry,
      });
    }
  }, [defaultCountry]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Street Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#212833]">
          Street Address <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="Enter street address"
          value={value.street || ""}
          onChange={(e) => handleChange("street", e.target.value)}
          disabled={disabled}
          className={cn(
            "bg-[#f5f7fa] border-gray-300 h-11",
            errors?.street && "border-red-500",
          )}
        />
        {errors?.street && (
          <p className="text-xs text-red-500 mt-1">{errors.street}</p>
        )}
      </div>

      {/* City & State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#212833]">
            City <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter city"
            value={value.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
            disabled={disabled}
            className={cn(
              "bg-[#f5f7fa] border-gray-300 h-11",
              errors?.city && "border-red-500",
            )}
          />
          {errors?.city && (
            <p className="text-xs text-red-500 mt-1">{errors.city}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#212833]">
            State/Province
          </label>
          <Input
            type="text"
            placeholder="Enter state or province"
            value={value.state || ""}
            onChange={(e) => handleChange("state", e.target.value)}
            disabled={disabled}
            className="bg-[#f5f7fa] border-gray-300 h-11"
          />
        </div>
      </div>

      {/* Postal Code & Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#212833]">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter postal code"
            value={value.postalCode || ""}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            disabled={disabled}
            className={cn(
              "bg-[#f5f7fa] border-gray-300 h-11",
              errors?.postalCode && "border-red-500",
            )}
          />
          {errors?.postalCode && (
            <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#212833]">
            Country <span className="text-red-500">*</span>
          </label>
          <Select
            options={countryOptions}
            value={value.country || ""}
            onChange={(val) => handleChange("country", val)}
            placeholder="Select country"
            disabled={disabled}
          />
          {errors?.country && (
            <p className="text-xs text-red-500 mt-1">{errors.country}</p>
          )}
        </div>
      </div>
    </div>
  );
};
