export function getReadingTime(text) {
  if (!text) return "1 MIN READ";
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / 200);
  return `${time} MIN READ`;
}
