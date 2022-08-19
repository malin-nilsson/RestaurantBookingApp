export function limitPastDates() {
  let date = new Date().toISOString().split("T")[0];
  return date;
}
