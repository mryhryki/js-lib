const dayjs = require("dayjs");
const UTC = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(UTC);
dayjs.extend(timezone);

class DateTime {
  #value = null;
  #units = ["year", "month", "day", "hour", "minute", "second", "milliSecond"];

  constructor(dayjsObject) {
    this.#value = dayjsObject;
  }

  static parse(dateTimeText) {
    if (typeof dateTimeText !== "string") {
      throw new Error("DateTime.parse: dateTimeText must be a string");
    }
    return new DateTime(dayjs(dateTimeText));
  }

  static at(unixTimeSec) {
    if (typeof unixTimeSec !== "number" || isNaN(unixTimeSec)) {
      throw new Error("DateTime.at: unixTimeSec must be a valid number");
    }
    return new DateTime(dayjs.unix(unixTimeSec));
  }

  static atMs(unixTimeMs) {
    if (typeof unixTimeMs !== "number" || isNaN(unixTimeMs)) {
      throw new Error("DateTime.atMs: unixTime must be a valid number");
    }
    return new DateTime(dayjs(unixTimeMs));
  }

  static now() {
    return new DateTime(dayjs());
  }

  get(timezone = "Asia/Tokyo") {
    const value = this.#value.tz(timezone);
    const timezoneText = value.format("Z");
    return {
      year: value.year(),
      month: value.month() + 1,
      day: value.date(),
      hour: value.hour(),
      minute: value.minute(),
      second: value.second(),
      milliSecond: value.millisecond(),
      timezoneSign: timezoneText.slice(0, 1),
      timezoneHour: parseInt(timezoneText.slice(1, 3), 10),
      timezoneMinute: parseInt(timezoneText.slice(4, 7), 10),
      weekday: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][value.day()],
    };
  }

  toISO(timezone = "Asia/Tokyo") {
    const { year, month, day, hour, minute, second, timezoneSign, timezoneHour, timezoneMinute } = this.get(timezone);
    const pad = (n) => String(n).padStart(2, "0");
    const date = `${year}-${pad(month)}-${pad(day)}`;
    const time = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
    const tz = `${timezoneSign}${pad(timezoneHour)}:${pad(timezoneMinute)}`;
    return `${date}T${time}${tz}`;
  }

  toUnixTime() {
    return this.#value.unix();
  }

  toUnixTimeMs() {
    return this.#value.valueOf();
  }

  add(value, unit) {
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error("DateTime.add: value must be a valid number");
    } else if (!this.#units.includes(unit)) {
      throw new Error(`DateTime.add: unit must be one of ${this.#units.join(", ")}`);
    }
    if (unit === "milliSecond") {
      unit = "millisecond";
    }
    return new DateTime(this.#value.add(value, unit));
  }

  clone() {
    return new DateTime(this.#value);
  }

  toString() {
    return this.toISO();
  }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case "string":
        return this.toISO();
      case "number":
      case "default":
      default:
        return this.toUnixTimeMs();
    }
  }
}

module.exports = { DateTime };
