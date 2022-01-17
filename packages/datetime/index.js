const dayjs = require("dayjs");
const UTC = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(UTC);
dayjs.extend(timezone);

class DateTime {
  #value = null;
  #units = ["year", "month", "day", "hour", "minute", "second", "milliSecond"];

  static #padZero(num, len) {
    return String(num).padStart(len, "0");
  }

  constructor(dayjsInstance) {
    if (dayjsInstance.toString() === "Invalid Date") {
      throw new Error("Invalid Value")
    }
    this.#value = dayjsInstance;
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
      year: DateTime.#padZero(value.year(), 4),
      month: DateTime.#padZero(value.month() + 1, 2),
      day: DateTime.#padZero(value.date(), 2),
      hour: DateTime.#padZero(value.hour(), 2),
      minute: DateTime.#padZero(value.minute(), 2),
      second: DateTime.#padZero(value.second(), 2),
      milliSecond: DateTime.#padZero(value.millisecond(), 3),
      timezoneSign: timezoneText.slice(0, 1),
      timezoneHour: timezoneText.slice(1, 3),
      timezoneMinute: timezoneText.slice(4, 7),
      weekday: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][value.day()]
    };
  }

  toISO(timezone = "Asia/Tokyo") {
    const { year, month, day, hour, minute, second, timezoneSign, timezoneHour, timezoneMinute } = this.get(timezone);
    return `${year}-${month}-${day}T${hour}:${minute}:${second}${timezoneSign}${timezoneHour}:${timezoneMinute}`;
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

  set(unit, value) {
    if (!this.#units.includes(unit)) {
      throw new Error(`DateTime.set: unit must be one of ${this.#units.join(", ")}`);
    } else if (typeof value !== "number" || isNaN(value)) {
      throw new Error("DateTime.set: value must be a valid number");
    }
    if (unit === "month") {
      value = value - 1;
    } else if (unit === "day") {
      unit = "date";
    } else if (unit === "milliSecond") {
      unit = "millisecond";
    }
    return new DateTime(this.#value.set(unit, value));
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
