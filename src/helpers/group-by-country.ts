import type { Dish } from './types';

export const groupByCountry = (
  dishes: Dish[],
): Record<string, [Dish, ...Dish[]]> => {
  return dishes.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.country.code]: acc[curr.country.code]
        ? [...acc[curr.country.code]!, curr]
        : [curr],
    };
  }, {} as Record<string, [Dish, ...Dish[]]>);
};
