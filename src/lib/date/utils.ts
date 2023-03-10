import moment = require("moment");

moment.locale("ru");

export function formatTimeAgo(time: number): string {
  return moment(time).fromNow();
}
