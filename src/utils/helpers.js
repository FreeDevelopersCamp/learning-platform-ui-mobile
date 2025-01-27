// utils/helpers.js

// Subtract two dates and return the difference in days
export const subtractDates = (dateStr1, dateStr2) => {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);
  const timeDifference = date1.getTime() - date2.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);
  return Math.round(dayDifference);
};

// Format a date to display how long ago or in the future it is
export const formatDistanceFromNow = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);

  if (dayDifference > 0) {
    return `${Math.round(dayDifference)} days ago`;
  } else {
    return `In ${Math.abs(Math.round(dayDifference))} days`;
  }
};

// Get today's date as an ISO string, adjusted to the start or end of the day
export const getToday = (options = {}) => {
  const today = new Date();

  if (options.end) {
    // Set to the last second of the day
    today.setHours(23, 59, 59, 999);
  } else {
    today.setHours(0, 0, 0, 0);
  }
  return today.toISOString();
};

// Format a value into USD currency
export const formatCurrency = (value) => `$${value.toFixed(2)}`;

// Convert minutes into a human-readable duration
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} Minute${minutes === 1 ? "" : "s"}`;
  }
  const hours = Math.floor(minutes / 60);

  return `${hours}`;
};

// Capitalize the first letter of each word in a hyphen-separated string
export const capitalizeWords = (text) => {
  return text
    .split("-") // Split the text by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words with spaces
};

// Map role codes to human-readable role names
export const getRoleCode = (role) => {
  const roles = {
    0: "Admin",
    1: "Owner",
    2: "Manager",
    3: "Account Manager",
    4: "Content Manager",
    5: "Instructor",
    6: "Learner",
  };
  return roles[role] || "Unknown";
};
