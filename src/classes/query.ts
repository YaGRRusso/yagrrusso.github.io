import lodash from "lodash";

type Operator = undefined | "===" | "!==" | ">" | ">=" | "<" | "<=";
type Order = undefined | "asc" | "desc";

export class QueryHelper<T extends object> {
  private result: T[];

  constructor(data: T[]) {
    this.result = [...data];
  }

  filter<K extends keyof T>(term: any, key: K, operator?: Operator) {
    this.result = this.result.filter((item) => {
      const fieldValue = lodash.get(item, key as string);

      switch (operator) {
        case "===":
          return fieldValue === term;
        case "!==":
          return fieldValue !== term;
        case ">":
          return fieldValue > term;
        case ">=":
          return fieldValue >= term;
        case "<":
          return fieldValue < term;
        case "<=":
          return fieldValue <= term;
        default:
          return String(fieldValue)
            .toLowerCase()
            .includes(String(term).toLowerCase());
      }
    });
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

  sort<K extends keyof T>(key: K, order: Order = "asc") {
    this.result = lodash.orderBy(this.result, [key as string], [order]);
    return this;
  }

  exec() {
    return this.result;
  }
}
