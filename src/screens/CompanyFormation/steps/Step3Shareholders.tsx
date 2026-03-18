import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
import { Input } from "../../../components/ui/input";
import { Select, SelectOption } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { RadioGroup } from "../../../components/ui/radio-group";
import { PhoneInput } from "../../../components/ui/phone-input";
import { AddressInput } from "../../../components/ui/address-input";
import { Plus, Trash2, Upload } from "lucide-react";
import {
  useCompanyStore,
  useShareholders,
  PersonType,
  ShareholderSelection,
} from "../../../store/useCompanyStore";

const nationalityOptions: SelectOption[] = [
  { value: "hong-kong", label: "Hong Kong" },
  { value: "singapore", label: "Singapore" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "uae", label: "United Arab Emirates" },
];

const countryOfIncorporationOptions: SelectOption[] = [
  { value: "hong-kong", label: "Hong Kong" },
  { value: "singapore", label: "Singapore" },
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "uae", label: "United Arab Emirates" },
];

const shareholderTypeOptions = [
  { value: "individual", label: "Individual" },
  { value: "corporate", label: "Corporate" },
];

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const Step3Shareholders: React.FC = () => {
  const {
    formData,
    stepErrors,
    updatePerson,
    updatePersonDocuments,
    addShareholder,
    removeShareholder,
    updateShareholderDistribution,
  } = useCompanyStore();
  const shareholders = useShareholders();
  const errors = stepErrors;
  const defaultCountryCode = formData.company.countryOfIncorporation;

  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>(
    {},
  );
  const [percentageErrors, setPercentageErrors] = useState<
    Record<string, string>
  >({});

  const hasNomineeAt100 = shareholders.some(
    (s) =>
      (s.isNominee || s.shareholderSelection === "nominee") &&
      (s.shareholding?.percentage || 0) === 100,
  );

  const handleAddShareholder = () => {
    if (hasNomineeAt100) return;
    addShareholder("", 0, 0);
  };

  const handleRemoveShareholder = (id: string) => {
    removeShareholder(id);
  };

  const handleSelectionChange = (
    id: string,
    value: ShareholderSelection,
    currentName: string,
  ) => {
    if (value === "nominee") {
      updatePerson(id, {
        shareholderSelection: "nominee",
        isNominee: true,
        type: "individual",
        fullName: "Nominee",
        companyName: "",
        countryOfIncorporation: null,
        registrationNumber: null,
        nationality: "",
        email: "",
        phone: "",
        residentialAddress: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
        documents: {
          passport: null,
          selfie: null,
          addressProof: null,
          certificate_of_incorporation: null,
          business_license: null,
          others: null,
        },
      });
      return;
    }

    updatePerson(id, {
      shareholderSelection: "own_name",
      isNominee: false,
      fullName: currentName === "Nominee Shareholder" ? "" : currentName,
    });
  };

  const handleSharePercentageChange = (id: string, inputValue: string) => {
    const cleanedValue = inputValue.replace(/[^0-9.]/g, "");
    const parts = cleanedValue.split(".");
    const percentage =
      parts.length > 2
        ? parts[0] + "." + parts.slice(1).join("")
        : cleanedValue;

    const pct = Math.max(0, parseFloat(percentage) || 0);
    const otherPercentageAllocated = shareholders
      .filter((s) => s.id !== id)
      .reduce((sum, s) => sum + (s.shareholding?.percentage || 0), 0);
    const maxAllowed = Math.max(0, 100 - otherPercentageAllocated);

    if (pct > maxAllowed) {
      setPercentageErrors((prev) => ({
        ...prev,
        [id]: `Exceeds available ownership. Max: ${maxAllowed.toFixed(2)}%`,
      }));
    } else {
      setPercentageErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }

    const totalShares = formData.shareCapital.totalShares || 0;
    const normalizedPct = Math.min(100, pct);
    const shares = Math.round((normalizedPct / 100) * totalShares);

    updateShareholderDistribution(id, shares, normalizedPct);
  };

  const handleFileUpload = async (
    id: string,
    field:
      | "passport"
      | "selfie"
      | "addressProof"
      | "certificate_of_incorporation"
      | "business_license"
      | "others",
    file: File | null,
  ) => {
    if (!file) {
      updatePersonDocuments(id, { [field]: null });
      return;
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      alert("Unsupported file type. Allowed: PDF, JPEG, PNG, WEBP");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be under 10 MB");
      return;
    }

    const uploadKey = `${id}-${field}`;
    setUploadingFiles((prev) => ({ ...prev, [uploadKey]: true }));

    try {
      const presignRes = await fetch(`${API_BASE}/api/v1/uploads/presign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentType: field,
          fileName: file.name,
          mimeType: file.type,
          sizeBytes: file.size,
        }),
      });

      if (!presignRes.ok) {
        const err = await presignRes.json().catch(() => ({}));
        throw new Error(err?.error ?? "Failed to get upload URL");
      }

      const { uploadUrl, key, publicUrl } = await presignRes.json();

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error(`Upload failed: ${uploadRes.status}`);
      }

      updatePersonDocuments(id, {
        [field]: {
          key,
          url: publicUrl,
          fileName: file.name,
          mimeType: file.type,
          size: file.size,
        },
      });
    } catch (err: any) {
      alert(err.message ?? "File upload failed");
    } finally {
      setUploadingFiles((prev) => {
        const next = { ...prev };
        delete next[uploadKey];
        return next;
      });
    }
  };

  const isUploading = (id: string, field: string) =>
    !!uploadingFiles[`${id}-${field}`];

  const truncateFileName = (fileName: string, maxLength = 24) =>
    fileName.length > maxLength
      ? `${fileName.slice(0, maxLength)}...`
      : fileName;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-[#212833] mb-2">
            Shareholders Information
          </h3>
          <p className="text-sm text-gray-600">
            Add and complete details for each shareholder
          </p>
        </div>
        {!hasNomineeAt100 && (
          <Button
            type="button"
            onClick={handleAddShareholder}
            variant="outline"
            className="h-10 px-4 border-gray-300 hover:border-[#212833] hover:bg-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Shareholder
          </Button>
        )}
      </div>

      {hasNomineeAt100 && (
        <p className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-md px-3 py-2">
          Nominee is set to 100%. Additional shareholders are disabled.
        </p>
      )}

      {errors?.shareholders && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {errors.shareholders}
        </p>
      )}
      {errors?.shareDistribution && (
        <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {errors.shareDistribution}
        </p>
      )}

      {shareholders.length === 0 ? (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-[#f9fafb]">
          <p className="text-gray-500 mb-4">No shareholders added yet</p>
          <Button
            type="button"
            onClick={handleAddShareholder}
            variant="outline"
            className="h-10 px-6 border-gray-300 hover:border-[#212833]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add First Shareholder
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {shareholders.map((shareholder, index) => {
            const isNominee =
              shareholder.isNominee ||
              shareholder.shareholderSelection === "nominee";

            return (
              <div
                key={shareholder.id}
                className="p-3 md:p-6 bg-[#f9fafb] rounded-xl border border-gray-200"
              >
                <div className="flex items-start justify-between gap-3 mb-6">
                  <h4 className="text-lg font-semibold text-[#212833]">
                    Shareholder {index + 1}
                    {shareholder.fullName ? `: ${shareholder.fullName}` : ""}
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveShareholder(shareholder.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0"
                    aria-label={`Remove shareholder ${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-[#212833]">
                    Shareholder Selection <span className="text-red-500">*</span>
                  </label>
                  <div className="p-1 rounded-full bg-gradient-to-r w-[300px] from-[#6896ff] to-[#004eff]">
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        { value: "own_name", label: "Own Name" },
                        { value: "nominee", label: "Nominee" },
                      ].map((option) => {
                        const isActive =
                          (shareholder.shareholderSelection || "own_name") ===
                          option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              handleSelectionChange(
                                shareholder.id,
                                option.value as ShareholderSelection,
                                shareholder.fullName,
                              )
                            }
                            className={`h-11 rounded-full text-sm font-semibold transition-all duration-200 ${
                              isActive
                                ? "bg-white text-[#004eff] shadow-sm"
                                : "bg-transparent text-white hover:bg-white/15"
                            }`}
                            aria-pressed={isActive}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium text-[#212833]">
                    Ownership % <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="100"
                    value={shareholder.shareholding?.percentage?.toString() || ""}
                    onChange={(e) =>
                      handleSharePercentageChange(shareholder.id, e.target.value)
                    }
                    className={`bg-white border-gray-300 h-11 ${percentageErrors[shareholder.id] || errors?.[`shareholders.${index}.nomineePercentage`] ? "border-red-500" : ""}`}
                  />
                  {percentageErrors[shareholder.id] ? (
                    <p className="text-xs text-red-500 mt-1">
                      {percentageErrors[shareholder.id]}
                    </p>
                  ) : errors?.[`shareholders.${index}.nomineePercentage`] ? (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[`shareholders.${index}.nomineePercentage`]}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Assign percentage now; total must be exactly 100% before
                      proceeding.
                    </p>
                  )}
                </div>

                {isNominee ? (
                  <div className="space-y-2 mb-2">
                    <label className="block text-sm font-medium text-[#212833]">
                      Nominee Shareholder
                    </label>
                    <p className="text-xs text-gray-500">
                      Nominee is selected. Personal/corporate details are hidden.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 mb-6">
                      <label className="block text-sm font-medium text-[#212833]">
                        Shareholder Type <span className="text-red-500">*</span>
                      </label>
                      <RadioGroup
                        name={`shareholder-type-${shareholder.id}`}
                        options={shareholderTypeOptions}
                        value={shareholder.type}
                        onChange={(value) =>
                          updatePerson(shareholder.id, { type: value as PersonType })
                        }
                      />
                    </div>

                    {shareholder.type === "corporate" && (
                      <>
                        <div className="space-y-2 mb-6">
                          <label className="block text-sm font-medium text-[#212833]">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            type="text"
                            placeholder="Enter company name"
                            value={shareholder.companyName || ""}
                            onChange={(e) =>
                              updatePerson(shareholder.id, {
                                companyName: e.target.value,
                              })
                            }
                            className={`bg-white border-gray-300 h-11 ${errors?.[`shareholders.${index}.companyName`] ? "border-red-500" : ""}`}
                          />
                          {errors?.[`shareholders.${index}.companyName`] && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors[`shareholders.${index}.companyName`]}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#212833]">
                              Country of Incorporation{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <Select
                              options={countryOfIncorporationOptions}
                              value={shareholder.countryOfIncorporation || ""}
                              onChange={(value) =>
                                updatePerson(shareholder.id, {
                                  countryOfIncorporation: value,
                                })
                              }
                              placeholder="Select country"
                            />
                            {errors?.[
                              `shareholders.${index}.countryOfIncorporation`
                            ] && (
                              <p className="text-xs text-red-500 mt-1">
                                {
                                  errors[
                                    `shareholders.${index}.countryOfIncorporation`
                                  ]
                                }
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#212833]">
                              Registration No. <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="Enter registration number"
                              value={shareholder.registrationNumber || ""}
                              onChange={(e) =>
                                updatePerson(shareholder.id, {
                                  registrationNumber: e.target.value,
                                })
                              }
                              className={`bg-white border-gray-300 h-11 ${errors?.[`shareholders.${index}.registrationNumber`] ? "border-red-500" : ""}`}
                            />
                            {errors?.[`shareholders.${index}.registrationNumber`] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[`shareholders.${index}.registrationNumber`]}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#212833]">
                              Certificate of Incorporation{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <label className="flex flex-col items-center justify-center gap-2 py-4 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-[#004eff] hover:bg-blue-50/30 cursor-pointer transition-colors">
                              <Upload className="w-5 h-5 text-gray-400" />
                              <span
                                className="block w-full text-sm text-gray-600 text-center truncate"
                                title={
                                  shareholder.documents?.certificate_of_incorporation
                                    ?.fileName
                                }
                              >
                                {isUploading(
                                  shareholder.id,
                                  "certificate_of_incorporation",
                                )
                                  ? "Uploading..."
                                  : shareholder.documents?.certificate_of_incorporation
                                    ? truncateFileName(
                                        shareholder.documents
                                          .certificate_of_incorporation.fileName,
                                      )
                                    : "Upload Certificate"}
                              </span>
                              <span className="text-xs text-gray-400">
                                PDF, JPG, PNG · Max 10 MB
                              </span>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) =>
                                  handleFileUpload(
                                    shareholder.id,
                                    "certificate_of_incorporation",
                                    e.target.files?.[0] || null,
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                            {errors?.[`shareholders.${index}.certificate`] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors[`shareholders.${index}.certificate`]}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#212833]">
                              Business License{" "}
                              <span className="text-gray-400">(Optional)</span>
                            </label>
                            <label className="flex flex-col items-center justify-center gap-2 py-4 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-[#004eff] hover:bg-blue-50/30 cursor-pointer transition-colors">
                              <Upload className="w-5 h-5 text-gray-400" />
                              <span
                                className="block w-full text-sm text-gray-600 text-center truncate"
                                title={shareholder.documents?.business_license?.fileName}
                              >
                                {isUploading(shareholder.id, "business_license")
                                  ? "Uploading..."
                                  : shareholder.documents?.business_license
                                    ? truncateFileName(
                                        shareholder.documents.business_license.fileName,
                                      )
                                    : "Upload License"}
                              </span>
                              <span className="text-xs text-gray-400">
                                PDF, JPG, PNG · Max 10 MB
                              </span>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) =>
                                  handleFileUpload(
                                    shareholder.id,
                                    "business_license",
                                    e.target.files?.[0] || null,
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-[#212833]">
                              Other Documents{" "}
                              <span className="text-gray-400">(Optional)</span>
                            </label>
                            <label className="flex flex-col items-center justify-center gap-2 py-4 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-[#004eff] hover:bg-blue-50/30 cursor-pointer transition-colors">
                              <Upload className="w-5 h-5 text-gray-400" />
                              <span
                                className="block w-full text-sm text-gray-600 text-center truncate"
                                title={shareholder.documents?.others?.fileName}
                              >
                                {isUploading(shareholder.id, "others")
                                  ? "Uploading..."
                                  : shareholder.documents?.others
                                    ? truncateFileName(
                                        shareholder.documents.others.fileName,
                                      )
                                    : "Upload Document"}
                              </span>
                              <span className="text-xs text-gray-400">
                                PDF, JPG, PNG · Max 10 MB
                              </span>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) =>
                                  handleFileUpload(
                                    shareholder.id,
                                    "others",
                                    e.target.files?.[0] || null,
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-2 mb-6">
                      <label className="block text-sm font-medium text-[#212833]">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Numan"
                        value={shareholder.fullName || ""}
                        onChange={(e) =>
                          updatePerson(shareholder.id, { fullName: e.target.value })
                        }
                        className={`bg-white border-gray-300 h-11 ${errors?.[`shareholders.${index}.fullName`] ? "border-red-500" : ""}`}
                      />
                      {errors?.[`shareholders.${index}.fullName`] && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors[`shareholders.${index}.fullName`]}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#212833]">
                          Nationality <span className="text-red-500">*</span>
                        </label>
                        <Select
                          options={nationalityOptions}
                          value={shareholder.nationality || ""}
                          onChange={(value) =>
                            updatePerson(shareholder.id, { nationality: value })
                          }
                          placeholder="Select nationality"
                        />
                        {errors?.[`shareholders.${index}.nationality`] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[`shareholders.${index}.nationality`]}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#212833]">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          value={shareholder.email || ""}
                          onChange={(e) =>
                            updatePerson(shareholder.id, { email: e.target.value })
                          }
                          className={`bg-white border-gray-300 h-11 ${errors?.[`shareholders.${index}.email`] ? "border-red-500" : ""}`}
                        />
                        {errors?.[`shareholders.${index}.email`] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[`shareholders.${index}.email`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#212833]">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <PhoneInput
                          value={shareholder.phone || ""}
                          onChange={(value) =>
                            updatePerson(shareholder.id, { phone: value })
                          }
                          defaultCountryCode={defaultCountryCode}
                          placeholder="Enter phone number"
                          error={!!errors?.[`shareholders.${index}.phone`]}
                        />
                        {errors?.[`shareholders.${index}.phone`] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[`shareholders.${index}.phone`]}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#212833]">
                          Shareholding
                        </label>
                        <Input
                          type="text"
                          placeholder="0 shares (0%)"
                          value={
                            shareholder.shareholding?.shares
                              ? `${shareholder.shareholding.shares} shares (${shareholder.shareholding.percentage}%)`
                              : ""
                          }
                          disabled
                          className="bg-gray-100 border-gray-300 h-11 text-gray-600"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Based on share distribution from Step 3
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-[#212833] mb-4">
                        Residential Address <span className="text-red-500">*</span>
                      </h5>
                      <AddressInput
                        value={
                          shareholder.residentialAddress || {
                            street: "",
                            city: "",
                            state: "",
                            postalCode: "",
                            country: "",
                          }
                        }
                        onChange={(address) =>
                          updatePerson(shareholder.id, { residentialAddress: address })
                        }
                        defaultCountry={defaultCountryCode}
                        errors={{
                          street: errors?.[`shareholders.${index}.residentialAddress`],
                          city: errors?.[
                            `shareholders.${index}.residentialAddress.city`
                          ],
                          postalCode:
                            errors?.[
                              `shareholders.${index}.residentialAddress.postalCode`
                            ],
                          country:
                            errors?.[
                              `shareholders.${index}.residentialAddress.country`
                            ],
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#212833]">
                          Passport/ID Upload <span className="text-red-500">*</span>
                        </label>
                        <label className="flex flex-col items-center justify-center gap-2 py-4 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-[#004eff] hover:bg-blue-50/30 cursor-pointer transition-colors">
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span
                            className="block w-full text-sm text-gray-600 text-center truncate"
                            title={shareholder.documents?.passport?.fileName}
                          >
                            {isUploading(shareholder.id, "passport")
                              ? "Uploading..."
                              : shareholder.documents?.passport
                                ? truncateFileName(
                                    shareholder.documents.passport.fileName,
                                  )
                                : "Upload Passport"}
                          </span>
                          <span className="text-xs text-gray-400">
                            PDF, JPG, PNG · Max 10 MB
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) =>
                              handleFileUpload(
                                shareholder.id,
                                "passport",
                                e.target.files?.[0] || null,
                              )
                            }
                            className="hidden"
                          />
                        </label>
                        {errors?.[`shareholders.${index}.passportFile`] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[`shareholders.${index}.passportFile`]}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#212833]">
                          Passport Holding Selfie{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <label className="flex flex-col items-center justify-center gap-2 py-4 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-[#004eff] hover:bg-blue-50/30 cursor-pointer transition-colors">
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span
                            className="block w-full text-sm text-gray-600 text-center truncate"
                            title={shareholder.documents?.selfie?.fileName}
                          >
                            {isUploading(shareholder.id, "selfie")
                              ? "Uploading..."
                              : shareholder.documents?.selfie
                                ? truncateFileName(
                                    shareholder.documents.selfie.fileName,
                                  )
                                : "Upload Selfie"}
                          </span>
                          <span className="text-xs text-gray-400">
                            JPG, PNG · Max 10 MB
                          </span>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) =>
                              handleFileUpload(
                                shareholder.id,
                                "selfie",
                                e.target.files?.[0] || null,
                              )
                            }
                            className="hidden"
                          />
                        </label>
                        {errors?.[`shareholders.${index}.selfieFile`] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[`shareholders.${index}.selfieFile`]}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#212833]">
                          Proof of Address Upload{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <label className="flex flex-col items-center justify-center gap-2 py-4 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-[#004eff] hover:bg-blue-50/30 cursor-pointer transition-colors">
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span
                            className="block w-full text-sm text-gray-600 text-center truncate"
                            title={shareholder.documents?.addressProof?.fileName}
                          >
                            {isUploading(shareholder.id, "addressProof")
                              ? "Uploading..."
                              : shareholder.documents?.addressProof
                                ? truncateFileName(
                                    shareholder.documents.addressProof.fileName,
                                  )
                                : "Upload Document"}
                          </span>
                          <span className="text-xs text-gray-400">
                            PDF, JPG, PNG · Max 10 MB
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) =>
                              handleFileUpload(
                                shareholder.id,
                                "addressProof",
                                e.target.files?.[0] || null,
                              )
                            }
                            className="hidden"
                          />
                        </label>
                        {errors?.[`shareholders.${index}.addressProofFile`] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[`shareholders.${index}.addressProofFile`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> In Step 3, set final ownership to total 100%.
          If nominee is 100%, distribution is locked to nominee.
        </p>
      </div>
    </div>
  );
};
