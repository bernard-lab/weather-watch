export const convertSpeedToKmh = (speed: number | undefined): string => {
    const speedKmh = (speed ?? 0) * 3.6;
    return `${speedKmh.toFixed(0)} km/h`; // Format to no decimal places
  };