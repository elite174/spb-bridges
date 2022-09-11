export const formatTime = ({ hours, minutes }) =>
  `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

export const getTimeString = (intervals) =>
  intervals
    .map(({ start, end }) => `${formatTime(start)} - ${formatTime(end)}`)
    .join(", ");

const isBetweenInterval = (currentHours, currentMinutes, interval) => {
  const { start, end } = interval;

  if (start.hours < currentHours && end.hours > currentHours) return true;

  if (start.hours === currentHours && start.minutes <= currentMinutes)
    return true;

  if (end.hours === currentHours && end.minutes > currentMinutes) return true;

  return false;
};

export const isBetweenIntervals = (currentHours, currentMinutes, intervals) => {
  for (const interval of intervals) {
    if (isBetweenInterval(currentHours, currentMinutes, interval)) return true;
  }

  return false;
};

export const getClosestTimeForIntervals = (
  currentHours,
  currentMinutes,
  intervals
) => {
  for (const interval of intervals) {
    if (isBetweenInterval(currentHours, currentMinutes, interval))
      return { hours: 0, minutes: 0 };

    if (
      currentHours <= interval.start.hours &&
      currentMinutes < interval.start.minutes
    ) {
      return {
        hours: interval.start.hours - currentHours,
        minutes: interval.start.minutes - currentMinutes,
      };
    }
  }

  const totalMinutesLeft =
    24 * 60 -
    currentHours * 60 -
    currentMinutes +
    intervals[0].start.hours * 60 +
    intervals[0].start.minutes;

  return {
    hours: Math.floor(totalMinutesLeft / 60),
    minutes: totalMinutesLeft % 60,
  };
};
