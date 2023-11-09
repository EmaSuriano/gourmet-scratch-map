import { Country, getName } from 'country-list';

export const mapToCountry = (country: string): Country => {
  const name = getName(country);
  if (!name) {
    throw new Error('Invalid country code');
  }

  return { name, code: country };
};
