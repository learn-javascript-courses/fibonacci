const memo = [0, 1];

const fib = (n) =>
  memo[n] !== undefined ? memo[n] :
  memo[n] = fib(n - 1) + fib(n - 2);

function* gen (n = 79) {
  if (n > 79) throw new Error('Accurate values are not available for n > 79.');
  fib(n);
  yield* memo.slice(0, n);
}

export default gen;
