import React from "react";
import { FileText, AlertCircle } from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import {
  useCompanyStore,
  useShareholders,
  useDirectors,
} from "../../../store/useCompanyStore";
import { countryData } from "../../../lib/countryUtils";

const getCountryLabel = (code: string) =>
  countryData[code]?.name || code || "Not provided";

const companyTypeMap: Record<string, string> = {
  limited_liability_company: "Limited Liability Company (LLC)",
  private_limited_company: "Private Limited Company (LTD)",
};

const businessTypeMap: Record<string, string> = {
  ecommerce: "E-Commerce",
  consulting: "Consulting",
  services: "Services",
  trading: "Trading",
  it_saas: "IT / SaaS",
  other: "Other",
};

const businessScopeMap: Record<string, string> = {
  trading: "Trading",
  consulting: "Consulting Services",
  "it-services": "IT & Software Services",
  manufacturing: "Manufacturing",
  "import-export": "Import/Export",
  ecommerce: "E-Commerce",
  finance: "Financial Services",
  "real-estate": "Real Estate",
};

const formatAddress = (address?: {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}) => {
  if (!address) return "Not provided";
  const parts = [
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.country ? getCountryLabel(address.country) : "",
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Not provided";
};

const fileNameOrNA = (
  file?: { fileName?: string } | null,
  placeholder = "Not uploaded",
) => file?.fileName || placeholder;

export const Step8Review: React.FC = () => {
  const { formData, stepErrors, acceptCompliance } = useCompanyStore();
  const shareholders = useShareholders();
  const directors = useDirectors();
  const errors = stepErrors;

  const { applicant, company, shareCapital, complianceAccepted } = formData;

  const getCountryName = () =>
    getCountryLabel(company.countryOfIncorporation);

  const isStep1Complete = !!(
    applicant.firstName &&
    applicant.lastName &&
    applicant.email &&
    company.type &&
    company.proposedCompanyName &&
    company.alternativeNames[0] &&
    company.alternativeNames[1] &&
    company.alternativeNames[2]
  );

  const isStep2Complete =
    shareholders.length > 0 &&
    shareholders.every((s) => s.fullName && s.email);

  const isStep3Complete =
    shareholders.length > 0 &&
    shareCapital.totalAmount > 0 &&
    shareCapital.totalShares > 0 &&
    shareholders.reduce((sum, s) => sum + (s.shareholding?.percentage || 0), 0) === 100;

  const isStep4Complete =
    directors.length > 0 &&
    directors.every((d) => d.fullName && d.email);

  const incompleteSections = [
    ...(!isStep1Complete ? ["Company Information"] : []),
    ...(!isStep2Complete ? ["Shareholders"] : []),
    ...(!isStep3Complete ? ["Share Capital"] : []),
    ...(!isStep4Complete ? ["Directors"] : []),
  ];

  const totalAllocated = shareholders.reduce(
    (sum, s) => sum + (s.shareholding?.percentage || 0),
    0,
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-[#212833] mb-2">
          Complete Review & Submit
        </h3>
        <p className="text-sm text-gray-600">
          Review all entered information before giving consent and submitting
          your application.
        </p>
      </div>

      {incompleteSections.length > 0 && (
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-amber-800 mb-1">
              Incomplete Sections
            </h4>
            <p className="text-sm text-amber-700">
              The following sections may have missing information:{" "}
              {incompleteSections.join(", ")}. Please complete them before
              submitting.
            </p>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-[#f8fbff] rounded-xl border border-[#dbe6ff]">
          <p className="text-xs text-gray-600">Shareholders</p>
          <p className="text-lg font-semibold text-[#212833]">{shareholders.length}</p>
        </div>
        <div className="p-4 bg-[#f8fbff] rounded-xl border border-[#dbe6ff]">
          <p className="text-xs text-gray-600">Directors</p>
          <p className="text-lg font-semibold text-[#212833]">{directors.length}</p>
        </div>
        <div className="p-4 bg-[#f8fbff] rounded-xl border border-[#dbe6ff]">
          <p className="text-xs text-gray-600">Share Allocation</p>
          <p className="text-lg font-semibold text-[#212833]">{totalAllocated.toFixed(2)}%</p>
        </div>
        <div className="p-4 bg-[#f8fbff] rounded-xl border border-[#dbe6ff]">
          <p className="text-xs text-gray-600">Compliance Consent</p>
          <p className="text-lg font-semibold text-[#212833]">
            {complianceAccepted.isAccepted ? "Accepted" : "Pending"}
          </p>
        </div>
      </div>

      {/* Applicant Information */}
      <div className="p-3 md:p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-base font-semibold text-[#212833] mb-4">
          Applicant Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-600 mb-1">First Name</p>
            <p className="font-medium text-[#212833]">{applicant.firstName || "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Last Name</p>
            <p className="font-medium text-[#212833]">{applicant.lastName || "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Email</p>
            <p className="font-medium text-[#212833]">{applicant.email || "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Phone</p>
            <p className="font-medium text-[#212833]">{applicant.phone || "Not provided"}</p>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="p-3 md:p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-base font-semibold text-[#212833] mb-4">
          Company Information
        </h4>
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Country of Incorporation</p>
              <p className="font-medium text-[#212833]">{getCountryLabel(company.countryOfIncorporation)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Company Type</p>
              <p className="font-medium text-[#212833]">
                {companyTypeMap[company.type] || company.type || "Not provided"}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Proposed Company Name</p>
            <p className="font-medium text-[#212833]">{company.proposedCompanyName || "Not provided"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-2">Alternative Names</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {company.alternativeNames.map((name, index) => (
                <div key={index} className="rounded-lg border border-gray-200 bg-[#f9fafb] p-3">
                  <p className="text-xs text-gray-500 mb-1">Alternative Name {index + 1}</p>
                  <p className="text-sm font-medium text-[#212833]">{name || "Not provided"}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Nature of Business</p>
            <p className="font-medium text-[#212833]">
              {company.natureOfBusiness.length > 0
                ? company.natureOfBusiness.map((t) => businessTypeMap[t] || t).join(", ")
                : "Not selected"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Business Scope</p>
            <p className="font-medium text-[#212833]">
              {businessScopeMap[company.businessScope] || company.businessScope || "Not selected"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Business Scope Description</p>
            <p className="font-medium text-[#212833]">{company.businessScopeDescription || "Not provided"}</p>
          </div>
        </div>
      </div>

      {/* Share Capital & Distribution */}
      <div className="p-3 md:p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-base font-semibold text-[#212833] mb-4">
          Share Capital & Distribution
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-5">
          <div>
            <p className="text-xs text-gray-600 mb-1">Capital Amount</p>
            <p className="font-medium text-[#212833]">
              {shareCapital.currency} {Number(shareCapital.totalAmount || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Shares</p>
            <p className="font-medium text-[#212833]">
              {Number(shareCapital.totalShares || 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Allocated Ownership</p>
            <p className="font-medium text-[#212833]">{totalAllocated.toFixed(2)}%</p>
          </div>
        </div>

        <div className="space-y-3">
          {shareholders.length === 0 ? (
            <p className="text-sm text-gray-600">No shareholders added.</p>
          ) : (
            shareholders.map((shareholder, index) => (
              <div key={shareholder.id} className="rounded-lg border border-gray-200 p-4 bg-[#fafbfc]">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h5 className="text-sm font-semibold text-[#212833]">
                    Shareholder {index + 1}
                  </h5>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    Own Name
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Full Name</p>
                    <p className="font-medium text-[#212833]">{shareholder.fullName || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Type</p>
                    <p className="font-medium text-[#212833]">
                      {shareholder.type === "corporate" ? "Corporate Entity" : "Individual"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Shares</p>
                    <p className="font-medium text-[#212833]">
                      {Number(shareholder.shareholding?.shares || 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Ownership</p>
                    <p className="font-medium text-[#212833]">
                      {(shareholder.shareholding?.percentage || 0).toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-[#212833]">{shareholder.email || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Phone</p>
                    <p className="font-medium text-[#212833]">{shareholder.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Nationality</p>
                    <p className="font-medium text-[#212833]">
                      {getCountryLabel(shareholder.nationality || "")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Address</p>
                    <p className="font-medium text-[#212833]">
                      {formatAddress(shareholder.residentialAddress)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <p className="text-xs text-gray-600 mb-2">Documents</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="rounded-md border border-gray-200 p-2">
                      <p className="text-xs text-gray-500">Passport</p>
                      <p className="font-medium text-[#212833]">{fileNameOrNA(shareholder.documents?.passport)}</p>
                    </div>
                    <div className="rounded-md border border-gray-200 p-2">
                      <p className="text-xs text-gray-500">Selfie</p>
                      <p className="font-medium text-[#212833]">{fileNameOrNA(shareholder.documents?.selfie)}</p>
                    </div>
                    <div className="rounded-md border border-gray-200 p-2">
                      <p className="text-xs text-gray-500">Address Proof</p>
                      <p className="font-medium text-[#212833]">{fileNameOrNA(shareholder.documents?.addressProof)}</p>
                    </div>
                    {shareholder.type === "corporate" && (
                      <>
                        <div className="rounded-md border border-gray-200 p-2">
                          <p className="text-xs text-gray-500">Certificate of Incorporation</p>
                          <p className="font-medium text-[#212833]">
                            {fileNameOrNA(shareholder.documents?.certificate_of_incorporation)}
                          </p>
                        </div>
                        <div className="rounded-md border border-gray-200 p-2">
                          <p className="text-xs text-gray-500">Business License</p>
                          <p className="font-medium text-[#212833]">
                            {fileNameOrNA(shareholder.documents?.business_license)}
                          </p>
                        </div>
                        <div className="rounded-md border border-gray-200 p-2">
                          <p className="text-xs text-gray-500">Other Documents</p>
                          <p className="font-medium text-[#212833]">
                            {fileNameOrNA(shareholder.documents?.others)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Directors */}
      <div className="p-3 md:p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-base font-semibold text-[#212833] mb-4">Directors</h4>
        <div className="space-y-3">
          {directors.length === 0 ? (
            <p className="text-sm text-gray-600">No directors added.</p>
          ) : (
            directors.map((director, index) => (
              <div key={director.id} className="rounded-lg border border-gray-200 p-4 bg-[#fafbfc]">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h5 className="text-sm font-semibold text-[#212833]">
                    Director {index + 1}
                  </h5>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    Own Name
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Full Name</p>
                    <p className="font-medium text-[#212833]">{director.fullName || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Director Type</p>
                    <p className="font-medium text-[#212833]">
                      {director.type === "corporate" ? "Corporate Entity" : "Individual"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-[#212833]">{director.email || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Phone</p>
                    <p className="font-medium text-[#212833]">{director.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Nationality</p>
                    <p className="font-medium text-[#212833]">
                      {getCountryLabel(director.nationality || "")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Address</p>
                    <p className="font-medium text-[#212833]">
                      {formatAddress(director.residentialAddress)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <p className="text-xs text-gray-600 mb-2">Documents</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="rounded-md border border-gray-200 p-2">
                      <p className="text-xs text-gray-500">Passport</p>
                      <p className="font-medium text-[#212833]">{fileNameOrNA(director.documents?.passport)}</p>
                    </div>
                    <div className="rounded-md border border-gray-200 p-2">
                      <p className="text-xs text-gray-500">Selfie</p>
                      <p className="font-medium text-[#212833]">{fileNameOrNA(director.documents?.selfie)}</p>
                    </div>
                    <div className="rounded-md border border-gray-200 p-2">
                      <p className="text-xs text-gray-500">Address Proof</p>
                      <p className="font-medium text-[#212833]">{fileNameOrNA(director.documents?.addressProof)}</p>
                    </div>
                    {director.type === "corporate" && (
                      <>
                        <div className="rounded-md border border-gray-200 p-2">
                          <p className="text-xs text-gray-500">Certificate of Incorporation</p>
                          <p className="font-medium text-[#212833]">
                            {fileNameOrNA(director.documents?.certificate_of_incorporation)}
                          </p>
                        </div>
                        <div className="rounded-md border border-gray-200 p-2">
                          <p className="text-xs text-gray-500">Business License</p>
                          <p className="font-medium text-[#212833]">
                            {fileNameOrNA(director.documents?.business_license)}
                          </p>
                        </div>
                        <div className="rounded-md border border-gray-200 p-2">
                          <p className="text-xs text-gray-500">Other Documents</p>
                          <p className="font-medium text-[#212833]">
                            {fileNameOrNA(director.documents?.others)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Compliance Declaration */}
      <div className="p-3 md:p-6 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3 mb-4">
          <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-base font-semibold text-[#212833] mb-3">
              Compliance Declaration
            </h4>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                I hereby declare that the information provided is complete and
                accurate. I confirm that the company will not engage in
                restricted or unlawful activities under {getCountryName()} law,
                including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Money laundering or terrorist financing</li>
                <li>Illegal trading of goods or services</li>
                <li>Activities prohibited under {getCountryName()} regulations</li>
                <li>Tax evasion or fraudulent activities</li>
              </ul>
              <p>
                I understand that providing false information may result in
                rejection of the application and potential legal consequences.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Checkbox
            checked={complianceAccepted.isAccepted}
            onCheckedChange={(checked) => acceptCompliance(checked)}
            label="I have reviewed all details and agree to the compliance declaration above"
          />
          {errors?.complianceAccepted && (
            <p className="text-xs text-red-500 mt-2 ml-8">{errors.complianceAccepted}</p>
          )}
        </div>
      </div>

      {/* Final Confirmation */}
      <div className="p-3 md:p-5 bg-green-50 rounded-xl border border-green-200">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="text-base font-semibold text-[#212833] mb-2">Final Confirmation</h4>
            <p className="text-sm text-gray-700">
              Once submitted, our team will review your application and contact
              you if any clarification is needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
