// Country utility functions and mappings

export interface CountryInfo {
  code: string;
  iso: string;
  name: string;
  currency: string;
  currencySymbol: string;
  phoneCode: string;
  flag: string;
}

export const countryData: Record<string, CountryInfo> = {
  "hong-kong": { code: "hong-kong", iso: "HK", name: "Hong Kong", currency: "HKD", currencySymbol: "HK$", phoneCode: "+852", flag: "🇭🇰" },
  singapore: { code: "singapore", iso: "SG", name: "Singapore", currency: "SGD", currencySymbol: "S$", phoneCode: "+65", flag: "🇸🇬" },
  usa: { code: "usa", iso: "US", name: "United States", currency: "USD", currencySymbol: "$", phoneCode: "+1", flag: "🇺🇸" },
  uk: { code: "uk", iso: "GB", name: "United Kingdom", currency: "GBP", currencySymbol: "£", phoneCode: "+44", flag: "🇬🇧" },
  uae: { code: "uae", iso: "AE", name: "United Arab Emirates", currency: "AED", currencySymbol: "د.إ", phoneCode: "+971", flag: "🇦🇪" },
  china: { code: "china", iso: "CN", name: "China", currency: "CNY", currencySymbol: "¥", phoneCode: "+86", flag: "🇨🇳" },
  india: { code: "india", iso: "IN", name: "India", currency: "INR", currencySymbol: "₹", phoneCode: "+91", flag: "🇮🇳" },
  japan: { code: "japan", iso: "JP", name: "Japan", currency: "JPY", currencySymbol: "¥", phoneCode: "+81", flag: "🇯🇵" },
  korea: { code: "korea", iso: "KR", name: "South Korea", currency: "KRW", currencySymbol: "₩", phoneCode: "+82", flag: "🇰🇷" },
  australia: { code: "australia", iso: "AU", name: "Australia", currency: "AUD", currencySymbol: "A$", phoneCode: "+61", flag: "🇦🇺" },
  canada: { code: "canada", iso: "CA", name: "Canada", currency: "CAD", currencySymbol: "C$", phoneCode: "+1", flag: "🇨🇦" },
  bvi: { code: "bvi", iso: "VG", name: "British Virgin Islands", currency: "USD", currencySymbol: "$", phoneCode: "+1284", flag: "🇻🇬" },
  cayman: { code: "cayman", iso: "KY", name: "Cayman Islands", currency: "KYD", currencySymbol: "$", phoneCode: "+1345", flag: "🇰🇾" },
  delaware: { code: "delaware", iso: "US", name: "Delaware, USA", currency: "USD", currencySymbol: "$", phoneCode: "+1", flag: "🇺🇸" },
  afghanistan: { code: "afghanistan", iso: "AF", name: "Afghanistan", currency: "AFN", currencySymbol: "؋", phoneCode: "+93", flag: "🇦🇫" },
  albania: { code: "albania", iso: "AL", name: "Albania", currency: "ALL", currencySymbol: "L", phoneCode: "+355", flag: "🇦🇱" },
  algeria: { code: "algeria", iso: "DZ", name: "Algeria", currency: "DZD", currencySymbol: "دج", phoneCode: "+213", flag: "🇩🇿" },
  andorra: { code: "andorra", iso: "AD", name: "Andorra", currency: "EUR", currencySymbol: "€", phoneCode: "+376", flag: "🇦🇩" },
  angola: { code: "angola", iso: "AO", name: "Angola", currency: "AOA", currencySymbol: "Kz", phoneCode: "+244", flag: "🇦🇴" },
  "antigua-and-barbuda": { code: "antigua-and-barbuda", iso: "AG", name: "Antigua and Barbuda", currency: "XCD", currencySymbol: "$", phoneCode: "+1268", flag: "🇦🇬" },
  argentina: { code: "argentina", iso: "AR", name: "Argentina", currency: "ARS", currencySymbol: "$", phoneCode: "+54", flag: "🇦🇷" },
  armenia: { code: "armenia", iso: "AM", name: "Armenia", currency: "AMD", currencySymbol: "֏", phoneCode: "+374", flag: "🇦🇲" },
  austria: { code: "austria", iso: "AT", name: "Austria", currency: "EUR", currencySymbol: "€", phoneCode: "+43", flag: "🇦🇹" },
  azerbaijan: { code: "azerbaijan", iso: "AZ", name: "Azerbaijan", currency: "AZN", currencySymbol: "₼", phoneCode: "+994", flag: "🇦🇿" },
  bahamas: { code: "bahamas", iso: "BS", name: "Bahamas", currency: "BSD", currencySymbol: "$", phoneCode: "+1242", flag: "🇧🇸" },
  bahrain: { code: "bahrain", iso: "BH", name: "Bahrain", currency: "BHD", currencySymbol: ".د.ب", phoneCode: "+973", flag: "🇧🇭" },
  bangladesh: { code: "bangladesh", iso: "BD", name: "Bangladesh", currency: "BDT", currencySymbol: "৳", phoneCode: "+880", flag: "🇧🇩" },
  barbados: { code: "barbados", iso: "BB", name: "Barbados", currency: "BBD", currencySymbol: "$", phoneCode: "+1246", flag: "🇧🇧" },
  belarus: { code: "belarus", iso: "BY", name: "Belarus", currency: "BYN", currencySymbol: "Br", phoneCode: "+375", flag: "🇧🇾" },
  belgium: { code: "belgium", iso: "BE", name: "Belgium", currency: "EUR", currencySymbol: "€", phoneCode: "+32", flag: "🇧🇪" },
  belize: { code: "belize", iso: "BZ", name: "Belize", currency: "BZD", currencySymbol: "$", phoneCode: "+501", flag: "🇧🇿" },
  benin: { code: "benin", iso: "BJ", name: "Benin", currency: "XOF", currencySymbol: "Fr", phoneCode: "+229", flag: "🇧🇯" },
  bhutan: { code: "bhutan", iso: "BT", name: "Bhutan", currency: "BTN", currencySymbol: "Nu", phoneCode: "+975", flag: "🇧🇹" },
  bolivia: { code: "bolivia", iso: "BO", name: "Bolivia", currency: "BOB", currencySymbol: "Bs.", phoneCode: "+591", flag: "🇧🇴" },
  "bosnia-and-herzegovina": { code: "bosnia-and-herzegovina", iso: "BA", name: "Bosnia and Herzegovina", currency: "BAM", currencySymbol: "KM", phoneCode: "+387", flag: "🇧🇦" },
  botswana: { code: "botswana", iso: "BW", name: "Botswana", currency: "BWP", currencySymbol: "P", phoneCode: "+267", flag: "🇧🇼" },
  brazil: { code: "brazil", iso: "BR", name: "Brazil", currency: "BRL", currencySymbol: "R$", phoneCode: "+55", flag: "🇧🇷" },
  brunei: { code: "brunei", iso: "BN", name: "Brunei", currency: "BND", currencySymbol: "$", phoneCode: "+673", flag: "🇧🇳" },
  bulgaria: { code: "bulgaria", iso: "BG", name: "Bulgaria", currency: "BGN", currencySymbol: "лв", phoneCode: "+359", flag: "🇧🇬" },
  "burkina-faso": { code: "burkina-faso", iso: "BF", name: "Burkina Faso", currency: "XOF", currencySymbol: "Fr", phoneCode: "+226", flag: "🇧🇫" },
  burundi: { code: "burundi", iso: "BI", name: "Burundi", currency: "BIF", currencySymbol: "Fr", phoneCode: "+257", flag: "🇧🇮" },
  "cabo-verde": { code: "cabo-verde", iso: "CV", name: "Cabo Verde", currency: "CVE", currencySymbol: "$", phoneCode: "+238", flag: "🇨🇻" },
  cambodia: { code: "cambodia", iso: "KH", name: "Cambodia", currency: "KHR", currencySymbol: "៛", phoneCode: "+855", flag: "🇰🇭" },
  cameroon: { code: "cameroon", iso: "CM", name: "Cameroon", currency: "XAF", currencySymbol: "Fr", phoneCode: "+237", flag: "🇨🇲" },
  "central-african-republic": { code: "central-african-republic", iso: "CF", name: "Central African Republic", currency: "XAF", currencySymbol: "Fr", phoneCode: "+236", flag: "🇨🇫" },
  chad: { code: "chad", iso: "TD", name: "Chad", currency: "XAF", currencySymbol: "Fr", phoneCode: "+235", flag: "🇹🇩" },
  chile: { code: "chile", iso: "CL", name: "Chile", currency: "CLP", currencySymbol: "$", phoneCode: "+56", flag: "🇨🇱" },
  colombia: { code: "colombia", iso: "CO", name: "Colombia", currency: "COP", currencySymbol: "$", phoneCode: "+57", flag: "🇨🇴" },
  comoros: { code: "comoros", iso: "KM", name: "Comoros", currency: "KMF", currencySymbol: "Fr", phoneCode: "+269", flag: "🇰🇲" },
  "congo-brazzaville": { code: "congo-brazzaville", iso: "CG", name: "Congo (Brazzaville)", currency: "XAF", currencySymbol: "Fr", phoneCode: "+242", flag: "🇨🇬" },
  "congo-kinshasa": { code: "congo-kinshasa", iso: "CD", name: "Congo (Kinshasa)", currency: "CDF", currencySymbol: "Fr", phoneCode: "+243", flag: "🇨🇩" },
  "costa-rica": { code: "costa-rica", iso: "CR", name: "Costa Rica", currency: "CRC", currencySymbol: "₡", phoneCode: "+506", flag: "🇨🇷" },
  croatia: { code: "croatia", iso: "HR", name: "Croatia", currency: "EUR", currencySymbol: "€", phoneCode: "+385", flag: "🇭🇷" },
  cuba: { code: "cuba", iso: "CU", name: "Cuba", currency: "CUP", currencySymbol: "$", phoneCode: "+53", flag: "🇨🇺" },
  cyprus: { code: "cyprus", iso: "CY", name: "Cyprus", currency: "EUR", currencySymbol: "€", phoneCode: "+357", flag: "🇨🇾" },
  czechia: { code: "czechia", iso: "CZ", name: "Czechia", currency: "CZK", currencySymbol: "Kč", phoneCode: "+420", flag: "🇨🇿" },
  denmark: { code: "denmark", iso: "DK", name: "Denmark", currency: "DKK", currencySymbol: "kr", phoneCode: "+45", flag: "🇩🇰" },
  djibouti: { code: "djibouti", iso: "DJ", name: "Djibouti", currency: "DJF", currencySymbol: "Fr", phoneCode: "+253", flag: "🇩🇯" },
  dominica: { code: "dominica", iso: "DM", name: "Dominica", currency: "XCD", currencySymbol: "$", phoneCode: "+1767", flag: "🇩🇲" },
  "dominican-republic": { code: "dominican-republic", iso: "DO", name: "Dominican Republic", currency: "DOP", currencySymbol: "$", phoneCode: "+1809", flag: "🇩🇴" },
  ecuador: { code: "ecuador", iso: "EC", name: "Ecuador", currency: "USD", currencySymbol: "$", phoneCode: "+593", flag: "🇪🇨" },
  egypt: { code: "egypt", iso: "EG", name: "Egypt", currency: "EGP", currencySymbol: "£", phoneCode: "+20", flag: "🇪🇬" },
  "el-salvador": { code: "el-salvador", iso: "SV", name: "El Salvador", currency: "USD", currencySymbol: "$", phoneCode: "+503", flag: "🇸🇻" },
  "equatorial-guinea": { code: "equatorial-guinea", iso: "GQ", name: "Equatorial Guinea", currency: "XAF", currencySymbol: "Fr", phoneCode: "+240", flag: "🇬🇶" },
  eritrea: { code: "eritrea", iso: "ER", name: "Eritrea", currency: "ERN", currencySymbol: "Nfk", phoneCode: "+291", flag: "🇪🇷" },
  estonia: { code: "estonia", iso: "EE", name: "Estonia", currency: "EUR", currencySymbol: "€", phoneCode: "+372", flag: "🇪🇪" },
  eswatini: { code: "eswatini", iso: "SZ", name: "Eswatini", currency: "SZL", currencySymbol: "L", phoneCode: "+268", flag: "🇸🇿" },
  ethiopia: { code: "ethiopia", iso: "ET", name: "Ethiopia", currency: "ETB", currencySymbol: "Br", phoneCode: "+251", flag: "🇪🇹" },
  fiji: { code: "fiji", iso: "FJ", name: "Fiji", currency: "FJD", currencySymbol: "$", phoneCode: "+679", flag: "🇫🇯" },
  finland: { code: "finland", iso: "FI", name: "Finland", currency: "EUR", currencySymbol: "€", phoneCode: "+358", flag: "🇫🇮" },
  france: { code: "france", iso: "FR", name: "France", currency: "EUR", currencySymbol: "€", phoneCode: "+33", flag: "🇫🇷" },
  gabon: { code: "gabon", iso: "GA", name: "Gabon", currency: "XAF", currencySymbol: "Fr", phoneCode: "+241", flag: "🇬🇦" },
  gambia: { code: "gambia", iso: "GM", name: "Gambia", currency: "GMD", currencySymbol: "D", phoneCode: "+220", flag: "🇬🇲" },
  georgia: { code: "georgia", iso: "GE", name: "Georgia", currency: "GEL", currencySymbol: "₾", phoneCode: "+995", flag: "🇬🇪" },
  germany: { code: "germany", iso: "DE", name: "Germany", currency: "EUR", currencySymbol: "€", phoneCode: "+49", flag: "🇩🇪" },
  ghana: { code: "ghana", iso: "GH", name: "Ghana", currency: "GHS", currencySymbol: "₵", phoneCode: "+233", flag: "🇬🇭" },
  greece: { code: "greece", iso: "GR", name: "Greece", currency: "EUR", currencySymbol: "€", phoneCode: "+30", flag: "🇬🇷" },
  grenada: { code: "grenada", iso: "GD", name: "Grenada", currency: "XCD", currencySymbol: "$", phoneCode: "+1473", flag: "🇬🇩" },
  guatemala: { code: "guatemala", iso: "GT", name: "Guatemala", currency: "GTQ", currencySymbol: "Q", phoneCode: "+502", flag: "🇬🇹" },
  guinea: { code: "guinea", iso: "GN", name: "Guinea", currency: "GNF", currencySymbol: "Fr", phoneCode: "+224", flag: "🇬🇳" },
  "guinea-bissau": { code: "guinea-bissau", iso: "GW", name: "Guinea-Bissau", currency: "XOF", currencySymbol: "Fr", phoneCode: "+245", flag: "🇬🇼" },
  guyana: { code: "guyana", iso: "GY", name: "Guyana", currency: "GYD", currencySymbol: "$", phoneCode: "+592", flag: "🇬🇾" },
  haiti: { code: "haiti", iso: "HT", name: "Haiti", currency: "HTG", currencySymbol: "G", phoneCode: "+509", flag: "🇭🇹" },
  honduras: { code: "honduras", iso: "HN", name: "Honduras", currency: "HNL", currencySymbol: "L", phoneCode: "+504", flag: "🇭🇳" },
  hungary: { code: "hungary", iso: "HU", name: "Hungary", currency: "HUF", currencySymbol: "Ft", phoneCode: "+36", flag: "🇭🇺" },
  iceland: { code: "iceland", iso: "IS", name: "Iceland", currency: "ISK", currencySymbol: "kr", phoneCode: "+354", flag: "🇮🇸" },
  indonesia: { code: "indonesia", iso: "ID", name: "Indonesia", currency: "IDR", currencySymbol: "Rp", phoneCode: "+62", flag: "🇮🇩" },
  iran: { code: "iran", iso: "IR", name: "Iran", currency: "IRR", currencySymbol: "﷼", phoneCode: "+98", flag: "🇮🇷" },
  iraq: { code: "iraq", iso: "IQ", name: "Iraq", currency: "IQD", currencySymbol: "ع.د", phoneCode: "+964", flag: "🇮🇶" },
  ireland: { code: "ireland", iso: "IE", name: "Ireland", currency: "EUR", currencySymbol: "€", phoneCode: "+353", flag: "🇮🇪" },
  israel: { code: "israel", iso: "IL", name: "Israel", currency: "ILS", currencySymbol: "₪", phoneCode: "+972", flag: "🇮🇱" },
  italy: { code: "italy", iso: "IT", name: "Italy", currency: "EUR", currencySymbol: "€", phoneCode: "+39", flag: "🇮🇹" },
  "ivory-coast": { code: "ivory-coast", iso: "CI", name: "Ivory Coast", currency: "XOF", currencySymbol: "Fr", phoneCode: "+225", flag: "🇨🇮" },
  jamaica: { code: "jamaica", iso: "JM", name: "Jamaica", currency: "JMD", currencySymbol: "$", phoneCode: "+1876", flag: "🇯🇲" },
  jordan: { code: "jordan", iso: "JO", name: "Jordan", currency: "JOD", currencySymbol: "د.ا", phoneCode: "+962", flag: "🇯🇴" },
  kazakhstan: { code: "kazakhstan", iso: "KZ", name: "Kazakhstan", currency: "KZT", currencySymbol: "₸", phoneCode: "+7", flag: "🇰🇿" },
  kenya: { code: "kenya", iso: "KE", name: "Kenya", currency: "KES", currencySymbol: "Ksh", phoneCode: "+254", flag: "🇰🇪" },
  kiribati: { code: "kiribati", iso: "KI", name: "Kiribati", currency: "AUD", currencySymbol: "$", phoneCode: "+686", flag: "🇰🇮" },
  kuwait: { code: "kuwait", iso: "KW", name: "Kuwait", currency: "KWD", currencySymbol: "د.ك", phoneCode: "+965", flag: "🇰🇼" },
  kyrgyzstan: { code: "kyrgyzstan", iso: "KG", name: "Kyrgyzstan", currency: "KGS", currencySymbol: "с", phoneCode: "+996", flag: "🇰🇬" },
  laos: { code: "laos", iso: "LA", name: "Laos", currency: "LAK", currencySymbol: "₭", phoneCode: "+856", flag: "🇱🇦" },
  latvia: { code: "latvia", iso: "LV", name: "Latvia", currency: "EUR", currencySymbol: "€", phoneCode: "+371", flag: "🇱🇻" },
  lebanon: { code: "lebanon", iso: "LB", name: "Lebanon", currency: "LBP", currencySymbol: "ل.ل", phoneCode: "+961", flag: "🇱🇧" },
  lesotho: { code: "lesotho", iso: "LS", name: "Lesotho", currency: "LSL", currencySymbol: "L", phoneCode: "+266", flag: "🇱🇸" },
  liberia: { code: "liberia", iso: "LR", name: "Liberia", currency: "LRD", currencySymbol: "$", phoneCode: "+231", flag: "🇱🇷" },
  libya: { code: "libya", iso: "LY", name: "Libya", currency: "LYD", currencySymbol: "ل.د", phoneCode: "+218", flag: "🇱🇾" },
  liechtenstein: { code: "liechtenstein", iso: "LI", name: "Liechtenstein", currency: "CHF", currencySymbol: "Fr", phoneCode: "+423", flag: "🇱🇮" },
  lithuania: { code: "lithuania", iso: "LT", name: "Lithuania", currency: "EUR", currencySymbol: "€", phoneCode: "+370", flag: "🇱🇹" },
  luxembourg: { code: "luxembourg", iso: "LU", name: "Luxembourg", currency: "EUR", currencySymbol: "€", phoneCode: "+352", flag: "🇱🇺" },
  madagascar: { code: "madagascar", iso: "MG", name: "Madagascar", currency: "MGA", currencySymbol: "Ar", phoneCode: "+261", flag: "🇲🇬" },
  malawi: { code: "malawi", iso: "MW", name: "Malawi", currency: "MWK", currencySymbol: "MK", phoneCode: "+265", flag: "🇲🇼" },
  malaysia: { code: "malaysia", iso: "MY", name: "Malaysia", currency: "MYR", currencySymbol: "RM", phoneCode: "+60", flag: "🇲🇾" },
  maldives: { code: "maldives", iso: "MV", name: "Maldives", currency: "MVR", currencySymbol: "Rf", phoneCode: "+960", flag: "🇲🇻" },
  mali: { code: "mali", iso: "ML", name: "Mali", currency: "XOF", currencySymbol: "Fr", phoneCode: "+223", flag: "🇲🇱" },
  malta: { code: "malta", iso: "MT", name: "Malta", currency: "EUR", currencySymbol: "€", phoneCode: "+356", flag: "🇲🇹" },
  "marshall-islands": { code: "marshall-islands", iso: "MH", name: "Marshall Islands", currency: "USD", currencySymbol: "$", phoneCode: "+692", flag: "🇲🇭" },
  mauritania: { code: "mauritania", iso: "MR", name: "Mauritania", currency: "MRU", currencySymbol: "UM", phoneCode: "+222", flag: "🇲🇷" },
  mauritius: { code: "mauritius", iso: "MU", name: "Mauritius", currency: "MUR", currencySymbol: "₨", phoneCode: "+230", flag: "🇲🇺" },
  mexico: { code: "mexico", iso: "MX", name: "Mexico", currency: "MXN", currencySymbol: "$", phoneCode: "+52", flag: "🇲🇽" },
  micronesia: { code: "micronesia", iso: "FM", name: "Micronesia", currency: "USD", currencySymbol: "$", phoneCode: "+691", flag: "🇫🇲" },
  moldova: { code: "moldova", iso: "MD", name: "Moldova", currency: "MDL", currencySymbol: "L", phoneCode: "+373", flag: "🇲🇩" },
  monaco: { code: "monaco", iso: "MC", name: "Monaco", currency: "EUR", currencySymbol: "€", phoneCode: "+377", flag: "🇲🇨" },
  mongolia: { code: "mongolia", iso: "MN", name: "Mongolia", currency: "MNT", currencySymbol: "₮", phoneCode: "+976", flag: "🇲🇳" },
  montenegro: { code: "montenegro", iso: "ME", name: "Montenegro", currency: "EUR", currencySymbol: "€", phoneCode: "+382", flag: "🇲🇪" },
  morocco: { code: "morocco", iso: "MA", name: "Morocco", currency: "MAD", currencySymbol: "MAD", phoneCode: "+212", flag: "🇲🇦" },
  mozambique: { code: "mozambique", iso: "MZ", name: "Mozambique", currency: "MZN", currencySymbol: "MT", phoneCode: "+258", flag: "🇲🇿" },
  myanmar: { code: "myanmar", iso: "MM", name: "Myanmar", currency: "MMK", currencySymbol: "K", phoneCode: "+95", flag: "🇲🇲" },
  namibia: { code: "namibia", iso: "NA", name: "Namibia", currency: "NAD", currencySymbol: "$", phoneCode: "+264", flag: "🇳🇦" },
  nauru: { code: "nauru", iso: "NR", name: "Nauru", currency: "AUD", currencySymbol: "$", phoneCode: "+674", flag: "🇳🇷" },
  nepal: { code: "nepal", iso: "NP", name: "Nepal", currency: "NPR", currencySymbol: "₨", phoneCode: "+977", flag: "🇳🇵" },
  netherlands: { code: "netherlands", iso: "NL", name: "Netherlands", currency: "EUR", currencySymbol: "€", phoneCode: "+31", flag: "🇳🇱" },
  "new-zealand": { code: "new-zealand", iso: "NZ", name: "New Zealand", currency: "NZD", currencySymbol: "$", phoneCode: "+64", flag: "🇳🇿" },
  nicaragua: { code: "nicaragua", iso: "NI", name: "Nicaragua", currency: "NIO", currencySymbol: "C$", phoneCode: "+505", flag: "🇳🇮" },
  niger: { code: "niger", iso: "NE", name: "Niger", currency: "XOF", currencySymbol: "Fr", phoneCode: "+227", flag: "🇳🇪" },
  nigeria: { code: "nigeria", iso: "NG", name: "Nigeria", currency: "NGN", currencySymbol: "₦", phoneCode: "+234", flag: "🇳🇬" },
  "north-korea": { code: "north-korea", iso: "KP", name: "North Korea", currency: "KPW", currencySymbol: "₩", phoneCode: "+850", flag: "🇰🇵" },
  "north-macedonia": { code: "north-macedonia", iso: "MK", name: "North Macedonia", currency: "MKD", currencySymbol: "ден", phoneCode: "+389", flag: "🇲🇰" },
  norway: { code: "norway", iso: "NO", name: "Norway", currency: "NOK", currencySymbol: "kr", phoneCode: "+47", flag: "🇳🇴" },
  oman: { code: "oman", iso: "OM", name: "Oman", currency: "OMR", currencySymbol: "ر.ع.", phoneCode: "+968", flag: "🇴🇲" },
  pakistan: { code: "pakistan", iso: "PK", name: "Pakistan", currency: "PKR", currencySymbol: "₨", phoneCode: "+92", flag: "🇵🇰" },
  palau: { code: "palau", iso: "PW", name: "Palau", currency: "USD", currencySymbol: "$", phoneCode: "+680", flag: "🇵🇼" },
  palestine: { code: "palestine", iso: "PS", name: "Palestine", currency: "ILS", currencySymbol: "₪", phoneCode: "+970", flag: "🇵🇸" },
  panama: { code: "panama", iso: "PA", name: "Panama", currency: "PAB", currencySymbol: "B/.", phoneCode: "+507", flag: "🇵🇦" },
  "papua-new-guinea": { code: "papua-new-guinea", iso: "PG", name: "Papua New Guinea", currency: "PGK", currencySymbol: "K", phoneCode: "+675", flag: "🇵🇬" },
  paraguay: { code: "paraguay", iso: "PY", name: "Paraguay", currency: "PYG", currencySymbol: "₲", phoneCode: "+595", flag: "🇵🇾" },
  peru: { code: "peru", iso: "PE", name: "Peru", currency: "PEN", currencySymbol: "S/.", phoneCode: "+51", flag: "🇵🇪" },
  philippines: { code: "philippines", iso: "PH", name: "Philippines", currency: "PHP", currencySymbol: "₱", phoneCode: "+63", flag: "🇵🇭" },
  poland: { code: "poland", iso: "PL", name: "Poland", currency: "PLN", currencySymbol: "zł", phoneCode: "+48", flag: "🇵🇱" },
  portugal: { code: "portugal", iso: "PT", name: "Portugal", currency: "EUR", currencySymbol: "€", phoneCode: "+351", flag: "🇵🇹" },
  qatar: { code: "qatar", iso: "QA", name: "Qatar", currency: "QAR", currencySymbol: "ر.ق", phoneCode: "+974", flag: "🇶🇦" },
  romania: { code: "romania", iso: "RO", name: "Romania", currency: "RON", currencySymbol: "lei", phoneCode: "+40", flag: "🇷🇴" },
  russia: { code: "russia", iso: "RU", name: "Russia", currency: "RUB", currencySymbol: "₽", phoneCode: "+7", flag: "🇷🇺" },
  rwanda: { code: "rwanda", iso: "RW", name: "Rwanda", currency: "RWF", currencySymbol: "Fr", phoneCode: "+250", flag: "🇷🇼" },
  "saint-kitts-and-nevis": { code: "saint-kitts-and-nevis", iso: "KN", name: "Saint Kitts and Nevis", currency: "XCD", currencySymbol: "$", phoneCode: "+1869", flag: "🇰🇳" },
  "saint-lucia": { code: "saint-lucia", iso: "LC", name: "Saint Lucia", currency: "XCD", currencySymbol: "$", phoneCode: "+1758", flag: "🇱🇨" },
  "saint-vincent-and-the-grenadines": { code: "saint-vincent-and-the-grenadines", iso: "VC", name: "Saint Vincent and the Grenadines", currency: "XCD", currencySymbol: "$", phoneCode: "+1784", flag: "🇻🇨" },
  samoa: { code: "samoa", iso: "WS", name: "Samoa", currency: "WST", currencySymbol: "T", phoneCode: "+685", flag: "🇼🇸" },
  "san-marino": { code: "san-marino", iso: "SM", name: "San Marino", currency: "EUR", currencySymbol: "€", phoneCode: "+378", flag: "🇸🇲" },
  "sao-tome-and-principe": { code: "sao-tome-and-principe", iso: "ST", name: "São Tomé and Príncipe", currency: "STN", currencySymbol: "Db", phoneCode: "+239", flag: "🇸🇹" },
  "saudi-arabia": { code: "saudi-arabia", iso: "SA", name: "Saudi Arabia", currency: "SAR", currencySymbol: "ر.س", phoneCode: "+966", flag: "🇸🇦" },
  senegal: { code: "senegal", iso: "SN", name: "Senegal", currency: "XOF", currencySymbol: "Fr", phoneCode: "+221", flag: "🇸🇳" },
  serbia: { code: "serbia", iso: "RS", name: "Serbia", currency: "RSD", currencySymbol: "din", phoneCode: "+381", flag: "🇷🇸" },
  seychelles: { code: "seychelles", iso: "SC", name: "Seychelles", currency: "SCR", currencySymbol: "₨", phoneCode: "+248", flag: "🇸🇨" },
  "sierra-leone": { code: "sierra-leone", iso: "SL", name: "Sierra Leone", currency: "SLL", currencySymbol: "Le", phoneCode: "+232", flag: "🇸🇱" },
  slovakia: { code: "slovakia", iso: "SK", name: "Slovakia", currency: "EUR", currencySymbol: "€", phoneCode: "+421", flag: "🇸🇰" },
  slovenia: { code: "slovenia", iso: "SI", name: "Slovenia", currency: "EUR", currencySymbol: "€", phoneCode: "+386", flag: "🇸🇮" },
  "solomon-islands": { code: "solomon-islands", iso: "SB", name: "Solomon Islands", currency: "SBD", currencySymbol: "$", phoneCode: "+677", flag: "🇸🇧" },
  somalia: { code: "somalia", iso: "SO", name: "Somalia", currency: "SOS", currencySymbol: "Sh", phoneCode: "+252", flag: "🇸🇴" },
  "south-africa": { code: "south-africa", iso: "ZA", name: "South Africa", currency: "ZAR", currencySymbol: "R", phoneCode: "+27", flag: "🇿🇦" },
  "south-sudan": { code: "south-sudan", iso: "SS", name: "South Sudan", currency: "SSP", currencySymbol: "£", phoneCode: "+211", flag: "🇸🇸" },
  spain: { code: "spain", iso: "ES", name: "Spain", currency: "EUR", currencySymbol: "€", phoneCode: "+34", flag: "🇪🇸" },
  "sri-lanka": { code: "sri-lanka", iso: "LK", name: "Sri Lanka", currency: "LKR", currencySymbol: "₨", phoneCode: "+94", flag: "🇱🇰" },
  sudan: { code: "sudan", iso: "SD", name: "Sudan", currency: "SDG", currencySymbol: "ج.س.", phoneCode: "+249", flag: "🇸🇩" },
  suriname: { code: "suriname", iso: "SR", name: "Suriname", currency: "SRD", currencySymbol: "$", phoneCode: "+597", flag: "🇸🇷" },
  sweden: { code: "sweden", iso: "SE", name: "Sweden", currency: "SEK", currencySymbol: "kr", phoneCode: "+46", flag: "🇸🇪" },
  switzerland: { code: "switzerland", iso: "CH", name: "Switzerland", currency: "CHF", currencySymbol: "Fr", phoneCode: "+41", flag: "🇨🇭" },
  syria: { code: "syria", iso: "SY", name: "Syria", currency: "SYP", currencySymbol: "£", phoneCode: "+963", flag: "🇸🇾" },
  taiwan: { code: "taiwan", iso: "TW", name: "Taiwan", currency: "TWD", currencySymbol: "NT$", phoneCode: "+886", flag: "🇹🇼" },
  tajikistan: { code: "tajikistan", iso: "TJ", name: "Tajikistan", currency: "TJS", currencySymbol: "SM", phoneCode: "+992", flag: "🇹🇯" },
  tanzania: { code: "tanzania", iso: "TZ", name: "Tanzania", currency: "TZS", currencySymbol: "Sh", phoneCode: "+255", flag: "🇹🇿" },
  thailand: { code: "thailand", iso: "TH", name: "Thailand", currency: "THB", currencySymbol: "฿", phoneCode: "+66", flag: "🇹🇭" },
  "timor-leste": { code: "timor-leste", iso: "TL", name: "Timor-Leste", currency: "USD", currencySymbol: "$", phoneCode: "+670", flag: "🇹🇱" },
  togo: { code: "togo", iso: "TG", name: "Togo", currency: "XOF", currencySymbol: "Fr", phoneCode: "+228", flag: "🇹🇬" },
  tonga: { code: "tonga", iso: "TO", name: "Tonga", currency: "TOP", currencySymbol: "T$", phoneCode: "+676", flag: "🇹🇴" },
  "trinidad-and-tobago": { code: "trinidad-and-tobago", iso: "TT", name: "Trinidad and Tobago", currency: "TTD", currencySymbol: "$", phoneCode: "+1868", flag: "🇹🇹" },
  tunisia: { code: "tunisia", iso: "TN", name: "Tunisia", currency: "TND", currencySymbol: "د.ت", phoneCode: "+216", flag: "🇹🇳" },
  turkey: { code: "turkey", iso: "TR", name: "Turkey", currency: "TRY", currencySymbol: "₺", phoneCode: "+90", flag: "🇹🇷" },
  turkmenistan: { code: "turkmenistan", iso: "TM", name: "Turkmenistan", currency: "TMT", currencySymbol: "T", phoneCode: "+993", flag: "🇹🇲" },
  tuvalu: { code: "tuvalu", iso: "TV", name: "Tuvalu", currency: "AUD", currencySymbol: "$", phoneCode: "+688", flag: "🇹🇻" },
  uganda: { code: "uganda", iso: "UG", name: "Uganda", currency: "UGX", currencySymbol: "Sh", phoneCode: "+256", flag: "🇺🇬" },
  ukraine: { code: "ukraine", iso: "UA", name: "Ukraine", currency: "UAH", currencySymbol: "₴", phoneCode: "+380", flag: "🇺🇦" },
  uruguay: { code: "uruguay", iso: "UY", name: "Uruguay", currency: "UYU", currencySymbol: "$", phoneCode: "+598", flag: "🇺🇾" },
  uzbekistan: { code: "uzbekistan", iso: "UZ", name: "Uzbekistan", currency: "UZS", currencySymbol: "сўм", phoneCode: "+998", flag: "🇺🇿" },
  vanuatu: { code: "vanuatu", iso: "VU", name: "Vanuatu", currency: "VUV", currencySymbol: "Vt", phoneCode: "+678", flag: "🇻🇺" },
  venezuela: { code: "venezuela", iso: "VE", name: "Venezuela", currency: "VES", currencySymbol: "Bs.S", phoneCode: "+58", flag: "🇻🇪" },
  vietnam: { code: "vietnam", iso: "VN", name: "Vietnam", currency: "VND", currencySymbol: "₫", phoneCode: "+84", flag: "🇻🇳" },
  yemen: { code: "yemen", iso: "YE", name: "Yemen", currency: "YER", currencySymbol: "﷼", phoneCode: "+967", flag: "🇾🇪" },
  zambia: { code: "zambia", iso: "ZM", name: "Zambia", currency: "ZMW", currencySymbol: "ZK", phoneCode: "+260", flag: "🇿🇲" },
  zimbabwe: { code: "zimbabwe", iso: "ZW", name: "Zimbabwe", currency: "ZWL", currencySymbol: "$", phoneCode: "+263", flag: "🇿🇼" },
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
  // Try to match phone code at the beginning (sort by length descending to match longer codes first)
  const sortedEntries = Object.entries(countryData).sort(
    (a, b) => b[1].phoneCode.length - a[1].phoneCode.length,
  );
  for (const [code, info] of sortedEntries) {
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
