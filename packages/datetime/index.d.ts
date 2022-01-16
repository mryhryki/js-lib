export interface DateTimeElement {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
  second: number;
  milliSecond: number;
  timezoneSign: "+" | "-";
  timezoneHour: number;
  timezoneMinute: number;
  weekday: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  unixTimeSec: number;
  unixTimeMs: number;
}

export class DateTime {
  static parse(dateTimeText: string): DateTime;
  static at(unixTimeSec: number): DateTime;
  static atMs(unixTimeMs: number): DateTime;
  static now(): DateTime;
  get(timezone?: string): DateTimeElement;
  toISO(timezone?: string): string;
  toUnixTime(): number;
  toUnixTimeMs(): number;
  add(value: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "milliSecond"): DateTime;
  clone(): DateTime;
}
