import dayjs from "dayjs";

export type YearMonthDuration = {
  months: number;
  years: number;
};

export function getRoundedDuration(
  from?: string | Date | null,
  to?: string | Date | null
): YearMonthDuration {
  const start = dayjs(from);
  const end = to ? dayjs(to) : dayjs();

  if (!(start.isValid() && end.isValid()) || end.isBefore(start)) {
    return { months: 0, years: 0 };
  }

  let totalMonths = end.diff(start, "month");

  if (end.isAfter(start.add(totalMonths, "month"), "day")) {
    totalMonths += 1;
  }

  return {
    months: totalMonths % 12,
    years: Math.floor(totalMonths / 12),
  };
}
