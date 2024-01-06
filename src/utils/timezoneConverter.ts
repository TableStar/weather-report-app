export const timezoneConverter = (
  dt: number = new Date().getTime(),
  timezone: number = 0
) => {
  const utc_seconds = dt + timezone;
  const utc_milliseconds = utc_seconds * 1000;
  const local_date = new Date(utc_milliseconds).toUTCString();
  return local_date;
};
