const memo = [];

function* fib (n) {
  if (n > 80) throw new Error('Accurate results are not available for n > 80.');
  if (memo[n]) yield memo[n];

  const isInfinite = n === undefined;
  let current = 0;
  let next = 1;
  if (isInfinite) n = 0;

  while (isInfinite || n--) {
    memo[n] = current;
    if (n === 80) return current;
    yield current;
    [current, next] = [next, current + next];
    if (isInfinite) n++;
  }
}

export default fib;
