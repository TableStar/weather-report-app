export const meterToKilo = (visibilityInMeters: number): string => {
  const visibilityInKilos = visibilityInMeters / 1000;
  return `${visibilityInKilos.toFixed(0)} km`;
};
