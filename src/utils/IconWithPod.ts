export const getIconWithPod = (icon: any | undefined): string => {
    return `${icon?.weather[0].icon.slice(0, -1) ?? ""}${icon?.sys.pod ?? ""}`;
  };