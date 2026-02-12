const daysInTwoMonths = 60; // Approximately 2 months (assuming 30 days per month)
const secondsInADay = 60 * 60 * 24;
const maxAgeInSeconds = daysInTwoMonths * secondsInADay; // Calculate maxAge for 2 months

export const COOKIEMAXAGE = maxAgeInSeconds;