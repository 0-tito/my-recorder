export default function formatDuration(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const h = hrs > 0 ? String(hrs).padStart(2, "0") + ":" : "";
    const m = String(mins).padStart(2, "0");
    const s = String(secs).padStart(2, "0");

    return `${h}${m}:${s}`;
  }


  export function formatTimestamp(timestampMs) {
  // make sure it's a number
  const date = new Date(Number(timestampMs));

  // Example format: YYYY-MM-DD HH:mm:ss
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
