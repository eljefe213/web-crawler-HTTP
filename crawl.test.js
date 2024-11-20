const { normalizeUrl } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl", () => {
  const input = "";
  const actual = normalizeUrl(input);
  const expected = "";
  expect(actual).toEqual(expected);
});
