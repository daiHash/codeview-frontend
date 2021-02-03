export const formatDatetime = (datetime: string): string => {
  const [day, month, year] = new Date(datetime)
    .toUTCString()
    .split(", ")[1]
    .split(" ")
    .slice(0, 3);
  return `${day} ${month} ${year}`;
};
