import dayjs, { type Dayjs } from "dayjs";

const NUMERIC_TIMESTAMP = /^\d+$/;

export function parseApiDate(value: string | null | undefined): Dayjs | null {
  if (!value) return null;

  if (NUMERIC_TIMESTAMP.test(value)) {
    return dayjs(Number(value));
  }

  return dayjs(value);
}
