import fs from 'fs';
import path from 'path';
import { parse, HTMLElement } from 'node-html-parser';
import type { Country } from 'country-list';
import { getName } from 'country-list';
import type { Dish } from '../helpers/types';

const PUBLIC_PATH = path.resolve('.', 'assets');
const MAP_PATH = path.resolve(PUBLIC_PATH, 'map.svg');
const DISH_PATH = path.resolve(PUBLIC_PATH, 'dish.json');

// id has the following pattern [PT] name of the dish
const REGEX = /^\[(\w{2})\](.*)$/;
const COLOR_REGEX = /fill\s*=\s*["'](#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}))["']/;

export const TYPE_COLOR_MAP: Record<Dish['type'], string> = {
  MEAT: '#FF6347',
  VEGETARIAN: '#C6FF9E',
  SEAFOOD: '#00BFFF',
  SWEET: '#FF69B4',
  BREAD: '#FFB86C',
  CHEESE: '#FFEE7B',
  CEREAL: '#00E6E6',
};

const COLOR_TYPE_MAP = Object.fromEntries(
  Object.entries(TYPE_COLOR_MAP).map(
    ([key, value]) => [value, key] as [string, Dish['type']],
  ),
);

export function humanize(str: string) {
  return str
    .replace(/^[\s-]+|[\s-]+$/g, '')
    .replace(/[-\s]+/g, ' ')
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
}

const getDishType = (elem: HTMLElement): Dish['type'] => {
  const matches = elem.innerHTML.match(COLOR_REGEX);

  if (!matches) {
    throw new Error('Invalid fill property');
  }

  const [_, color = ''] = matches;

  const type = COLOR_TYPE_MAP[color];
  if (!type) {
    throw new Error('Fill color does not match with any Dish type');
  }

  return type;
};

export const mapToDish = (elem: HTMLElement): Dish => {
  const matches = elem.id.match(REGEX);
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

  const type = getDishType(elem);

  const country: Country = { code: countryCode, name: countryName };

  return { id, name: humanize(name), country, type };
};

const main = () => {
  const map = fs.readFileSync(MAP_PATH);

  const parsedDom = parse(map.toString());

  const content = parsedDom.querySelectorAll("[id^='[']").map(mapToDish);

  fs.writeFileSync(DISH_PATH, JSON.stringify(content, null, 2));
};

main();
