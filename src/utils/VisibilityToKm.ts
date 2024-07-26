export const getVisibilityInKm = (visibility: number | undefined): string => {
    const visibilityInKm = (visibility ?? 0) / 1000;
    return `${visibilityInKm.toFixed(0)} km`; // Format to no decimal places
  };