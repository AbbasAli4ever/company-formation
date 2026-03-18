import React from "react";
import { Input } from "../../../components/ui/input";
import { Select, SelectOption } from "../../../components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import { Textarea } from "../../../components/ui/textarea";
import { PhoneInput } from "../../../components/ui/phone-input";
import { useCompanyStore } from "../../../store/useCompanyStore";

const countryOptions: SelectOption[] = [
  { value: "hong-kong", label: "Hong Kong" },
  { value: "singapore", label: "Singapore" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "uae", label: "United Arab Emirates" },
];

const businessScopeOptions: SelectOption[] = [
  { value: "trading", label: "Trading" },
  { value: "consulting", label: "Consulting Services" },
  { value: "it-services", label: "IT & Software Services" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "import-export", label: "Import/Export" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "finance", label: "Financial Services" },
  { value: "real-estate", label: "Real Estate" },
];

const companyTypeOptions: SelectOption[] = [
  {
    value: "limited_liability_company",
    label: "Limited Liability Company (LLC)",
  },
  {
    value: "private_limited_company",
    label: "Private Limited Company (LTD)",
  },
];

const natureOfBusinessOptions = [
  { id: "ecommerce", label: "E-Commerce" },
  { id: "consulting", label: "Consulting" },
  { id: "services", label: "Services" },
  { id: "trading", label: "Trading" },
  { id: "it_saas", label: "IT / SaaS" },
  { id: "other", label: "Other" },
];

export const Step1CompanyInfo: React.FC = () => {
  // Use the store directly
  const { formData, stepErrors, updateApplicant, updateCompany } =
    useCompanyStore();
  const { applicant, company } = formData;
  const errors = stepErrors;

  const handleCheckboxChange = (id: string, checked: boolean) => {
    const updatedNature = checked
      ? [...company.natureOfBusiness, id]
      : company.natureOfBusiness.filter((item) => item !== id);
    updateCompany({ natureOfBusiness: updatedNature });
  };

  return (
    <div className="space-y-8">
      {/* Personal Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#212833] border-b border-gray-200 pb-2">
          Personal Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#212833]">
              First Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter first name"
              value={applicant.firstName}
              onChange={(e) => updateApplicant({ firstName: e.target.value })}
              className={`bg-[#f5f7fa] border-gray-300 h-11 ${errors?.firstName ? "border-red-500" : ""}`}
            />
            {errors?.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#212833]">
              Last Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter last name"
              value={applicant.lastName}
              onChange={(e) => updateApplicant({ lastName: e.target.value })}
              className={`bg-[#f5f7fa] border-gray-300 h-11 ${errors?.lastName ? "border-red-500" : ""}`}
            />
            {errors?.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#212833]">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Enter email address"
              value={applicant.email}
              onChange={(e) => updateApplicant({ email: e.target.value })}
              className={`bg-[#f5f7fa] border-gray-300 h-11 ${errors?.email ? "border-red-500" : ""}`}
            />
            {errors?.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#212833]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              value={applicant.phone}
              onChange={(value) => updateApplicant({ phone: value })}
              defaultCountryCode={company.countryOfIncorporation}
              placeholder="Enter phone number"
              error={!!errors?.phone}
            />
            {errors?.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[#212833] border-b border-gray-200 pb-2">
          Company Information
        </h3>

        {/* Country of Incorporation */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#212833]">
            Country of Incorporation <span className="text-red-500">*</span>
          </label>
          <Select
            options={countryOptions}
            value={company.countryOfIncorporation}
            onChange={(value) =>
              updateCompany({ countryOfIncorporation: value })
            }
            placeholder="Hong Kong"
          />
        </div>

        {/* Proposed Company Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#212833]">
            Proposed Company Name (English){" "}
            <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter proposed company name"
            value={company.proposedCompanyName}
            onChange={(e) =>
              updateCompany({ proposedCompanyName: e.target.value })
            }
            className={`bg-[#f5f7fa] border-gray-300 h-11 ${errors?.proposedCompanyName ? "border-red-500" : ""}`}
          />
          {errors?.proposedCompanyName && (
            <p className="text-xs text-red-500 mt-1">
              {errors.proposedCompanyName}
            </p>
          )}
        </div>

        {/* Alternative Names */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#212833]">
            Alternative Names <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input
              type="text"
              placeholder="Alternative name 1"
              value={company.alternativeNames[0] || ""}
              onChange={(e) =>
                updateCompany({
                  alternativeNames: [
                    e.target.value,
                    company.alternativeNames[1] || "",
                    company.alternativeNames[2] || "",
                  ],
                })
              }
              className={`bg-[#f5f7fa] border-gray-300 h-11 ${errors?.alternativeName1 ? "border-red-500" : ""}`}
            />
            <Input
              type="text"
              placeholder="Alternative name 2"
              value={company.alternativeNames[1] || ""}
              onChange={(e) =>
                updateCompany({
                  alternativeNames: [
                    company.alternativeNames[0] || "",
                    e.target.value,
                    company.alternativeNames[2] || "",
                  ],
                })
              }
              className={`bg-[#f5f7fa] border-gray-300 h-11 ${errors?.alternativeName2 ? "border-red-500" : ""}`}
            />
            <Input
              type="text"
              placeholder="Alternative name 3"
              value={company.alternativeNames[2] || ""}
              onChange={(e) =>
                updateCompany({
                  alternativeNames: [
                    company.alternativeNames[0] || "",
                    company.alternativeNames[1] || "",
                    e.target.value,
                  ],
                })
              }
              className={`bg-[#f5f7fa] border-gray-300 h-11 ${errors?.alternativeName3 ? "border-red-500" : ""}`}
            />
          </div>
          {(errors?.alternativeName1 ||
            errors?.alternativeName2 ||
            errors?.alternativeName3) && (
            <p className="text-xs text-red-500 mt-1">
              {errors.alternativeName1 ||
                errors.alternativeName2 ||
                errors.alternativeName3}
            </p>
          )}
        </div>

        {/* Nature of Business */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#212833]">
            Nature of Business <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {natureOfBusinessOptions.map((option) => (
              <Checkbox
                key={option.id}
                checked={company.natureOfBusiness.includes(option.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(option.id, checked)
                }
                label={option.label}
              />
            ))}
          </div>
          {errors?.natureOfBusiness && (
            <p className="text-xs text-red-500 mt-1">
              {errors.natureOfBusiness}
            </p>
          )}
        </div>

        {/* Business Scope */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#212833]">
            Business Scope <span className="text-red-500">*</span>
          </label>
          <Select
            options={businessScopeOptions}
            value={company.businessScope}
            onChange={(value) => updateCompany({ businessScope: value })}
            placeholder="Select business scope"
          />
          {errors?.businessScope && (
            <p className="text-xs text-red-500 mt-1">{errors.businessScope}</p>
          )}
        </div>

        {/* Business Scope Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#212833]">
            Business Scope Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            placeholder="Describe your business activities in detail..."
            value={company.businessScopeDescription}
            minLength={50}
            onChange={(e) =>
              updateCompany({ businessScopeDescription: e.target.value })
            }
            className={`bg-[#f5f7fa] border-gray-300 min-h-[100px] ${errors?.businessScopeDescription ? "border-red-500" : ""}`}
          />
          {errors?.businessScopeDescription && (
            <p className="text-xs text-red-500 mt-1">
              {errors.businessScopeDescription}
            </p>
          )}
        </div>

        {/* Company Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#212833]">
            Company Type <span className="text-red-500">*</span>
          </label>
          <Select
            options={companyTypeOptions}
            value={company.type}
            onChange={(value) => updateCompany({ type: value })}
            placeholder="Select company type"
          />
          {errors?.companyType && (
            <p className="text-xs text-red-500 mt-1">{errors.companyType}</p>
          )}
        </div>
      </div>
    </div>
  );
};
