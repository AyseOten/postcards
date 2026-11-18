# AI workflow: real examples

Postcards is built with Claude Code using the process in the [README](../README.md#how-i-built-it): spec first, a plan approved before coding, tests for every change in `packages/core` and `packages/data`, and review of every diff. This file records real moments from that process, both when it went right and when the agent was wrong.

---

## 1. A test caught a wrong assumption about Kosovo's code

**When:** 2026-11-18, PR [#4](https://github.com/AyseOten/postcards/pull/4) (country reference data, SPEC.md §4)

### Situation

The agent generated country data for 197 markable countries from two MIT datasets (`countries-list`, `i18n-iso-countries`). Each country carries an ISO 3166-1 numeric code, which is later used to match map shapes from `world-atlas`. Following CLAUDE.md ("write tests for every change in `packages/core`"), it wrote data-integrity tests over the whole list along with the code.

### The agent's assumption

Kosovo's alpha-2 code `XK` is user-assigned and not part of ISO 3166-1. The agent reasoned that Kosovo would therefore have **no numeric code** either, and wrote the tests to expect that:

```ts
it('has a unique 3-digit numeric code for every country except Kosovo', () => {
  const withCode = countries.filter((country) => country.numericCode !== undefined);
  expect(withCode.map((c) => c.code)).not.toContain('XK');
  // ...
});

it('returns Kosovo without a numeric code', () => {
  expect(getCountry('XK')?.numericCode).toBeUndefined();
});
```

The same assumption was written into two doc comments ("Missing for XK").

### What the tests caught

The first test run, before anything was committed, failed both tests:

```text
● listCountries › has a unique 3-digit numeric code for every country except Kosovo
    expect(received).not.toContain(expected) // indexOf
    Expected value: not "XK"

● getCountry › returns Kosovo without a numeric code
    expect(received).toBeUndefined()
    Received: "983"

Tests: 2 failed, 275 passed, 277 total
```

`i18n-iso-countries` does give Kosovo a numeric code, `983`, which is also user-assigned and not ISO.

### Solution

The agent checked the source data first, to decide whether the data or the test was wrong. The data was right and the expectation was wrong. So it:

- changed the tests to the real rule: every one of the 197 countries has a unique 3-digit numeric code, and Kosovo's is `983`;
- corrected the two doc comments ("`983` for XK is user-assigned, not ISO");
- noted in the PR that matching `983` to the map has to be checked in the map-geometry PR.

The data and the generator did not change. The next run passed: 277 of 277.

That follow-up check later found where Kosovo really is missing. In `world-atlas` (countries-110m), the Kosovo shape has no id at all, and neither do Northern Cyprus and Somaliland. They will need an explicit, tested mapping in the map-geometry PR.

### Lesson

- **Edge cases sit in the "special" entries.** Kosovo, Taiwan, Palestine and territories break the rules that hold for the other 190+ countries. Tests that run over the whole list find these quickly; spot checks on a few familiar countries would not.
- **The agent's reasoning can be plausible and still wrong.** "Not ISO, so no numeric code" sounded logical. Only checking against the real data showed otherwise.
- **A failing test does not say which side is wrong.** The fix was to look at the source first, not to change the data until the test passed or to delete the test.
- **Write down what a fix leaves open.** The PR noted the open question (does the map know `983`?), and the next check answered it.
