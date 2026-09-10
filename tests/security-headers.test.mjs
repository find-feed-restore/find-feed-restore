import assert from "node:assert/strict";
import test from "node:test";
import nextConfig from "../next.config.ts";

test("disables the framework disclosure header", () => {
  assert.equal(nextConfig.poweredByHeader, false);
});

test("defines standard browser security headers for application paths", async () => {
  assert.equal(typeof nextConfig.headers, "function");

  const rules = await nextConfig.headers();
  const globalRule = rules.find((rule) => rule.source === "/:path*");
  assert.ok(globalRule);

  const headers = Object.fromEntries(globalRule.headers.map(({ key, value }) => [key, value]));
  assert.deepEqual(headers, {
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
    "X-Frame-Options": "DENY",
  });
});
