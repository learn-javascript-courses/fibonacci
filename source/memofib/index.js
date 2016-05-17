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
  fib(n);
  yield* memo.slice(0, n + 1);
}

export default gen;
