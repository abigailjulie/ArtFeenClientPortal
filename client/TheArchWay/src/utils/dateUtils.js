export function formatDateTime(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

export const formatToday = () => {
  const date = new Date();
  return new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  }).format(date);
};
