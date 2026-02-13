import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval + 100));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});
test("Multiple cache entries behave independently", async () => {
  const interval = 300;
  const cache = new Cache(interval);

  const key1 = "https://example.com/1";
  const key2 = "https://example.com/2";

  cache.add(key1, "value1");
  cache.add(key2, "value2");

  expect(cache.get<string>(key1)).toBe("value1");
  expect(cache.get<string>(key2)).toBe("value2");

  await new Promise((resolve) => setTimeout(resolve, interval + 100));

  expect(cache.get<string>(key1)).toBe(undefined);
  expect(cache.get<string>(key2)).toBe(undefined);

  cache.stopReapLoop();
});

