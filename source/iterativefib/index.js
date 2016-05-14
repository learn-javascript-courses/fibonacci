// Elegant, good precision, but slow.

function* fib (n) {
  const isInfinite = n === undefined;
  let current = 0;
  let next = 1;

  while (isInfinite || n--) {
    yield current;
    [current, next] = [next, current + next];
  }
}

export default fib;
