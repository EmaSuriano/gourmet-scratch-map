import type { Country } from 'country-list';

export type Dish = {
  /** Id to identify the node in the DOM */
  id: string;

  /** Name of the dish */
  name: string;

  /** Code and name of country */
  country: Country;

  /** Type of dish */
  type:
    | 'MEAT'
    | 'VEGETARIAN'
    | 'SEAFOOD'
    | 'SWEET'
    | 'BREAD'
    | 'CHEESE'
    | 'CEREAL';
};
