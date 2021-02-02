export const formatDatetime = (datetime: string): string => {
  const [month, day, year] = new Date(datetime)
    .toDateString()
    .split(" ")
    .slice(1);
  return `${day} ${month} ${year}`;
};
