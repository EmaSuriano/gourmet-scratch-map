import { parse } from 'node-html-parser';
import fs from 'node:fs/promises';
import { mapToDish } from '../helpers/map-to-dish';

export const getDishes = async () => {
  const url = new URL('../../public/map.svg', import.meta.url);
  const map = await fs.readFile(url, 'utf-8');

  const parsedDom = parse(map.toString());

  return parsedDom
    .querySelectorAll("[id^='[']")
    .map((elem) => mapToDish(elem.id));
};
