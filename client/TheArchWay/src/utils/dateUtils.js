export function formatDateTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);

  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() + userTimezoneOffset);

  return localDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const formatToday = () => {
  const date = new Date();
  return new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  }).format(date);
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};
