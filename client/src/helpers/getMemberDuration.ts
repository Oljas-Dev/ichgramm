import dayjs from "dayjs";

export function getMemberDuration(createdAt: string | undefined) {
  const registrationDate = dayjs(createdAt);
  const now = dayjs();

  const years = now.diff(registrationDate, "year");
  if (years >= 1) return `${years} ${years === 1 ? "year" : "years"}`;

  const months = now.diff(registrationDate, "month");
  if (months >= 1) return `${months} ${months === 1 ? "month" : "months"}`;

  const weeks = now.diff(registrationDate, "week");
  if (weeks >= 1) return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;

  const days = now.diff(registrationDate, "day");
  return `${days} ${days === 1 ? "day" : "days"}`;
}
