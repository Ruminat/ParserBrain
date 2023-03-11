import moment = require("moment");

moment.locale("ru");

export function formatTimeAgo(time: number): string {
  return moment(time).fromNow();
}

export const minutes = (value: number) => ({
  value,
  toSeconds: () => value * 60,
  toMs: () => value * 60 * 1000,
});
