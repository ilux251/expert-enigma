export const roundTo = (number, places) => 
  {
    let factor = 10 ** places;
    return Math.round(number * factor) / factor;
  }