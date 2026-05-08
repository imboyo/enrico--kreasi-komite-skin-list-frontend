export function formatTimeChat(iso: string) {
  try {
    const date = new Date(iso);
    const now = new Date();

    const time = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const startOfYesterday = new Date(startOfToday.getTime() - 86400000);
    // Within last 7 days (excluding today and yesterday)
    const startOfLastWeek = new Date(startOfToday.getTime() - 6 * 86400000);

    if (date >= startOfToday) {
      // Today: show time only
      return time;
    } else if (date >= startOfYesterday) {
      // Yesterday
      return `Kemarin, ${time}`;
    } else if (date >= startOfLastWeek) {
      // Within last 7 days: show weekday name
      const weekday = date.toLocaleDateString("id-ID", { weekday: "long" });
      return `${weekday}, ${time}`;
    } else {
      // Older: show full date
      const dateStr = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return `${dateStr}, ${time}`;
    }
  } catch {
    return "";
  }
}
