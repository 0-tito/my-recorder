export default function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const h = hrs > 0 ? String(hrs).padStart(2, "0") + ":" : "";
    const m = String(mins).padStart(2, "0");
    const s = String(secs).padStart(2, "0");

    return `${h}${m}:${s}`;
  }