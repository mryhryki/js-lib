export interface DateTimeElement {
  year: string; // e.g.
  month: string; // 01-12
  day: string;
  hour: string;
  minute: string;
  second: string;
  milliSecond: string;
  timezoneSign: "+" | "-";
  timezoneHour: string;
  timezoneMinute: string;
  weekday: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
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
  set(unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "milliSecond", value: number): DateTime;
  clone(): DateTime;
  toString(): string;
}
