const shortDate = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatShortDate = (iso: string) => shortDate.format(new Date(iso));