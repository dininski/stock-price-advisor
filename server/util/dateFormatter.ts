const formatEpoch = (epoch: number, timeZone?: string): string => {
  const date = new Date(epoch);
  const opts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone
  };
  return Intl.DateTimeFormat("en-UK", { ...opts }).format(date);
};

export { formatEpoch };
