import lodash from "lodash";

type Operator = undefined | "===" | "!==" | ">" | ">=" | "<" | "<=" | "includes";

export class QueryHelper<T extends object> {
  private result: T[];

  constructor(data: T[]) {
    this.result = [...data];
  }

  filter<K extends keyof T>(key: K, value: any, operator?: Operator) {
    this.result = this.result.filter((item) => {
      const fieldValue = lodash.get(item, key as string);

      switch (operator) {
        case "===":
          return fieldValue === value;
        case "!==":
          return fieldValue !== value;
        case ">":
          return fieldValue > value;
        case ">=":
          return fieldValue >= value;
        case "<":
          return fieldValue < value;
        case "<=":
          return fieldValue <= value;
        default:
          return String(fieldValue).toLowerCase().includes(String(value).toLowerCase());
      }
    });
    return this;
  }

  sort<K extends keyof T>(key: K, order: "asc" | "desc" = "asc") {
    this.result = lodash.orderBy(this.result, [key as string], [order]);
    return this;
  }

  query(term: string, keys?: (keyof T)[]) {
    const lowerTerm = term.toLowerCase();
    this.result = this.result.filter((item) => {
      const searchKeys = keys ?? Object.keys(item);
      return searchKeys.some((key) => {
        const value = lodash.get(item, key as string);
        return String(value).toLowerCase().includes(lowerTerm);
      });
    });
    return this;
  }

  exec() {
    return this.result;
  }
}
