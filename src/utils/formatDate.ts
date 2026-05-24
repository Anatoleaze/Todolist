export function formatDateShort(
  value: string | number | Date | null | undefined,
): string {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else if (
    typeof value === "object" &&
    typeof (value as any).toDate === "function"
  ) {
    date = (value as any).toDate();
  } else if (typeof value === "number") {
    date = new Date(value);
  } else {
    date = new Date(String(value));
  }

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} à ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
