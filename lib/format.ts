const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2025-01-01" → "Jan 2025" (parsed manually to avoid timezone shifts). */
export function formatMonthYear(date: string | null): string {
  if (!date) return "";
  const [year, month] = date.split("-");
  const idx = Number(month) - 1;
  return MONTHS[idx] ? `${MONTHS[idx]} ${year}` : year;
}

/** "Jan 2025 – Jan 2026" · "Jan 2025 – Present" · "Sep 2024". */
export function formatRange(
  start: string | null,
  end: string | null,
  isCurrent = false
): string {
  const left = formatMonthYear(start);
  if (!left) return "";
  const right = isCurrent ? "Present" : formatMonthYear(end);
  return right ? `${left} – ${right}` : left;
}

/** 3.79 + 4 → "3.79 / 4.00". */
export function formatGpa(gpa: number | null, scale: number | null): string {
  if (gpa == null) return "";
  const denom = scale ?? 4;
  return `${gpa.toFixed(2)} / ${denom.toFixed(2)}`;
}
