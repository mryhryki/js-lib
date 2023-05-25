const dayjs = require("dayjs");
const UTC = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const weekOfYear = require("dayjs/plugin/weekOfYear");

const JpTimeZone = "Asia/Tokyo";

dayjs.extend(UTC);
dayjs.extend(timezone);
dayjs.extend(weekOfYear);

class DateTime {
  #value = null;
  #units = ["year", "month", "day", "hour", "minute", "second", "milliSecond"];

  static #padZero(num, len) {
    return String(num).padStart(len, "0");
  }

  constructor(dayjsInstance) {
    if (dayjsInstance.toString() === "Invalid Date") {
      throw new Error("Invalid Value");
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

  static now(timezone) {
    return new DateTime(dayjs().tz(timezone));
  }

  get(timezone) {
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
      weekOfYear: value.week(),
      weekday: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][value.day()],
    };
  }

  getJpEra() {
    const def = JpEraDefinitions.find((def) => def.start <= this && this < def.end);
    if (def == null) return null;
    const year = parseInt(this.get(JpTimeZone).year) - parseInt(def.start.get(JpTimeZone).year) + 1;
    return {
      year: year.toString(10).padStart(2, "0"),
      name: def.name,
    };
  }

  toISO(timezone) {
    const { year, month, day, hour, minute, second, timezoneSign, timezoneHour, timezoneMinute } = this.get(timezone);
    return `${year}-${month}-${day}T${hour}:${minute}:${second}${timezoneSign}${timezoneHour}:${timezoneMinute}`;
  }

  toDateText(timezone) {
    const { year, month, day } = this.get(timezone);
    return `${year}-${month}-${day}`;
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
    return this.toISO("UTC");
  }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case "string":
        return this.toISO("UTC");
      case "number":
      case "default":
      default:
        return this.toUnixTimeMs();
    }
  }
}

const JpEraDefinitions = [
  {
    name: "R",
    start: DateTime.parse("2019-05-01T00:00:00+09:00"),
    end: DateTime.parse("2100-01-01T00:00:00+09:00"),
  },
  {
    name: "H",
    start: DateTime.parse("1989-01-08T00:00:00+09:00"),
    end: DateTime.parse("2019-05-01T00:00:00+09:00"),
  },
  {
    name: "S",
    start: DateTime.parse("1926-12-25T00:00:00+09:00"),
    end: DateTime.parse("1989-01-08T00:00:00+09:00"),
  },
  {
    name: "T",
    start: DateTime.parse("1912-07-30T00:00:00+09:00"),
    end: DateTime.parse("1926-12-25T00:00:00+09:00"),
  },
  {
    name: "M",
    start: DateTime.parse("1868-01-25T00:00:00+09:00"),
    end: DateTime.parse("1912-07-30T00:00:00+09:00"),
  },
];

module.exports = { DateTime };
