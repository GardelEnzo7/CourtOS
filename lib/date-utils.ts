const ES_AR_LOCALE = "es-AR";

const weekdayShortFormatter = new Intl.DateTimeFormat(ES_AR_LOCALE, {
  weekday: "short",
});

const dayMonthFormatter = new Intl.DateTimeFormat(ES_AR_LOCALE, {
  day: "numeric",
  month: "short",
});

const fullDateFormatter = new Intl.DateTimeFormat(ES_AR_LOCALE, {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function cleanAbbreviation(value: string) {
  return value.replace(/\.$/, "");
}

export function generateNextCalendarDays(
  baseDate: Date,
  numberOfDays = 14,
) {
  const count = Math.max(0, Math.floor(numberOfDays));
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const day = baseDate.getDate();

  return Array.from(
    { length: count },
    (_, offset) => new Date(year, month, day + offset, 12),
  );
}

export function toLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatWeekdayShort(date: Date) {
  return capitalize(cleanAbbreviation(weekdayShortFormatter.format(date)));
}

export function formatDayAndMonth(date: Date) {
  const parts = dayMonthFormatter.formatToParts(date);
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month =
    parts.find((part) => part.type === "month")?.value.toLowerCase() ?? "";

  return {
    day,
    month: cleanAbbreviation(month),
  };
}

export function formatFullDate(date: Date) {
  return fullDateFormatter.format(date);
}

export function isToday(date: Date, referenceDate: Date) {
  return toLocalDateKey(date) === toLocalDateKey(referenceDate);
}
