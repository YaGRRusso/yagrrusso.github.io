import lodash from "lodash";

type OmittedFilterValue = undefined | null | "";

type FilterFieldValue<T> = T extends OmittedFilterValue ? never : T;

type FilterInputResult<T extends object> = Partial<{
  [K in keyof T as FilterFieldValue<T[K]> extends never
    ? never
    : K]: FilterFieldValue<T[K]>;
}>;

/** GraphQL filter fields with no value (undefined, null, or ""). */
export function filterInput<T extends object>(fields: T): FilterInputResult<T> {
  return lodash.pickBy(
    fields,
    (value) => value !== undefined && value !== null && value !== ""
  ) as FilterInputResult<T>;
}
