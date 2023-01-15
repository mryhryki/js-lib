# @mryhryki/datetime

[![npm version](https://badge.fury.io/js/@mryhryki%2Fdatetime.svg)](https://badge.fury.io/js/@mryhryki%2Fdatetime)

DateTime library for personal use.

## How to use

```javascript
import { DateTime } from '@mryhryki/datetime';

// Get now DateTime
const datetime = DateTime.now()

// Parse from DateTime text
const datetime = DateTime.parse('2022-01-16T17:32:39+09:00');

// Parse from UnixTime (Second)
const datetime = DateTime.at(1642321959);

// Parse from UnixTime (MilliSecond)
const datetime = DateTime.atMs(1642321959091);

// Get ISO8601 format text
datetime.toISO("Asia/Tokyo"); // => "2022-01-16T17:32:39+09:00"
datetime.toString();          // => "2022-01-16T08:32:39+00:00" (UTC)

// Get date text
datetime.toDateText("Asia/Tokyo"); // => "2022-01-16"

// Get unix time
datetime.toUnixTime("Asia/Tokyo");   // => 1642321959
datetime.toUnixTimeMs("Asia/Tokyo"); // => 1642321959000

// Add/Sub time
datetime.add(1, "year").toISO("Asia/Tokyo");    // => "2023-01-16T17:32:39+09:00"
datetime.add(1, "month").toISO("Asia/Tokyo");   // => "2022-02-16T17:32:39+09:00"
datetime.add(1, "day").toISO("Asia/Tokyo");     // => "2022-01-17T17:32:39+09:00"
datetime.add(-1, "hour").toISO("Asia/Tokyo");   // => "2022-01-16T16:32:39+09:00"
datetime.add(-1, "minute").toISO("Asia/Tokyo"); // => "2022-01-16T17:31:39+09:00"
datetime.add(-1, "second").toISO("Asia/Tokyo"); // => "2022-01-16T17:32:38+09:00"
datetime.add(-1, "milliSecond").toUnixTimeMs(); // => 1642321958999

// Set time
datetime.set("year", 2020).toISO("Asia/Tokyo"); // => "2020-01-16T17:32:39+09:00"
datetime.set("month", 12).toISO("Asia/Tokyo");  // => "2022-12-16T17:32:39+09:00"
datetime.set("day", 1).toISO("Asia/Tokyo");     // => "2022-01-01T17:32:39+09:00"
datetime.set("hour", 3).toISO("Asia/Tokyo");    // => "2022-01-16T03:32:39+09:00"
datetime.set("minute", 1).toISO("Asia/Tokyo");  // => "2022-01-16T17:01:39+09:00"
datetime.set("second", 1).toISO("Asia/Tokyo");  // => "2022-01-16T17:32:01+09:00"
datetime.set("milliSecond", 1).toUnixTimeMs();  // => 1642321959001

// Get time elements
datetime.get("Asia/Tokyo"); /* => {
  "year": "2022",
  "month": "01",
  "day": "16",
  "hour": "17",
  "minute": "32",
  "second": "39",
  "milliSecond": "000",
  "timezoneSign": "+",
  "timezoneHour": "09",
  "timezoneMinute": "00",
  "weekOfYear": 4,
  "weekday": "sun"
}
*/

// Get clonse
datetime.clone();
```
