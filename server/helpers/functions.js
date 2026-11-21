export function addData(key, value, obj) {
  if (typeof value === "string" && value.trim().length > 0) {
    obj[key] = value;
  }
}
