export const mPerSecToKiloPerHour = (mPerSec: number): string => {
  const kiloPerH = mPerSec * 3.6;
  return `${kiloPerH.toFixed(0)}km/h`
};
