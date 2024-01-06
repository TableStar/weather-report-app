export const kelvinToCelcius = (tempKelvin: number = 273.15): number => {
  const tempCelcius = tempKelvin - 273.15;
  return Math.floor(tempCelcius); //remove decimal and keep integer part
};
