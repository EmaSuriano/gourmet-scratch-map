import type { Dish } from './types';

export const getDishTypes = (dishes: Dish[]): Dish['type'][] => {
  const typeSet = new Set(dishes.map((dish) => dish.type));
  return Array.from(typeSet);
};
