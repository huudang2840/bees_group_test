// Format the "Balance"
export function formatCurrency(number: number, currency: string) {
  if (typeof number !== "number" || number < 0) return false;
  const n = number.toString().split(".");
  const numberAfterConvert = currency + n[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return n[1] ? numberAfterConvert + "." + n[1] : numberAfterConvert;
}

// Convert format yyyy-MM-dd
export function convertToDateString(dateTime: Date) {
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

// Logic Test
export function rgb(r: number, g: number, b: number): string {
  // Your code here
  r = Math.min(255, Math.max(0, Math.round(r)));
  g = Math.min(255, Math.max(0, Math.round(g)));
  b = Math.min(255, Math.max(0, Math.round(b)));
  return (componentToHex(r) + componentToHex(g) + componentToHex(b)).toUpperCase();
}
