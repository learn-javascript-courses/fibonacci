const memo = [0, 1];

const fib = (n) => {
  if (memo[n] !== undefined) return memo[n];

  let current = 0;
  let next = 1;

  for (let i = 0; i < n; i++) {
    memo[i] = current;
    [current, next] = [next, current + next];
  }

  return current;
};

function* gen (n = 79) {
  if (n > 79) throw new Error('Accurate values are not available for n > 79.');
  fib(n);
  yield* memo.slice(0, n);
}

export default gen;
