export const formatLocalTime = (isoString: string) => {
  if (!isoString) return '';
  
  const date = new Date(isoString);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  if (isToday) {
    return `Today, ${time}`;
  }
  
  if (isYesterday) {
    return `Yesterday, ${time}`;
  }

  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};