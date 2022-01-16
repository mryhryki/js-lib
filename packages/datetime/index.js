import dayjs from "dayjs";
import UTC from "dayjs/plugin/utc";
import Timezone from "dayjs/plugin/timezone";

dayjs.extend(UTC)
dayjs.extend(Timezone)

export class DateTime {
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
  };

  static at(unixTimeSec) {
    if (typeof unixTimeSec !== "number" || isNaN(unixTimeSec)) {
      throw new Error("DateTime.at: unixTimeSec must be a valid number");
    }
    return new DateTime(dayjs.unix(unixTimeSec));
  };

  static atMs(unixTimeMs) {
    if (typeof unixTimeMs !== "number" || isNaN(unixTimeMs)) {
      throw new Error("DateTime.atMs: unixTime must be a valid number");
    }
    return new DateTime(dayjs(unixTimeMs));
  };

  static now() {
    return new DateTime(dayjs());
  };

  toISO(timezone = "Asia/Tokyo") {
    return this.#value.tz(timezone).format("YYYY-MM-DDTHH:mm:ssZ");
  };

  add(value, unit) {
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error("DateTime.add: value must be a valid number");
    } else if (!this.#units.includes(unit)) {
      throw new Error(`DateTime.add: unit must be one of ${this.#units.join(", ")}`);
    }
    if (unit === "milliSecond") {
      unit = "millisecond"
    }
    return new DateTime(this.#value.add(value, unit));
  }

  get(timezone = "Asia/Tokyo") {
    const value = this.#value.tz(timezone)
    const timeZone = value.format("Z");
    return {
      year: value.year(),
      month: value.month() + 1,
      day: value.date(),
      hour: value.hour(),
      minute: value.minute(),
      second: value.second(),
      milliSecond: value.millisecond(),
      timezoneSign: timeZone.slice(0, 1),
      timezoneHour: parseInt(timeZone.slice(1, 3), 10),
      timezoneMinute: parseInt(timeZone.slice(4, 7), 10),
      weekday: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][value.day()],
      unixTimeSec: value.unix(),
      unixTimeMs: value.valueOf(),
    };
  };

  clone() {
    return new DateTime(this.#value);
  };
}
