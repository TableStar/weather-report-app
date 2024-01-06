export const dayNightIcon = (iconName: string, dateTimeStr: string|number): string => {
  const hours = new Date(dateTimeStr).getHours();

  const isDay = hours >= 6 && hours < 18;

  return isDay ? iconName.slice(0, -1) + "d" : iconName.slice(0, -1) + "n";
};
