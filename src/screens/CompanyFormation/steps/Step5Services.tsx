import React, { useEffect } from "react";
import { Checkbox } from "../../../components/ui/checkbox";
import { RadioGroup } from "../../../components/ui/radio-group";
import { useCompanyStore } from "../../../store/useCompanyStore";

const bankingOptions = [
  { id: "airwallex", label: "Airwallex" },
  { id: "paypal", label: "PayPal" },
  { id: "payoneer", label: "Payoneer" },
  { id: "currenxie", label: "Currenxie" },
  { id: "stripe", label: "Stripe" },
  { id: "bank_account_assistance", label: "Bank Account Assistance" },
];

const additionalServiceOptions = [
  { id: "annual_secretarial_service", label: "Annual Secretarial Service" },
  { id: "registered_address_renewal", label: "Registered Address Renewal" },
  { id: "accounting_bookkeeping", label: "Accounting & Bookkeeping" },
  { id: "audit_arrangement", label: "Audit Arrangement" },
  { id: "br_renewal_handling", label: "BR Renewal Handling" },
  { id: "virtual_office", label: "Virtual Office" },
  { id: "phone_number_efax", label: "Phone Number / E-Fax" },
  { id: "nominee_shareholder_service", label: "Nominee Shareholder Service" },
  { id: "nominee_director_service", label: "Nominee Director Service" },
  { id: "compliance_support", label: "Compliance Support" },
  { id: "visa_application_support", label: "Visa Application Support" },
  { id: "paypal_stripe_setup_guidance", label: "PayPal / Stripe Setup Guidance" },
];

export const Step5Services: React.FC = () => {
  // Use the store directly
  const { formData, stepErrors, updateServices, updateBanking } = useCompanyStore();
  const { services } = formData;
  const errors = stepErrors;
  const selectedProviderIds = services.banking.providers;
  const preferredProvider = services.banking.preferredProvider;

  const hasNomineeShareholder = formData.persons.some(
    (p) => p.roles.includes("shareholder") && (p.isNominee || p.shareholderSelection === "nominee"),
  );
  const hasNomineeDirector = formData.persons.some(
    (p) => p.roles.includes("director") && (p.isNominee || p.shareholderSelection === "nominee"),
  );
  const preferredEligibleProviderIds = selectedProviderIds;

  const selectedBankingProviders = selectedProviderIds
    .map((id) => {
      const option = bankingOptions.find((opt) => opt.id === id);
      return option ? { value: option.id, label: option.label } : null;
    })
    .filter(Boolean) as { value: string; label: string }[];

  const preferredBankingProviders = preferredEligibleProviderIds
    .map((id) => {
      const option = bankingOptions.find((opt) => opt.id === id);
      return option ? { value: option.id, label: option.label } : null;
    })
    .filter(Boolean) as { value: string; label: string }[];

  useEffect(() => {
    if (preferredEligibleProviderIds.length === 0 && preferredProvider) {
      updateBanking({ preferredProvider: "" });
      return;
    }

    if (
      preferredEligibleProviderIds.length === 1 &&
      preferredProvider !== preferredEligibleProviderIds[0]
    ) {
      updateBanking({ preferredProvider: preferredEligibleProviderIds[0] });
      return;
    }

    if (
      preferredEligibleProviderIds.length > 1 &&
      preferredProvider &&
      !preferredEligibleProviderIds.includes(preferredProvider)
    ) {
      updateBanking({ preferredProvider: "" });
    }
  }, [preferredEligibleProviderIds, preferredProvider, updateBanking]);

  // Auto-add nominee services when nominees are present; auto-remove when they're not
  useEffect(() => {
    let updated = [...services.additionalServices];
    let changed = false;

    if (hasNomineeShareholder && !updated.includes("nominee_shareholder_service")) {
      updated.push("nominee_shareholder_service");
      changed = true;
    } else if (!hasNomineeShareholder && updated.includes("nominee_shareholder_service")) {
      updated = updated.filter((s) => s !== "nominee_shareholder_service");
      changed = true;
    }

    if (hasNomineeDirector && !updated.includes("nominee_director_service")) {
      updated.push("nominee_director_service");
      changed = true;
    } else if (!hasNomineeDirector && updated.includes("nominee_director_service")) {
      updated = updated.filter((s) => s !== "nominee_director_service");
      changed = true;
    }

    if (changed) updateServices({ additionalServices: updated });
  }, [hasNomineeShareholder, hasNomineeDirector]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBankingChange = (id: string, checked: boolean) => {
    let updated = checked
      ? [...selectedProviderIds, id]
      : selectedProviderIds.filter((item) => item !== id);

    let nextPreferredProvider = preferredProvider;
    const updatedEligibleProviderIds = updated;

    if (updatedEligibleProviderIds.length === 0) {
      nextPreferredProvider = "";
    } else if (updatedEligibleProviderIds.length === 1) {
      nextPreferredProvider = updatedEligibleProviderIds[0];
    } else if (
      nextPreferredProvider &&
      !updatedEligibleProviderIds.includes(nextPreferredProvider)
    ) {
      nextPreferredProvider = "";
    }

    updateBanking({
      providers: updated,
      preferredProvider: nextPreferredProvider,
    });
  };

  const handlePreferredProviderChange = (value: string) => {
    updateBanking({ preferredProvider: value });
  };

  const handleAdditionalServiceChange = (id: string, checked: boolean) => {
    const updated = checked
      ? [...services.additionalServices, id]
      : services.additionalServices.filter((item) => item !== id);
    updateServices({ additionalServices: updated });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-[#212833] mb-2">
          Banking & Additional Services
        </h3>
        <p className="text-sm text-gray-600">
          Select the services you need to support your business
        </p>
      </div>

      {/* Bank Account Opening Services */}
      <div className="p-3 md:p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-base font-semibold text-[#212833] mb-2">
          Bank Account Opening Services (Optional)
        </h4>
        <p className="text-sm text-gray-600 mb-6">
          Select your preferred banking or fintech platforms
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {bankingOptions.map((option) => (
            <Checkbox
              key={option.id}
              checked={services.banking.providers.includes(option.id)}
              onCheckedChange={(checked) =>
                handleBankingChange(option.id, checked)
              }
              label={option.label}
            />
          ))}
        </div>

        {/* Preferred Provider Selection */}
        {preferredBankingProviders.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h5 className="text-sm font-semibold text-[#212833] mb-2">
              Preferred Provider
            </h5>
            {preferredBankingProviders.length === 1 ? (
              <p className="text-sm text-gray-700">
                {preferredBankingProviders[0].label} (auto-selected)
              </p>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-4">
                  Select your primary banking service preference
                </p>
                <RadioGroup
                  name="preferred-banking-provider"
                  options={preferredBankingProviders}
                  value={services.banking.preferredProvider}
                  onChange={handlePreferredProviderChange}
                />
                {errors?.bankingPreferredProvider && (
                  <p className="text-xs text-red-500 mt-2">
                    {errors.bankingPreferredProvider}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Additional Services */}
      <div className="p-3 md:p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-base font-semibold text-[#212833] mb-2">
          Additional Services (Optional)
        </h4>
        <p className="text-sm text-gray-600 mb-6">
          Enhance your company formation with these value-added services
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {additionalServiceOptions.map((option) => {
            const isNomineeLocked =
              (option.id === "nominee_shareholder_service" && hasNomineeShareholder) ||
              (option.id === "nominee_director_service" && hasNomineeDirector);

            return (
              <div key={option.id} className="flex flex-col gap-0.5">
                <Checkbox
                  checked={services.additionalServices.includes(option.id)}
                  onCheckedChange={(checked) => {
                    if (isNomineeLocked) return;
                    handleAdditionalServiceChange(option.id, checked);
                  }}
                  label={option.label}
                  disabled={isNomineeLocked}
                />
                {isNomineeLocked && (
                  <p className="text-xs text-blue-600 ml-6">
                    Auto-selected based on your nominee selection
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Selection Summary */}
      <div className="p-3 md:p-6 bg-[#f0f4ff] rounded-xl border border-blue-200">
        <h4 className="font-semibold text-[#212833] mb-3">
          Service Selection Summary
        </h4>
        <div className="space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-medium">Banking Services:</span>{" "}
            {selectedBankingProviders.length} selected
          </p>
          <p>
            <span className="font-medium">Additional Services:</span>{" "}
            {services.additionalServices.length} selected
          </p>
        </div>
      </div>
    </div>
  );
};
