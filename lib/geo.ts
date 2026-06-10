/** ISO 3166-1 alpha-2 codes for OFAC comprehensively sanctioned jurisdictions. */
export const OFAC_BLOCKED_COUNTRIES = new Set([
  'BY', // Belarus
  'CU', // Cuba
  'IQ', // Iraq
  'IR', // Iran
  'KP', // North Korea
  'LY', // Libya
  'MM', // Myanmar
  'RU', // Russia
  'SD', // Sudan
  'SO', // Somalia
  'SY', // Syria
  'VE', // Venezuela
]);

export function isOfacBlockedCountry(country: string | null | undefined): boolean {
  if (!country) return false;
  return OFAC_BLOCKED_COUNTRIES.has(country.toUpperCase());
}

export function getCountryFromRequest(headers: Headers): string | null {
  const override = process.env.GEO_COUNTRY_OVERRIDE?.trim();
  if (override) return override.toUpperCase();

  const vercelCountry = headers.get('x-vercel-ip-country');
  if (vercelCountry) return vercelCountry.toUpperCase();

  const cfCountry = headers.get('cf-ipcountry');
  if (cfCountry && cfCountry !== 'XX') return cfCountry.toUpperCase();

  return null;
}
