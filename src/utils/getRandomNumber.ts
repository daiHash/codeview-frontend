export const generateRandomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
