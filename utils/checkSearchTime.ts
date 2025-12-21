import { lastFetchTimes } from "./rateLimitStore";// this is made for apicall user based search limit in version 194

export const checkSearchTime = (key: keyof typeof lastFetchTimes) => {
  const current = new Date();
  const last = lastFetchTimes[key];

  if (!last) {
    lastFetchTimes[key] = current;
    return { allowed: true, difference: 0 };
  }

  const difference = current.getTime() - last.getTime();

  if (difference > 180000) {
    lastFetchTimes[key] = current;
    return { allowed: true, difference };
  }

  return { allowed: false, difference };
};