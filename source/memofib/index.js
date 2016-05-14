// Fast and correct.

const memo = [];

function* fib (n) {
  if (memo[n]) yield memo[n];

  const isInfinite = n === undefined;
  let current = 0;
  let next = 1;

  while (isInfinite || n--) {
    memo[n] = current;
    yield current;
    [current, next] = [next, current + next];
  }
}

export default fib;
