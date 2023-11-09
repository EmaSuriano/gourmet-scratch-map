import type { Country } from 'country-list';
import type { Dish } from './types';
import { getName } from 'country-list';

// id has the following pattern [PT] name of the dish
const REGEX = /^\[(\w{2})\](.*)$/;

export const mapToDish = (str: string): Dish => {
  const matches = str.match(REGEX);
  if (!matches) {
    throw new Error('Invalid dish id');
  }

  const [id, countryCode, name] = matches;

  if (!countryCode || !name) {
    throw new Error('Invalid dish id');
  }

  const countryName = getName(countryCode);
  if (!countryName) {
    throw new Error('Invalid country code');
  }

  const country: Country = { code: countryCode, name: countryName };

  return { id, name, country };
};
