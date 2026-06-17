export function formatThaiDate(iso: string): string {
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function readingTimeMin(markdown: string): number {
  return Math.max(1, Math.round(markdown.length / 400));
}
