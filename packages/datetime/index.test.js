import { DateTime } from "./index";

const TimeZone = "Asia/Tokyo";

const ISO8601 = "2022-01-16T17:32:39+09:00";
const ISO8601Ms = "2022-01-16T17:32:39.091+09:00";
const UnixTimeSec = 1642321959;
const UnixTimeMs = 1642321959091;

const year = "2022";
const month = "01";
const day = "16";
const hour = "17";
const minute = "32";
const second = "39";
const milliSecond = "091";
const timezoneSign = "+";
const timezoneHour = "09";
const timezoneMinute = "00";
const weekOfYear = 4;
const weekday = "sun";
const padZero = (num, len) => String(num).padStart(len, "0");

describe("parse()", () => {
  it("valid dateTimeText", () => {
    const datetime = DateTime.parse(ISO8601Ms);
    expect(datetime.toISO()).toBe(ISO8601);
  });

  it("invalid dateTimeText", () => {
    expect(() => DateTime.parse("hEPDKoWojaKdQrnyXCYq")).toThrow("Invalid Value");
  });
});

describe("at()", () => {
  it("valid UnixTimeSec", () => {
    const datetime = DateTime.at(UnixTimeSec);
    expect(datetime.toUnixTime()).toBe(UnixTimeSec);
  });
});

describe("atMs()", () => {
  it("valid UnixTimeMs", () => {
    const datetime = DateTime.atMs(UnixTimeMs);
    expect(datetime.toUnixTimeMs()).toBe(UnixTimeMs);
  });
});

describe("now()", () => {
  it("valid UnixTimeMs", () => {
    const now = Math.trunc(new Date().getTime() / 1000);
    const datetime = DateTime.now();
    expect(datetime.toUnixTime()).toBe(now);
  });
});

describe("toISO()", () => {
  it("from ISO8601 Text", () => {
    const datetime = DateTime.parse(ISO8601);
    expect(datetime.toISO()).toBe(ISO8601);
  });

  it("from ISO8601Ms Text", () => {
    const datetime = DateTime.parse(ISO8601Ms);
    expect(datetime.toUnixTime()).toBe(UnixTimeSec);
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

describe("toUnixTime()", () => {
  it("from ISO8601 Text", () => {
    const datetime = DateTime.parse(ISO8601);
    expect(datetime.toUnixTime()).toBe(UnixTimeSec);
  });

  it("from ISO8601Ms Text", () => {
    const datetime = DateTime.parse(ISO8601Ms);
    expect(datetime.toUnixTime()).toBe(UnixTimeSec);
  });

  it("from UnixTimeSec", () => {
    const datetime = DateTime.at(UnixTimeSec);
    expect(datetime.toUnixTime()).toBe(UnixTimeSec);
  });

  it("from UnixTimeMs", () => {
    const datetime = DateTime.atMs(UnixTimeMs);
    expect(datetime.toUnixTime()).toBe(UnixTimeSec);
  });
});

describe("toUnixTimeMs()", () => {
  it("from ISO8601 Text", () => {
    const datetime = DateTime.parse(ISO8601);
    expect(datetime.toUnixTimeMs()).toBe(UnixTimeSec * 1000);
  });

  it("from ISO8601Ms Text", () => {
    const datetime = DateTime.parse(ISO8601Ms);
    expect(datetime.toUnixTimeMs()).toBe(UnixTimeMs);
  });

  it("from UnixTimeSec", () => {
    const datetime = DateTime.at(UnixTimeSec);
    expect(datetime.toUnixTimeMs()).toBe(UnixTimeSec * 1000);
  });

  it("from UnixTimeMs", () => {
    const datetime = DateTime.atMs(UnixTimeMs);
    expect(datetime.toUnixTimeMs()).toBe(UnixTimeMs);
  });
});

describe("get()", () => {
  it("from ISO8601 Text", () => {
    const element = DateTime.parse(ISO8601).get(TimeZone);
    expect(element.year).toBe(year);
    expect(element.month).toBe(month);
    expect(element.day).toBe(day);
    expect(element.hour).toBe(hour);
    expect(element.minute).toBe(minute);
    expect(element.second).toBe(second);
    expect(element.milliSecond).toBe("000");
    expect(element.timezoneSign).toBe(timezoneSign);
    expect(element.timezoneHour).toBe(timezoneHour);
    expect(element.timezoneMinute).toBe(timezoneMinute);
    expect(element.weekOfYear).toBe(weekOfYear);
    expect(element.weekday).toBe(weekday);
  });

  it("from ISO8601Ms Text", () => {
    const element = DateTime.parse(ISO8601Ms).get(TimeZone);
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
    expect(element.weekOfYear).toBe(weekOfYear);
    expect(element.weekday).toBe(weekday);
  });

  it("from UnixTimeSec", () => {
    const element = DateTime.at(UnixTimeSec).get(TimeZone);
    expect(element.year).toBe(year);
    expect(element.month).toBe(month);
    expect(element.day).toBe(day);
    expect(element.hour).toBe(hour);
    expect(element.minute).toBe(minute);
    expect(element.second).toBe(second);
    expect(element.milliSecond).toBe("000");
    expect(element.timezoneSign).toBe(timezoneSign);
    expect(element.timezoneHour).toBe(timezoneHour);
    expect(element.timezoneMinute).toBe(timezoneMinute);
    expect(element.weekOfYear).toBe(weekOfYear);
    expect(element.weekday).toBe(weekday);
  });

  it("from UnixTimeMs", () => {
    const element = DateTime.atMs(UnixTimeMs).get(TimeZone);
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
    expect(element.weekOfYear).toBe(weekOfYear);
    expect(element.weekday).toBe(weekday);
  });
});

describe("add()", () => {
  it("add all 1", () => {
    const element = DateTime.parse(ISO8601Ms)
      .add(1, "year")
      .add(1, "month")
      .add(1, "day")
      .add(1, "hour")
      .add(1, "minute")
      .add(1, "second")
      .add(1, "milliSecond")
      .get(TimeZone);
    expect(element.year).toBe(padZero(parseInt(year, 10) + 1, 4));
    expect(element.month).toBe(padZero(parseInt(month, 10) + 1, 2));
    expect(element.day).toBe(padZero(parseInt(day, 10) + 1, 2));
    expect(element.hour).toBe(padZero(parseInt(hour, 10) + 1, 2));
    expect(element.minute).toBe(padZero(parseInt(minute, 10) + 1, 2));
    expect(element.second).toBe(padZero(parseInt(second, 10) + 1, 2));
    expect(element.milliSecond).toBe(padZero(parseInt(milliSecond, 10) + 1, 3));
  });
});

describe("set()", () => {
  it("set all 1", () => {
    const element = DateTime.parse(ISO8601Ms)
      .set("year", 1999)
      .set("month", 1)
      .set("day", 1)
      .set("hour", 1)
      .set("minute", 1)
      .set("second", 1)
      .set("milliSecond", 1)
      .get(TimeZone);
    expect(element.year).toBe(padZero(1999, 4));
    expect(element.month).toBe(padZero(1, 2));
    expect(element.day).toBe(padZero(1, 2));
    expect(element.hour).toBe(padZero(1, 2));
    expect(element.minute).toBe(padZero(1, 2));
    expect(element.second).toBe(padZero(1, 2));
    expect(element.milliSecond).toBe(padZero(1, 3));
  });
});

describe("clone()", () => {
  it("has same value but not same instance", () => {
    const datetime1 = DateTime.parse(ISO8601);
    const datetime2 = datetime1.clone();
    expect(datetime1.toUnixTimeMs()).toBe(datetime2.toUnixTimeMs());
    expect(datetime1).not.toBe(datetime2);
  });
});

describe("JpYear", () => {
  const list = [
    ["1868-01-24T00:00:00+09:00", null], //
    ["1868-01-25T00:00:00+09:00", { name: "M", year: "01" }],
    ["1900-01-01T00:00:00+09:00", { name: "M", year: "33" }],
    ["1912-07-29T00:00:00+09:00", { name: "M", year: "45" }],
    ["1912-07-30T00:00:00+09:00", { name: "T", year: "01" }],
    ["1918-01-01T00:00:00+09:00", { name: "T", year: "07" }],
    ["1926-12-24T00:00:00+09:00", { name: "T", year: "15" }],
    ["1926-12-25T00:00:00+09:00", { name: "S", year: "01" }],
    ["1968-01-07T00:00:00+09:00", { name: "S", year: "43" }],
    ["1989-01-07T00:00:00+09:00", { name: "S", year: "64" }],
    ["1989-01-08T00:00:00+09:00", { name: "H", year: "01" }],
    ["2009-01-08T00:00:00+09:00", { name: "H", year: "21" }],
    ["2019-04-30T00:00:00+09:00", { name: "H", year: "31" }],
    ["2019-05-01T00:00:00+09:00", { name: "R", year: "01" }],
    ["2023-01-01T00:00:00+09:00", { name: "R", year: "05" }],
  ];
  it.each(list)("returns correct values", (iso8601, expectValue) => {
    const result = DateTime.parse(iso8601).getJpEra();
    expect(result).toEqual(expectValue);
  });
});
