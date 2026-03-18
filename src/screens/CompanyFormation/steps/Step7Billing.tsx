import React from "react";
import { Input } from "../../../components/ui/input";
import { Select, SelectOption } from "../../../components/ui/select";
import { PhoneInput } from "../../../components/ui/phone-input";
import { AddressInput } from "../../../components/ui/address-input";
import { useCompanyStore } from "../../../store/useCompanyStore";

const paymentMethodOptions: SelectOption[] = [
  { value: "card", label: "Credit / Debit Card" },
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "crypto", label: "Cryptocurrency" },
  { value: "paypal", label: "PayPal" },
];

export const Step7Billing: React.FC = () => {
  // Use the store directly
  const { formData, stepErrors, updateBilling } = useCompanyStore();
  const { billing, company } = formData;
  const errors = stepErrors;
  const defaultCountryCode = company.countryOfIncorporation;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-[#212833] mb-2">
          Billing Information
        </h3>
        <p className="text-sm text-gray-600">
          Provide your billing details for invoice generation
        </p>
      </div>

      {/* Billing Form */}
      <div className="p-3 sm:p-6 bg-white rounded-xl border border-gray-200">
        <div className="space-y-6">
          {/* Company/Client Name - Full Width */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#212833]">
              Company/Client Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter name"
              value={billing.name}
              onChange={(e) => updateBilling({ name: e.target.value })}
              className={`bg-[#f5f7fa] border-gray-300 h-11 ${errors?.billingName ? "border-red-500" : ""}`}
            />
            {errors?.billingName && (
              <p className="text-xs text-red-500 mt-1">{errors.billingName}</p>
            )}
          </div>

          {/* Email & Phone - 2 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#212833]">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="billing@example.com"
                value={billing.email}
                onChange={(e) => updateBilling({ email: e.target.value })}
                className={`bg-[#f5f7fa] border-gray-300 h-11 ${errors?.billingEmail ? "border-red-500" : ""}`}
              />
              {errors?.billingEmail && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.billingEmail}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#212833]">
                Phone <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                value={billing.phone}
                onChange={(value) => updateBilling({ phone: value })}
                defaultCountryCode={defaultCountryCode}
                placeholder="Enter phone number"
                error={!!errors?.billingPhone}
              />
              {errors?.billingPhone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.billingPhone}
                </p>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#212833]">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <Select
              options={paymentMethodOptions}
              value={billing.paymentMethod}
              onChange={(value) => updateBilling({ paymentMethod: value })}
              placeholder="Select payment method"
            />
            {errors?.paymentMethod && (
              <p className="text-xs text-red-500 mt-1">
                {errors.paymentMethod}
              </p>
            )}
          </div>

          {/* Billing Address */}
          <div>
            <h5 className="text-sm font-medium text-[#212833] mb-4">
              Billing Address <span className="text-red-500">*</span>
            </h5>
            <AddressInput
              value={
                billing.address || {
                  street: "",
                  city: "",
                  state: "",
                  postalCode: "",
                  country: "",
                }
              }
              onChange={(address) => updateBilling({ address })}
              defaultCountry={defaultCountryCode}
              errors={{
                street: errors?.billingAddress,
                city: errors?.billingCity,
                postalCode: errors?.billingPostalCode,
                country: errors?.billingCountry,
              }}
            />
          </div>
        </div>
      </div>

      {/* Estimated Costs */}
      {/* <div className="p-3 md:p-6 bg-[#f9fafb] rounded-xl border border-gray-200">
        <h4 className="text-lg font-semibold text-[#212833] mb-6">
          Estimated Costs
        </h4>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Company Formation Fee</span>
            <span className="text-sm font-semibold text-[#212833]">
              HKD 5,000
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">
              Government Registration Fee
            </span>
            <span className="text-sm font-semibold text-[#212833]">
              HKD 1,720
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-700">Additional Services</span>
              <span className="text-xs text-gray-500 ml-1">
                ({formData.services.additionalServices.length})
              </span>
            </div>
            <span className="text-sm font-semibold text-[#212833]">
              Price on request
            </span>
          </div>

          <div className="border-t border-gray-300 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-[#212833]">
                Estimated Total
              </span>
              <span className="text-base font-bold text-[#212833]">
                HKD 6,720
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-500 italic mt-3">
            * Final pricing will be confirmed after review of selected services
          </p>
        </div>
      </div> */}
    </div>
  );
};
