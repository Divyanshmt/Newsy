export const getTimeAgo = (dateValue: any) => {
  const currentTime = Date.now();
  const timeDifference = Math.floor((currentTime - dateValue) / 1000); // Convert milliseconds to seconds

  if (timeDifference < 60) {
    // Less than 1 minute ago
    return `${timeDifference} sec ago`;
  } else {
    const minutes = Math.floor(timeDifference / 60);

    if (minutes < 60) {
      // Less than 1 hour ago
      return `${minutes} min ago`;
    } else {
      const hours = Math.floor(minutes / 60);

      if (hours < 24) {
        // Less than 1 day ago
        return `${hours} H ago`;
      } else {
        const days = Math.floor(hours / 24);

        return `${days} Days ago`;
      }
    }
  }
};
