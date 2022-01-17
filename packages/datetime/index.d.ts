export interface DateTimeElement {
  year: string;
  month: string; // 1-12
  date: string;
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
  add(value: number, unit: "year" | "month" | "date" | "hour" | "minute" | "second" | "milliSecond"): DateTime;
  set(unit: "year" | "month" | "date" | "hour" | "minute" | "second" | "milliSecond", value: number): DateTime;
  clone(): DateTime;
  toString(): string;
}
