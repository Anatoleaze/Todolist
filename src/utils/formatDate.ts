export function formatDateShort(input: unknown): string {
  if (!input) return "";
  let d: Date;

  if (typeof input === "string") {
    d = new Date(input);
  } else if (input instanceof Date) {
    d = input;
  } else if (typeof (input as any)?.toDate === "function") {
    d = (input as any).toDate();
  } else {
    try {
      d = new Date(String(input));
    } catch {
      return "";
    }
  }

  if (isNaN(d.getTime())) return "";

  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  return `${dd}/${mm}/${yyyy} à ${hh}:${min}`;
}
