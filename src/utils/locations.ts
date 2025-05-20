export const US = 'United States';
export const CA = 'Canada';
export const countries = {
  US,
  CA,
} as const;

export const countriesEnum = Object.entries(countries).map(([key, value]) => ({
  value: key,
  label: value,
}));
type Country = (typeof countriesEnum)[number]['label'];

export const COUNTRIES: [Country, ...Country[]] = [
  countriesEnum[0].label,
  ...countriesEnum.slice(1).map((country) => country.label),
];
export type countryKey = keyof typeof countries;
export type countryValue = (typeof countries)[countryKey];
export const countryCodes = Object.keys(countries) as countryKey[];
export const countryNames = Object.values(countries);

export const countryOptions = Object.entries(countries).map(([key, value]) => ({
  value: key,
  label: value,
}));

export const getCountryCodeByName = (name: '' | countryValue) => {
  return countryCodes.find((item) => countries[item] === name) as countryKey;
};

export const usStatesValues = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
] as const;
export const USStates = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
} as const;
export type usStateKey = keyof typeof USStates;
export type usStateValue = (typeof USStates)[usStateKey];
export const usStateCodes = Object.keys(USStates) as usStateKey[];
export const usStateNames = Object.values(USStates) as usStateValue[];

export const usStateOptions = Object.entries(USStates).map(([key, value]) => ({
  value: key,
  label: value,
}));

export const getStateCodeByName = (name: string) => {
  return usStateCodes.find((item) => USStates[item] === name) as usStateKey;
};

export const caProvincesValues = [
  'NL',
  'PE',
  'NS',
  'NB',
  'QC',
  'ON',
  'MB',
  'SK',
  'AB',
  'BC',
  'YT',
  'NT',
  'NU',
] as const;

export const CAProvinces = {
  NL: 'Newfoundland and Labrador',
  PE: 'Prince Edward Island',
  NS: 'Nova Scotia',
  NB: 'New Brunswick',
  QC: 'Quebec',
  ON: 'Ontario',
  MB: 'Manitoba',
  SK: 'Saskatchewan',
  AB: 'Alberta',
  BC: 'British Columbia',
  YT: 'Yukon',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
};
export type caProvinceKey = keyof typeof CAProvinces;
export type caProvinceValue = (typeof CAProvinces)[caProvinceKey];
export const caProvinceCodes = Object.keys(CAProvinces) as caProvinceKey[];
export const caProvinceNames = Object.values(CAProvinces) as caProvinceValue[];

export const caProvinceOptions = Object.entries(CAProvinces).map(([key, value]) => ({
  value: key,
  label: value,
}));
export const getProvinceCodeByName = (name: string) => {
  return caProvinceCodes.find((item) => CAProvinces[item] === name) as caProvinceKey;
};
