export const kelvinToCelsius = (tempKelvin: number | undefined): number | undefined => {
    const kelvinOffset = 273.15;
    return tempKelvin !== undefined ? Math.floor(tempKelvin - kelvinOffset) : undefined;
  };