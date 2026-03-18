import React from "react";
import { Upload, CheckCircle, X } from "lucide-react";
import { Button } from "../../../components/ui/button";

export interface PersonDocument {
  personId: string;
  personName: string;
  files: File[];
}

export interface Step6Data {
  passportDocuments: PersonDocument[];
  selfieDocuments: PersonDocument[];
  addressProofs: PersonDocument[];
}

interface Step6Props {
  data: Step6Data;
  onChange: (data: Partial<Step6Data>) => void;
  shareholdersAndDirectors?: Array<{ id: string; fullName: string }>;
}

export const Step6Documents: React.FC<Step6Props> = ({
  data,
  onChange,
  shareholdersAndDirectors = [],
}) => {
  // Initialize documents for each person
  React.useEffect(() => {
    if (shareholdersAndDirectors.length === 0) return;

    // Get existing person IDs
    const existingPassportIds = data.passportDocuments.map((d) => d.personId);
    const existingSelfieIds = data.selfieDocuments.map((d) => d.personId);
    const existingAddressIds = data.addressProofs.map((d) => d.personId);

    // Only add new people, keep existing ones with their files
    const newPassports = shareholdersAndDirectors
      .filter((person) => !existingPassportIds.includes(person.id))
      .map((person) => ({
        personId: person.id,
        personName: person.fullName,
        files: [],
      }));

    const newSelfies = shareholdersAndDirectors
      .filter((person) => !existingSelfieIds.includes(person.id))
      .map((person) => ({
        personId: person.id,
        personName: person.fullName,
        files: [],
      }));

    const newAddresses = shareholdersAndDirectors
      .filter((person) => !existingAddressIds.includes(person.id))
      .map((person) => ({
        personId: person.id,
        personName: person.fullName,
        files: [],
      }));

    // Only update if there are new people to add
    if (newPassports.length > 0 || newSelfies.length > 0 || newAddresses.length > 0) {
      onChange({
        passportDocuments: [...data.passportDocuments, ...newPassports],
        selfieDocuments: [...data.selfieDocuments, ...newSelfies],
        addressProofs: [...data.addressProofs, ...newAddresses],
      });
    }
  }, [shareholdersAndDirectors.length]);

  const handleFileUpload = (
    field: keyof Step6Data,
    personId: string,
    newFiles: FileList | null
  ) => {
    if (!newFiles || newFiles.length === 0) return;

    const updatedDocs = data[field].map((doc) => {
      if (doc.personId === personId) {
        // Get existing file names to prevent duplicates
        const existingFileNames = doc.files.map((f) => f.name);

        // Filter out files with duplicate names
        const filesToAdd = Array.from(newFiles).filter(
          (file) => !existingFileNames.includes(file.name)
        );

        return { ...doc, files: [...doc.files, ...filesToAdd] };
      }
      return doc;
    });

    onChange({ [field]: updatedDocs });
  };

  const removeFile = (
    field: keyof Step6Data,
    personId: string,
    fileName: string
  ) => {
    const updatedDocs = data[field].map((doc) =>
      doc.personId === personId
        ? { ...doc, files: doc.files.filter((f) => f.name !== fileName) }
        : doc
    );
    onChange({ [field]: updatedDocs });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-[#212833] mb-2">
          Document Upload Checklist
        </h3>
        <p className="text-sm text-gray-600">
          Please upload all required documents for verification
        </p>
      </div>

      {/* Required Documents Section */}
      <div className="p-3 md:p-6 bg-white rounded-xl border border-gray-200">
        <h4 className="text-base font-semibold text-[#212833] mb-6">
          Required Documents for All Shareholders & Directors
        </h4>

        <div className="space-y-8">
          {/* Passport/ID Documents */}
          <div className="space-y-4">
            <h5 className="font-semibold text-[#212833] mb-1">
              Passport/ID for each person
            </h5>
            <p className="text-sm text-gray-600 mb-4">
              Upload clear copies of valid passports or national IDs
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.passportDocuments
                .filter((doc) => doc.personName && doc.personName.trim() !== "")
                .map((doc) => (
                <div key={doc.personId} className="space-y-2">
                  <p className="text-sm font-medium text-[#212833]">
                    {doc.personName || "Person"}
                  </p>

                  {/* Upload Box */}
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-[#f5f7fa] hover:border-[#004eff] transition-colors">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Upload className="w-6 h-6 text-gray-400" />
                        <p className="text-sm font-medium text-[#212833]">
                          Upload Documents
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, JPG, PNG (max 10MB)
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => {
                        handleFileUpload("passportDocuments", doc.personId, e.target.files);
                        e.target.value = "";
                      }}
                      className="hidden"
                    />
                  </label>

                  {/* Uploaded Files Badges */}
                  {doc.files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {doc.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-medium"
                        >
                          <span className="max-w-[150px] truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() =>
                              removeFile("passportDocuments", doc.personId, file.name)
                            }
                            className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Passport Holding Selfie */}
          <div className="space-y-4">
            <h5 className="font-semibold text-[#212833] mb-1">
              Passport holding selfie image
            </h5>
            <p className="text-sm text-gray-600 mb-4">
              Each person holding their passport next to their face
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.selfieDocuments
                .filter((doc) => doc.personName && doc.personName.trim() !== "")
                .map((doc) => (
                <div key={doc.personId} className="space-y-2">
                  <p className="text-sm font-medium text-[#212833]">
                    {doc.personName || "Person"}
                  </p>

                  {/* Upload Box */}
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-[#f5f7fa] hover:border-[#004eff] transition-colors">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Upload className="w-6 h-6 text-gray-400" />
                        <p className="text-sm font-medium text-[#212833]">
                          Upload Documents
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, JPG, PNG (max 10MB)
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => {
                        handleFileUpload("selfieDocuments", doc.personId, e.target.files);
                        e.target.value = "";
                      }}
                      className="hidden"
                    />
                  </label>

                  {/* Uploaded Files Badges */}
                  {doc.files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {doc.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-medium"
                        >
                          <span className="max-w-[150px] truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() =>
                              removeFile("selfieDocuments", doc.personId, file.name)
                            }
                            className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Proof of Address */}
          <div className="space-y-4">
            <h5 className="font-semibold text-[#212833] mb-1">
              Proof of address (Within 3 months)
            </h5>
            <p className="text-sm text-gray-600 mb-4">
              Utility bill, bank statement, or government correspondence
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.addressProofs
                .filter((doc) => doc.personName && doc.personName.trim() !== "")
                .map((doc) => (
                <div key={doc.personId} className="space-y-2">
                  <p className="text-sm font-medium text-[#212833]">
                    {doc.personName || "Person"}
                  </p>

                  {/* Upload Box */}
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-[#f5f7fa] hover:border-[#004eff] transition-colors">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Upload className="w-6 h-6 text-gray-400" />
                        <p className="text-sm font-medium text-[#212833]">
                          Upload Documents
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, JPG, PNG (max 10MB)
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => {
                        handleFileUpload("addressProofs", doc.personId, e.target.files);
                        e.target.value = "";
                      }}
                      className="hidden"
                    />
                  </label>

                  {/* Uploaded Files Badges */}
                  {doc.files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {doc.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-medium"
                        >
                          <span className="max-w-[150px] truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() =>
                              removeFile("addressProofs", doc.personId, file.name)
                            }
                            className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Tips */}
      <div className="p-5 bg-green-50 rounded-xl border border-green-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-[#212833] mb-3">Upload Tips</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Ensure all documents are clear and readable</li>
              <li>Accepted formats: PDF, JPG, PNG</li>
              <li>Maximum file size: 10MB per document</li>
              <li>All documents must be in English or with certified translation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
