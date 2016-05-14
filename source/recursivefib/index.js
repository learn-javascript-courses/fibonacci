// Slow. Call stack will blow eventually.

function* fib (n, current = 0, next = 1) {
  if (n === 0) {
    return 0;
  }

  yield current;
  yield* fib(n - 1, next, current + next);
}

export default fib;
