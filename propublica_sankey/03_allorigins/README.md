# Method 03 — allorigins (keyless proxy)

**What it tries:** a different, keyless proxy. Uses the `/get` endpoint, which returns the real
payload inside a `contents` field as a string, so the code `JSON.parse`es it.

**What happened:** `522` (Cloudflare "upstream timed out") and intermittent failures. When the
proxy itself falls over it never attaches the CORS header, so a CORS error can appear on top.

**Verdict:** works sometimes, fails often. Free public proxies are too flaky to build on, even
when the technique is sound.
