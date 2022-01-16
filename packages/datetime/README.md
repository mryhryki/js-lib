# @mryhryki/datetime

[![npm version](https://badge.fury.io/js/@mryhryki%2Fdatetime.svg)](https://badge.fury.io/js/@mryhryki%2Fdatetime)

DateTime library for personal use.

## How to use

```javascript
import { DateTime } from '@mryhryki/datetime';

// Parse from DateTime text
const datetime = DateTime.parse('2022-01-16T17:32:39+09:00');

// Parse from UnixTime (Second)
const datetime = DateTime.at(1642321959);

// Parse from UnixTime (MilliSecond)
const datetime = DateTime.atMs(1642321959091);

// Get now DateTime
const datetime = DateTime.now()

// Get ISO8601 format text
datetime.toISO(); // => 2022-01-16T17:32:39+09:00

// Add/Sub time
datetime.add(1, "hour").toISO(); // => 2022-01-16T18:32:39+09:00
datetime.add(-1, "day").toISO(); // => 2022-01-15T17:32:39+09:00

// Get time elements
datetime.get(); /* => {
  year: 2022,
  month: 1,
  day: 16,
  hour: 17,
  minute: 32,
  second: 39,
  milliSecond: 91,
  timezoneSign: "+",
  timezoneHour: 9,
  timezoneMinute: 0,
  weekday: "sun",
  unixTimeSec: 1642321959,
  unixTimeMs: 1642321959091,
} */

// Get clonse
datetime.clone();
```
