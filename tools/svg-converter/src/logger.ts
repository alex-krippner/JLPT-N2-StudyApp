import ora from "ora";

interface Logger {
  start(text?: string): unknown;
  stop(): unknown;
  succeed(text?: string): unknown;
  fail(text?: string): unknown;
  warn(text?: string): unknown;
  info(text?: string): unknown;
}

function noop() {}

export function logger(): Logger {
  if (!process.env.CI) return ora();
  return {
    stop: noop,
    start: console.log,
    succeed: console.log,
    fail: console.log,
    warn: console.warn,
    info: console.info,
  };
}
