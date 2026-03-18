// Country utility functions and mappings

export interface CountryInfo {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  phoneCode: string;
  flag: string;
}

export const countryData: Record<string, CountryInfo> = {
  "hong-kong": {
    code: "hong-kong",
    name: "Hong Kong",
    currency: "HKD",
    currencySymbol: "HK$",
    phoneCode: "+852",
    flag: "🇭🇰",
  },
  singapore: {
    code: "singapore",
    name: "Singapore",
    currency: "SGD",
    currencySymbol: "S$",
    phoneCode: "+65",
    flag: "🇸🇬",
  },
  usa: {
    code: "usa",
    name: "United States",
    currency: "USD",
    currencySymbol: "$",
    phoneCode: "+1",
    flag: "🇺🇸",
  },
  uk: {
    code: "uk",
    name: "United Kingdom",
    currency: "GBP",
    currencySymbol: "£",
    phoneCode: "+44",
    flag: "🇬🇧",
  },
  china: {
    code: "china",
    name: "China",
    currency: "CNY",
    currencySymbol: "¥",
    phoneCode: "+86",
    flag: "🇨🇳",
  },
  india: {
    code: "india",
    name: "India",
    currency: "INR",
    currencySymbol: "₹",
    phoneCode: "+91",
    flag: "🇮🇳",
  },
  japan: {
    code: "japan",
    name: "Japan",
    currency: "JPY",
    currencySymbol: "¥",
    phoneCode: "+81",
    flag: "🇯🇵",
  },
  korea: {
    code: "korea",
    name: "South Korea",
    currency: "KRW",
    currencySymbol: "₩",
    phoneCode: "+82",
    flag: "🇰🇷",
  },
  australia: {
    code: "australia",
    name: "Australia",
    currency: "AUD",
    currencySymbol: "A$",
    phoneCode: "+61",
    flag: "🇦🇺",
  },
  canada: {
    code: "canada",
    name: "Canada",
    currency: "CAD",
    currencySymbol: "C$",
    phoneCode: "+1",
    flag: "🇨🇦",
  },
  bvi: {
    code: "bvi",
    name: "British Virgin Islands",
    currency: "USD",
    currencySymbol: "$",
    phoneCode: "+1284",
    flag: "🇻🇬",
  },
  cayman: {
    code: "cayman",
    name: "Cayman Islands",
    currency: "KYD",
    currencySymbol: "$",
    phoneCode: "+1345",
    flag: "🇰🇾",
  },
  delaware: {
    code: "delaware",
    name: "Delaware, USA",
    currency: "USD",
    currencySymbol: "$",
    phoneCode: "+1",
    flag: "🇺🇸",
  },
  uae: {
    code: "uae",
    name: "United Arab Emirates",
    currency: "AED",
    currencySymbol: "د.إ",
    phoneCode: "+971",
    flag: "🇦🇪",
  },
};

// Get all countries as select options for phone codes
export const getPhoneCodeOptions = () => {
  return Object.values(countryData).map((country) => ({
    value: country.code,
    label: `${country.flag} ${country.phoneCode} (${country.name})`,
    phoneCode: country.phoneCode,
  }));
};

// Get currency for a country
export const getCurrencyForCountry = (countryCode: string): string => {
  return countryData[countryCode]?.currency || "HKD";
};

// Get currency symbol for a country
export const getCurrencySymbolForCountry = (countryCode: string): string => {
  return countryData[countryCode]?.currencySymbol || "HK$";
};

// Get phone code for a country
export const getPhoneCodeForCountry = (countryCode: string): string => {
  return countryData[countryCode]?.phoneCode || "+852";
};

// Get country info
export const getCountryInfo = (
  countryCode: string,
): CountryInfo | undefined => {
  return countryData[countryCode];
};

// Parse phone number into country code and number
export const parsePhoneNumber = (
  phone: string,
  defaultCountry: string = "hong-kong",
): { countryCode: string; phoneNumber: string } => {
  // Try to match phone code at the beginning
  for (const [code, info] of Object.entries(countryData)) {
    if (phone.startsWith(info.phoneCode)) {
      return {
        countryCode: code,
        phoneNumber: phone
          .slice(info.phoneCode.length)
          .replace(/^-/, "")
          .trim(),
      };
    }
  }
  // Return default if no match
  return {
    countryCode: defaultCountry,
    phoneNumber: phone.replace(/^\+\d+-?/, "").trim(),
  };
};

// Format phone number with country code
export const formatPhoneNumber = (
  countryCode: string,
  phoneNumber: string,
): string => {
  const phoneCodeStr = getPhoneCodeForCountry(countryCode);
  const cleanNumber = phoneNumber.replace(/^\+\d+-?/, "").trim();
  return cleanNumber ? `${phoneCodeStr}-${cleanNumber}` : "";
};
