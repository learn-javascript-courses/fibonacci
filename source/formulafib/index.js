// Cool, & fast, but has floating point precision errors after n = 75.

const sqrt = Math.sqrt;
const pow = Math.pow;

const fibCalc = n => Math.round(
  (1 / sqrt(5)) *
  (
    pow(((1 + sqrt(5)) / 2), n) -
    pow(((1 - sqrt(5)) / 2), n)
  )
);

function* fib (n) {
  const isInfinite = n === undefined;
  let current = 0;

  while (isInfinite || n--) {
    yield fibCalc(current);
    current++;
  }
}

export default fib;
