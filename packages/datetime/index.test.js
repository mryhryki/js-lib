import { DateTime } from "./index";

const ISO8601 = "2022-01-16T17:32:39+09:00";
const ISO8601Ms = "2022-01-16T17:32:39.091+09:00";
const UnixTimeSec = 1642321959;
const UnixTimeMs = 1642321959091;

const year = 2022;
const month = 1;
const day = 16;
const hour = 17;
const minute = 32;
const second = 39;
const milliSecond = 91;
const timezoneSign = "+";
const timezoneHour = 9;
const timezoneMinute = 0;
const weekday = "sun";
const unixTimeSec = UnixTimeSec;
const unixTimeMs = UnixTimeMs;

describe("parse()", () => {
  it("valid dateTimeText", () => {
    const datetime = DateTime.parse(ISO8601Ms);
    expect(datetime.toISO()).toBe(ISO8601);
  });
});

describe("at()", () => {
  it("valid UnixTimeSec", () => {
    const datetime = DateTime.at(UnixTimeSec);
    expect(datetime.get().unixTimeSec).toBe(UnixTimeSec);
  });
});

describe("atMs()", () => {
  it("valid UnixTimeMs", () => {
    const datetime = DateTime.atMs(UnixTimeMs);
    expect(datetime.get().unixTimeMs).toBe(UnixTimeMs);
  });
});

describe("now()", () => {
  it("valid UnixTimeMs", () => {
    const now = Math.trunc((new Date()).getTime() / 1000);
    const datetime = DateTime.now();
    expect(datetime.get().unixTimeSec).toBe(now);
  });
});

describe("toISO()", () => {
  it("from ISO8601 Text", () => {
    const datetime = DateTime.parse(ISO8601Ms);
    expect(datetime.toISO()).toBe(ISO8601);
  });

  it("from UnixTimeSec", () => {
    const datetime = DateTime.at(UnixTimeSec);
    expect(datetime.toISO()).toBe(ISO8601);
  });

  it("from UnixTimeMs", () => {
    const datetime = DateTime.atMs(UnixTimeMs);
    expect(datetime.toISO()).toBe(ISO8601);
  });
});

describe("get()", () => {
  it("from ISO8601 Text", () => {
    const element = DateTime.parse(ISO8601Ms).get();
    expect(element.year).toBe(year);
    expect(element.month).toBe(month);
    expect(element.day).toBe(day);
    expect(element.hour).toBe(hour);
    expect(element.minute).toBe(minute);
    expect(element.second).toBe(second);
    expect(element.milliSecond).toBe(milliSecond);
    expect(element.timezoneSign).toBe(timezoneSign);
    expect(element.timezoneHour).toBe(timezoneHour);
    expect(element.timezoneMinute).toBe(timezoneMinute);
    expect(element.weekday).toBe(weekday);
    expect(element.unixTimeSec).toBe(unixTimeSec);
    expect(element.unixTimeMs).toBe(unixTimeMs);
  });

  it("from UnixTimeSec", () => {
    const element = DateTime.at(UnixTimeSec).get();
    expect(element.year).toBe(year);
    expect(element.month).toBe(month);
    expect(element.day).toBe(day);
    expect(element.hour).toBe(hour);
    expect(element.minute).toBe(minute);
    expect(element.second).toBe(second);
    expect(element.milliSecond).toBe(0);
    expect(element.timezoneSign).toBe(timezoneSign);
    expect(element.timezoneHour).toBe(timezoneHour);
    expect(element.timezoneMinute).toBe(timezoneMinute);
    expect(element.weekday).toBe(weekday);
    expect(element.unixTimeSec).toBe(unixTimeSec);
    expect(element.unixTimeMs).toBe(unixTimeSec * 1000);
  });

  it("from UnixTimeMs", () => {
    const element = DateTime.atMs(UnixTimeMs).get();
    expect(element.year).toBe(year);
    expect(element.month).toBe(month);
    expect(element.day).toBe(day);
    expect(element.hour).toBe(hour);
    expect(element.minute).toBe(minute);
    expect(element.second).toBe(second);
    expect(element.milliSecond).toBe(milliSecond);
    expect(element.timezoneSign).toBe(timezoneSign);
    expect(element.timezoneHour).toBe(timezoneHour);
    expect(element.timezoneMinute).toBe(timezoneMinute);
    expect(element.weekday).toBe(weekday);
    expect(element.unixTimeSec).toBe(unixTimeSec);
    expect(element.unixTimeMs).toBe(unixTimeMs);
  });
});

describe("add()", () => {
  it("add all 1", () => {
    const element = DateTime.parse(ISO8601Ms).add(1, "year").add(1, "month").add(1, "day").add(1, "hour").add(1, "minute").add(1, "second").add(1, "milliSecond").get();
    expect(element.year).toBe(year + 1);
    expect(element.month).toBe(month + 1);
    expect(element.day).toBe(day + 1);
    expect(element.hour).toBe(hour + 1);
    expect(element.minute).toBe(minute + 1);
    expect(element.second).toBe(second + 1);
    expect(element.milliSecond).toBe(milliSecond + 1);
  });
});

describe("clone()", () => {
  it("same value but not same instance", () => {
    const datetime1 = DateTime.parse(ISO8601);
    const datetime2 = datetime1.clone();
    expect(datetime1.get().unixTimeMs).toBe(datetime2.get().unixTimeMs);
    expect(datetime1.add(1, "second").get().second).not.toBe(datetime2.get().second);
  });
});
