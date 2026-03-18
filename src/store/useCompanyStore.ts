import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// ==================== INTERFACES ====================

export interface ApplicantInterface {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CompanyInterface {
  countryOfIncorporation: string;
  type: string;
  proposedCompanyName: string;
  alternativeNames: string[];
  natureOfBusiness: string[];
  businessScope: string;
  businessScopeDescription: string;
}

export interface ShareCapitalInterface {
  currency: string;
  totalAmount: number;
  totalShares: number;
}

export interface ResidentialAddressInterface {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ShareholdingInterface {
  shares: number;
  percentage: number;
}

export type ShareholderSelection = "own_name" | "nominee";

export interface FileInterface {
  key: string;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
}

export interface DocumentsInterface {
  passport: FileInterface | null;
  selfie: FileInterface | null;
  addressProof: FileInterface | null;
  certificate_of_incorporation: FileInterface | null;
  business_license: FileInterface | null;
  others: FileInterface | null;
}

export type PersonType = "individual" | "corporate";
export type PersonRole = "shareholder" | "director";

export interface PersonInterface {
  id: string;
  type: PersonType;
  roles: PersonRole[];
  shareholderSelection?: ShareholderSelection;
  isNominee: boolean;
  fullName: string;
  // Corporate-specific fields
  companyName: string;
  countryOfIncorporation: string | null;
  registrationNumber: string | null;
  // Individual fields
  nationality: string;
  email: string;
  phone: string;
  residentialAddress: ResidentialAddressInterface;
  shareholding: ShareholdingInterface;
  documents: DocumentsInterface;
}

export interface BankingInterface {
  providers: string[];
  preferredProvider: string;
}

export interface ServicesInterface {
  banking: BankingInterface;
  additionalServices: string[];
}

export interface BillingInterface {
  name: string;
  email: string;
  phone: string;
  address: ResidentialAddressInterface;
  paymentMethod: string;
}

export interface ComplianceAcceptedInterface {
  isAccepted: boolean;
  timestamp: string;
}

export interface FormDataInterface {
  applicant: ApplicantInterface;
  company: CompanyInterface;
  shareCapital: ShareCapitalInterface;
  persons: PersonInterface[]; // ARRAY of persons
  services: ServicesInterface;
  billing: BillingInterface;
  complianceAccepted: ComplianceAcceptedInterface;
}

// ==================== INITIAL VALUES ====================

const createEmptyAddress = (): ResidentialAddressInterface => ({
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
});

const createEmptyDocuments = (): DocumentsInterface => ({
  passport: null,
  selfie: null,
  addressProof: null,
  certificate_of_incorporation: null,
  business_license: null,
  others: null,
});

const createEmptyShareholding = (): ShareholdingInterface => ({
  shares: 0,
  percentage: 0,
});

export const createEmptyPerson = (
  type: PersonType = "individual",
  roles: PersonRole[] = [],
): PersonInterface => ({
  id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  type,
  roles,
  shareholderSelection: "own_name",
  isNominee: false,
  fullName: "",
  companyName: "",
  countryOfIncorporation: null,
  registrationNumber: null,
  nationality: "",
  email: "",
  phone: "",
  residentialAddress: createEmptyAddress(),
  shareholding: createEmptyShareholding(),
  documents: createEmptyDocuments(),
});

const initialFormData: FormDataInterface = {
  applicant: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },

  company: {
    countryOfIncorporation: "hong-kong",
    type: "private_limited_company",
    proposedCompanyName: "",
    alternativeNames: ["", "", ""],
    natureOfBusiness: [],
    businessScope: "",
    businessScopeDescription: "",
  },

  shareCapital: {
    currency: "HKD",
    totalAmount: 10000,
    totalShares: 10000,
  },

  persons: [],

  services: {
    banking: {
      providers: [],
      preferredProvider: "",
    },
    additionalServices: [],
  },

  billing: {
    name: "",
    email: "",
    phone: "",
    address: createEmptyAddress(),
    paymentMethod: "",
  },
  
  complianceAccepted: {
    isAccepted: false,
    timestamp: "",
  },
};

// ==================== STORE INTERFACE ====================

interface CompanyStoreState {
  currentStep: number;
  formData: FormDataInterface;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  stepErrors: Record<string, string>;

  // Navigation
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Step 1 - Applicant
  updateApplicant: (data: Partial<ApplicantInterface>) => void;

  // Step 1 - Company (combined with applicant in step 1)
  updateCompany: (data: Partial<CompanyInterface>) => void;

  // Step 2 - Share Capital
  updateShareCapital: (data: Partial<ShareCapitalInterface>) => void;

  // Step 2 - Add Shareholder (creates new person with shareholder role)
  addShareholder: (
    fullName: string,
    shares: number,
    percentage: number,
    type?: PersonType,
  ) => string; // Returns the new person's ID

  // Step 2 - Update shareholder distribution
  updateShareholderDistribution: (
    personId: string,
    shares: number,
    percentage: number,
  ) => void;

  // Step 2 - Remove shareholder
  removeShareholder: (personId: string) => void;

  // Step 3 - Update existing person (shareholder details)
  updatePerson: (personId: string, data: Partial<PersonInterface>) => void;

  // Step 3 - Update person documents
  updatePersonDocuments: (
    personId: string,
    documents: Partial<DocumentsInterface>,
  ) => void;

  // Step 4 - Add director role to existing person
  addDirectorRole: (personId: string) => void;

  // Step 4 - Remove director role from person
  removeDirectorRole: (personId: string) => void;

  // Step 4 - Add new director (creates new person with director role)
  addNewDirector: (data: Partial<PersonInterface>) => string;

  // Step 4 - Remove person entirely (if only has one role)
  removePerson: (personId: string) => void;

  // Step 5 - Services
  updateServices: (data: Partial<ServicesInterface>) => void;
  updateBanking: (data: Partial<BankingInterface>) => void;

  // Step 6 - Billing
  updateBilling: (data: Partial<BillingInterface>) => void;

  // Step 7 - Compliance
  acceptCompliance: (isAccepted: boolean | "indeterminate") => void;

  // Generic update for backward compatibility
  updateFormData: <K extends keyof FormDataInterface>(
    key: K,
    data: Partial<FormDataInterface[K]>,
  ) => void;

  // Validation & Submission
  validateStep: (step: number) => boolean;
  clearStepErrors: () => void;
  submitApplication: () => Promise<void>;
  resetForm: () => void;

  // Utility getters
  getShareholders: () => PersonInterface[];
  getDirectors: () => PersonInterface[];
  getPersonById: (id: string) => PersonInterface | undefined;
}

// ==================== STORE IMPLEMENTATION ====================

export const useCompanyStore = create<CompanyStoreState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      formData: initialFormData,
      isLoading: false,
      isSuccess: false,
      error: null,
      stepErrors: {},

      // ==================== NAVIGATION ====================

      setStep: (step) => set({ currentStep: step }),

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < 7) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      // ==================== STEP 1: APPLICANT ====================

      updateApplicant: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            applicant: { ...state.formData.applicant, ...data },
          },
          stepErrors: {},
        })),

      // ==================== STEP 1: COMPANY ====================

      updateCompany: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            company: { ...state.formData.company, ...data },
          },
          stepErrors: {},
        })),

      // ==================== STEP 2: SHARE CAPITAL ====================

      updateShareCapital: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            shareCapital: { ...state.formData.shareCapital, ...data },
          },
          stepErrors: {},
        })),

      addShareholder: (fullName, shares, percentage, type = "individual") => {
        const newPerson = createEmptyPerson(type, ["shareholder"]);
        newPerson.fullName = fullName;
        newPerson.shareholding = { shares, percentage };

        set((state) => ({
          formData: {
            ...state.formData,
            persons: [...state.formData.persons, newPerson],
          },
          stepErrors: {},
        }));

        return newPerson.id;
      },

      updateShareholderDistribution: (personId, shares, percentage) =>
        set((state) => ({
          formData: {
            ...state.formData,
            persons: state.formData.persons.map((person) =>
              person.id === personId
                ? {
                    ...person,
                    shareholding: { shares, percentage },
                  }
                : person,
            ),
          },
          stepErrors: {},
        })),

      removeShareholder: (personId) =>
        set((state) => {
          const person = state.formData.persons.find((p) => p.id === personId);
          if (!person) return state;

          // If person is only a shareholder, remove entirely
          if (
            person.roles.length === 1 &&
            person.roles.includes("shareholder")
          ) {
            return {
              formData: {
                ...state.formData,
                persons: state.formData.persons.filter(
                  (p) => p.id !== personId,
                ),
              },
              stepErrors: {},
            };
          }

          // If person has multiple roles, just remove shareholder role
          return {
            formData: {
              ...state.formData,
              persons: state.formData.persons.map((p) =>
                p.id === personId
                  ? {
                      ...p,
                      roles: p.roles.filter((r) => r !== "shareholder"),
                      shareholding: createEmptyShareholding(),
                    }
                  : p,
              ),
            },
            stepErrors: {},
          };
        }),

      // ==================== STEP 3: PERSON DETAILS ====================

      updatePerson: (personId, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            persons: state.formData.persons.map((person) =>
              person.id === personId
                ? {
                    ...person,
                    ...data,
                    isNominee:
                      typeof data.isNominee === "boolean"
                        ? data.isNominee
                        : data.shareholderSelection
                          ? data.shareholderSelection === "nominee"
                          : person.isNominee,
                    // Preserve nested objects if not provided in data
                    residentialAddress: data.residentialAddress
                      ? {
                          ...person.residentialAddress,
                          ...data.residentialAddress,
                        }
                      : person.residentialAddress,
                    shareholding: data.shareholding
                      ? { ...person.shareholding, ...data.shareholding }
                      : person.shareholding,
                    documents: data.documents
                      ? { ...person.documents, ...data.documents }
                      : person.documents,
                  }
                : person,
            ),
          },
          stepErrors: {},
        })),

      updatePersonDocuments: (personId, documents) =>
        set((state) => ({
          formData: {
            ...state.formData,
            persons: state.formData.persons.map((person) =>
              person.id === personId
                ? {
                    ...person,
                    documents: { ...person.documents, ...documents },
                  }
                : person,
            ),
          },
          stepErrors: {},
        })),

      // ==================== STEP 4: DIRECTORS ====================

      addDirectorRole: (personId) =>
        set((state) => ({
          formData: {
            ...state.formData,
            persons: state.formData.persons.map((person) =>
              person.id === personId && !person.roles.includes("director")
                ? { ...person, roles: [...person.roles, "director"] }
                : person,
            ),
          },
          stepErrors: {},
        })),

      removeDirectorRole: (personId) =>
        set((state) => {
          const person = state.formData.persons.find((p) => p.id === personId);
          if (!person) return state;

          // If person is only a director, remove entirely
          if (person.roles.length === 1 && person.roles.includes("director")) {
            return {
              formData: {
                ...state.formData,
                persons: state.formData.persons.filter(
                  (p) => p.id !== personId,
                ),
              },
              stepErrors: {},
            };
          }

          // If person has multiple roles, just remove director role
          return {
            formData: {
              ...state.formData,
              persons: state.formData.persons.map((p) =>
                p.id === personId
                  ? { ...p, roles: p.roles.filter((r) => r !== "director") }
                  : p,
              ),
            },
            stepErrors: {},
          };
        }),

      addNewDirector: (data) => {
        const newPerson = createEmptyPerson("individual", ["director"]);
        Object.assign(newPerson, data);

        set((state) => ({
          formData: {
            ...state.formData,
            persons: [...state.formData.persons, newPerson],
          },
          stepErrors: {},
        }));

        return newPerson.id;
      },

      removePerson: (personId) =>
        set((state) => ({
          formData: {
            ...state.formData,
            persons: state.formData.persons.filter((p) => p.id !== personId),
          },
          stepErrors: {},
        })),

      // ==================== STEP 5: SERVICES ====================

      updateServices: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            services: {
              ...state.formData.services,
              ...data,
              banking: data.banking
                ? { ...state.formData.services.banking, ...data.banking }
                : state.formData.services.banking,
            },
          },
          stepErrors: {},
        })),

      updateBanking: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            services: {
              ...state.formData.services,
              banking: { ...state.formData.services.banking, ...data },
            },
          },
          stepErrors: {},
        })),

      // ==================== STEP 6: BILLING ====================

      updateBilling: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            billing: {
              ...state.formData.billing,
              ...data,
              address: data.address
                ? { ...state.formData.billing.address, ...data.address }
                : state.formData.billing.address,
            },
          },
          stepErrors: {},
        })),

      // ==================== STEP 7: COMPLIANCE ====================

      acceptCompliance: (isAccepted) =>
        set((state) => ({
          formData: {
            ...state.formData,
            complianceAccepted: {
              isAccepted: isAccepted === true,
              timestamp: new Date().toISOString(),
            },
          },
          stepErrors: {},
        })),

      // ==================== GENERIC UPDATE ====================

      updateFormData: (key, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [key]: { ...state.formData[key], ...data },
          },
          stepErrors: {},
        })),

      // ==================== VALIDATION ====================

      validateStep: (step: number) => {
        const { formData } = get();
        const errors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        switch (step) {
          case 1: {
            // Validate Applicant
            const a = formData.applicant;
            if (!a.firstName.trim())
              errors.firstName = "First name is required";
            if (!a.lastName.trim()) errors.lastName = "Last name is required";
            if (!a.email.trim()) errors.email = "Email is required";
            else if (!emailRegex.test(a.email))
              errors.email = "Invalid email format";
            if (!a.phone.trim()) errors.phone = "Phone number is required";

            // Validate Company
            const c = formData.company;
            if (!c.type?.trim())
              errors.companyType = "Company type is required";
            if (!c.proposedCompanyName.trim())
              errors.proposedCompanyName = "Company name is required";
            if (!c.alternativeNames[0]?.trim())
              errors.alternativeName1 = "Alternative name 1 is required";
            if (!c.alternativeNames[1]?.trim())
              errors.alternativeName2 = "Alternative name 2 is required";
            if (!c.alternativeNames[2]?.trim())
              errors.alternativeName3 = "Alternative name 3 is required";
            if (c.natureOfBusiness.length === 0)
              errors.natureOfBusiness = "Select at least one business type";
            if (!c.businessScope)
              errors.businessScope = "Business scope is required";
            if (!c.businessScopeDescription.trim())
              errors.businessScopeDescription = "Description is required";
            else if (c.businessScopeDescription.trim().length < 50)
              errors.businessScopeDescription =
                "Description must be at least 50 characters";
            break;
          }

          case 2: {
            // Validate Shareholder Details
            const shareholders = formData.persons.filter((p) =>
              p.roles.includes("shareholder"),
            );

            if (shareholders.length === 0) {
              errors.shareholders = "At least one shareholder is required";
              break;
            }

            shareholders.forEach((s, i) => {
              const isNominee =
                s.isNominee || s.shareholderSelection === "nominee";
              const nomineePercentage = s.shareholding?.percentage || 0;

              if (isNominee) {
                if (nomineePercentage <= 0 || nomineePercentage > 100) {
                  errors[`shareholders.${i}.nomineePercentage`] =
                    "Nominee share percentage must be between 0 and 100";
                }
                return;
              }

              if (!s.fullName?.trim())
                errors[`shareholders.${i}.fullName`] = "Full name is required";
              if (!s.nationality)
                errors[`shareholders.${i}.nationality`] =
                  "Nationality is required";
              if (!s.email?.trim())
                errors[`shareholders.${i}.email`] = "Email is required";
              else if (!emailRegex.test(s.email))
                errors[`shareholders.${i}.email`] = "Invalid email format";
              if (!s.phone?.trim())
                errors[`shareholders.${i}.phone`] = "Phone is required";
              // Residential address validation
              if (!s.residentialAddress?.street?.trim())
                errors[`shareholders.${i}.residentialAddress`] =
                  "Street address is required";
              if (!s.residentialAddress?.city?.trim())
                errors[`shareholders.${i}.residentialAddress.city`] =
                  "City is required";
              if (!s.residentialAddress?.postalCode?.trim())
                errors[`shareholders.${i}.residentialAddress.postalCode`] =
                  "Postal code is required";
              if (!s.residentialAddress?.country)
                errors[`shareholders.${i}.residentialAddress.country`] =
                  "Country is required";
              if (!s.documents?.passport)
                errors[`shareholders.${i}.passportFile`] =
                  "Passport upload is required";
              if (!s.documents?.selfie)
                errors[`shareholders.${i}.selfieFile`] =
                  "Selfie upload is required";
              if (!s.documents?.addressProof)
                errors[`shareholders.${i}.addressProofFile`] =
                  "Address proof is required";

              // Corporate-specific validation
              if (s.type === "corporate") {
                if (!s.companyName?.trim())
                  errors[`shareholders.${i}.companyName`] =
                    "Company name is required";
                if (!s.countryOfIncorporation)
                  errors[`shareholders.${i}.countryOfIncorporation`] =
                    "Country of incorporation is required";
                if (!s.registrationNumber?.trim())
                  errors[`shareholders.${i}.registrationNumber`] =
                    "Registration number is required";
                if (!s.documents?.certificate_of_incorporation)
                  errors[`shareholders.${i}.certificateFile`] =
                    "Certificate of incorporation is required";
                if (!s.documents?.business_license)
                  errors[`shareholders.${i}.businessLicenseFile`] =
                    "Business license is required";
              }
            });

            // Step 2 gate: total ownership must already be 100% before proceeding
            const totalPercentage = shareholders.reduce(
              (sum, s) => sum + (s.shareholding?.percentage || 0),
              0,
            );

            const missingPercentage = shareholders.some(
              (s) => (s.shareholding?.percentage || 0) <= 0,
            );

            if (missingPercentage) {
              errors.shareDistribution =
                "All shareholders must have an ownership percentage greater than 0";
            } else if (totalPercentage > 100) {
              errors.shareDistribution = `Total ownership (${totalPercentage.toFixed(2)}%) exceeds 100%. Please reduce allocation.`;
            } else if (totalPercentage < 100) {
              const remaining = (100 - totalPercentage).toFixed(2);
              errors.shareDistribution = `Share ownership must total exactly 100%. You have ${remaining}% remaining to allocate.`;
            }
            break;
          }

          case 3: {
            // Validate Share Capital
            const sc = formData.shareCapital;
            if (!sc.totalAmount || sc.totalAmount <= 0)
              errors.shareCapitalAmount = "Enter a valid share capital amount";
            if (!sc.totalShares || sc.totalShares <= 0)
              errors.totalShares = "Enter a valid number of shares";

            // Validate Shareholders
            const shareholders = formData.persons.filter((p) =>
              p.roles.includes("shareholder"),
            );

            if (shareholders.length === 0) {
              errors.shareDistribution = "Add at least one shareholder";
            } else {
              const totalPercentage = shareholders.reduce(
                (sum, s) => sum + (s.shareholding?.percentage || 0),
                0,
              );

              const incomplete = shareholders.some(
                (s) =>
                  (!(s.isNominee || s.shareholderSelection === "nominee") &&
                    !s.fullName?.trim()) ||
                  (s.shareholding?.percentage || 0) <= 0,
              );

              if (incomplete) {
                errors.shareDistribution =
                  "All shareholders must have a name and ownership percentage";
              } else if (totalPercentage > 100) {
                errors.shareDistribution = `Total ownership (${totalPercentage.toFixed(2)}%) exceeds 100%. Please reduce allocation.`;
              } else if (totalPercentage < 100) {
                const remaining = (100 - totalPercentage).toFixed(2);
                errors.shareDistribution = `Share ownership must total exactly 100%. You have ${remaining}% remaining to allocate.`;
              }
            }
            break;
          }

          case 4: {
            // Validate Directors
            const directors = formData.persons.filter((p) =>
              p.roles.includes("director"),
            );

            if (directors.length === 0) {
              errors.directors = "At least one director is required";
              break;
            }

            directors.forEach((dir, i) => {
              const isNomineeDirector =
                dir.isNominee || dir.shareholderSelection === "nominee";
              if (isNomineeDirector) {
                return;
              }

              // Corporate-specific validation
              if (dir.type === "corporate") {
                if (!dir.companyName?.trim())
                  errors[`directors.${i}.companyName`] =
                    "Company name is required";
                if (!dir.countryOfIncorporation)
                  errors[`directors.${i}.countryOfIncorporation`] =
                    "Country of incorporation is required";
                if (!dir.registrationNumber?.trim())
                  errors[`directors.${i}.registrationNumber`] =
                    "Registration number is required";
                if (!dir.documents?.certificate_of_incorporation)
                  errors[`directors.${i}.certificateFile`] =
                    "Certificate of incorporation is required";
                if (!dir.documents?.business_license)
                  errors[`directors.${i}.businessLicenseFile`] =
                    "Business license is required";
              }

              // Individual fields validation (always required)
              if (!dir.fullName?.trim())
                errors[`directors.${i}.fullName`] = "Full name is required";
              if (!dir.nationality)
                errors[`directors.${i}.nationality`] =
                  "Nationality is required";
              if (!dir.email?.trim())
                errors[`directors.${i}.email`] = "Email is required";
              else if (!emailRegex.test(dir.email))
                errors[`directors.${i}.email`] = "Invalid email format";
              if (!dir.phone?.trim())
                errors[`directors.${i}.phone`] = "Phone is required";
              // Residential address validation
              if (!dir.residentialAddress?.street?.trim())
                errors[`directors.${i}.residentialAddress`] =
                  "Street address is required";
              if (!dir.residentialAddress?.city?.trim())
                errors[`directors.${i}.residentialAddress.city`] =
                  "City is required";
              if (!dir.residentialAddress?.postalCode?.trim())
                errors[`directors.${i}.residentialAddress.postalCode`] =
                  "Postal code is required";
              if (!dir.residentialAddress?.country)
                errors[`directors.${i}.residentialAddress.country`] =
                  "Country is required";
              if (!dir.documents?.passport)
                errors[`directors.${i}.passportFile`] =
                  "Passport upload is required";
              if (!dir.documents?.selfie)
                errors[`directors.${i}.selfieFile`] =
                  "Selfie upload is required";
              if (!dir.documents?.addressProof)
                errors[`directors.${i}.addressProofFile`] =
                  "Address proof is required";
            });
            break;
          }

          case 5: {
            // Services step - preferred provider is required if banking is selected
            const bankingProviders = formData.services.banking.providers.filter(
              (id) => id !== "no_bank_account",
            );
            const preferredProvider = formData.services.banking.preferredProvider;

            if (
              bankingProviders.length > 1 &&
              !preferredProvider
            ) {
              errors.bankingPreferredProvider =
                "Please select at least one preferred bank/provider.";
            } else if (
              bankingProviders.length > 1 &&
              preferredProvider &&
              !bankingProviders.includes(preferredProvider)
            ) {
              errors.bankingPreferredProvider =
                "Preferred provider must be one of the selected banking services.";
            }
            break;
          }

          case 6: {
            // Validate Billing
            const b = formData.billing;
            if (!b.name.trim()) errors.billingName = "Billing name is required";
            if (!b.email.trim()) errors.billingEmail = "Email is required";
            else if (!emailRegex.test(b.email))
              errors.billingEmail = "Invalid email format";
            if (!b.phone.trim()) errors.billingPhone = "Phone is required";
            // Billing address validation
            if (!b.address?.street?.trim())
              errors.billingAddress = "Billing street address is required";
            if (!b.address?.city?.trim())
              errors.billingCity = "City is required";
            if (!b.address?.postalCode?.trim())
              errors.billingPostalCode = "Postal code is required";
            if (!b.address?.country)
              errors.billingCountry = "Country is required";
            if (!b.paymentMethod)
              errors.paymentMethod = "Payment method is required";
            break;
          }

          case 7: {
            // Validate Compliance
            if (!formData.complianceAccepted.isAccepted)
              errors.complianceAccepted =
                "You must accept the compliance declaration";
            break;
          }
        }

        set({ stepErrors: errors });
        return Object.keys(errors).length === 0;
      },

      clearStepErrors: () => set({ stepErrors: {} }),

      // ==================== SUBMISSION ====================

      submitApplication: async () => {
        const { formData } = get();
        set({ isLoading: true, error: null });

        // Internal country code → ISO 3166-1 alpha-2
        const ISO: Record<string, string> = {
          "hong-kong": "HK", singapore: "SG", usa: "US",
          uk: "GB", uae: "AE", china: "CN", india: "IN",
          japan: "JP", korea: "KR", australia: "AU",
          canada: "CA", bvi: "VG", cayman: "KY", delaware: "US",
        };
        const iso = (code: string) => ISO[code] ?? code;

        // "+852-12345678" → E.164 "+85212345678"
        const e164 = (phone: string) => phone.replace(/^(\+\d+)-/, "$1");

        const payload = {
          applicant: formData.applicant,
          company: {
            ...formData.company,
            countryOfIncorporation: iso(formData.company.countryOfIncorporation),
            alternativeNames: formData.company.alternativeNames.filter((n) => n.trim()),
          },
          shareCapital: formData.shareCapital,
          persons: formData.persons.map((p) => {
            const isShareholder = p.roles.includes("shareholder");
            if (p.type === "individual") {
              return {
                type: p.type,
                roles: p.roles,
                isNominee: !!p.isNominee,
                fullName: p.fullName,
                nationality: iso(p.nationality),
                email: p.email,
                phone: p.phone,
                residentialAddress: {
                  ...p.residentialAddress,
                  country: iso(p.residentialAddress.country),
                },
                companyName: null,
                countryOfIncorporation: null,
                registrationNumber: null,
                shareholding: isShareholder ? p.shareholding : null,
                documents: p.documents,
              };
            }
            // corporate
            return {
              type: p.type,
              roles: p.roles,
              isNominee: !!p.isNominee,
              fullName: null,
              nationality: null,
              email: null,
              phone: null,
              residentialAddress: null,
              companyName: p.companyName,
              countryOfIncorporation: iso(p.countryOfIncorporation ?? ""),
              registrationNumber: p.registrationNumber,
              shareholding: isShareholder ? p.shareholding : null,
              documents: p.documents,
            };
          }),
          services: {
            banking: {
              providers: formData.services.banking.providers,
              preferredProvider: formData.services.banking.preferredProvider || null,
            },
            additionalServices: formData.services.additionalServices,
          },
          billing: {
            ...formData.billing,
            phone: e164(formData.billing.phone),
            address: {
              ...formData.billing.address,
              country: iso(formData.billing.address.country),
            },
          },
          complianceAccepted: formData.complianceAccepted,
        };

        try {
          const response = await fetch(
            `${API_BASE}/api/v1/registrations`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            },
          );

          if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(
              data?.error ?? `Request failed: ${response.status}`,
            );
          }

          set({
            isSuccess: true,
            isLoading: false,
            currentStep: 1,
            formData: initialFormData,
            stepErrors: {},
          });
        } catch (err: any) {
          set({
            error: err.message || "Something went wrong",
            isLoading: false,
          });
        }
      },

      resetForm: () =>
        set({
          currentStep: 1,
          formData: initialFormData,
          isSuccess: false,
          error: null,
          stepErrors: {},
        }),

      // ==================== UTILITY GETTERS ====================

      getShareholders: () =>
        get().formData.persons.filter((p) => p.roles.includes("shareholder")),

      getDirectors: () =>
        get().formData.persons.filter((p) => p.roles.includes("director")),

      getPersonById: (id) => get().formData.persons.find((p) => p.id === id),
    }),
    {
      name: "company-formation-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: state.formData,
      }),
      // Deep merge persisted state with initial state to handle schema changes
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<CompanyStoreState>;
        return {
          ...currentState,
          currentStep: persisted.currentStep ?? currentState.currentStep,
          formData: {
            ...currentState.formData,
            ...persisted.formData,
            applicant: {
              ...currentState.formData.applicant,
              ...persisted.formData?.applicant,
            },
            company: {
              ...currentState.formData.company,
              ...persisted.formData?.company,
            },
            shareCapital: {
              ...currentState.formData.shareCapital,
              ...persisted.formData?.shareCapital,
            },
            persons:
              (persisted.formData?.persons ?? currentState.formData.persons).map(
                (person) => ({
                  ...person,
                  isNominee:
                    typeof person.isNominee === "boolean"
                      ? person.isNominee
                      : person.shareholderSelection === "nominee",
                }),
              ),
            services: {
              ...currentState.formData.services,
              ...persisted.formData?.services,
              banking: {
                ...currentState.formData.services.banking,
                ...persisted.formData?.services?.banking,
              },
            },
            billing: {
              ...currentState.formData.billing,
              ...persisted.formData?.billing,
              address: {
                ...currentState.formData.billing.address,
                ...persisted.formData?.billing?.address,
              },
            },
            complianceAccepted: {
              ...currentState.formData.complianceAccepted,
              ...persisted.formData?.complianceAccepted,
            },
          },
        };
      },
    },
  ),
);

// ==================== HELPER HOOKS ====================

// Custom hook to get shareholders
export const useShareholders = () => {
  return useCompanyStore(
    useShallow((state) =>
      state.formData.persons.filter((p) => p.roles.includes("shareholder")),
    ),
  );
};

// Custom hook to get directors
export const useDirectors = () => {
  return useCompanyStore(
    useShallow((state) =>
      state.formData.persons.filter((p) => p.roles.includes("director")),
    ),
  );
};

// Custom hook to check if person is both shareholder and director
export const usePersonRoles = (personId: string) => {
  return useCompanyStore(
    useShallow((state) => {
      const person = state.formData.persons.find((p) => p.id === personId);
      return {
        isShareholder: person?.roles.includes("shareholder") ?? false,
        isDirector: person?.roles.includes("director") ?? false,
      };
    }),
  );
};
