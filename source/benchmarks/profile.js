import iterativefib from 'iterativefib';
import memofib from 'memofib';
import formulafib from 'formulafib';
import lookupfib from 'lookup';
import range from 'test/helpers/range';

const logInfo = (msg) => {
  if (process.env.DEBUG) console.log(msg);
};

const nsTime = (hrtime) => hrtime[0] * 1e9 + hrtime[1];

const profile = () => {
  const numbers = 79;
  const msg = `Profile with ${ numbers } numbers`;
  const results = {};

  const fibGen = iterativefib();
  const fibStart = process.hrtime();
  results.iterative = range(1, numbers).map(() => fibGen.next().value);
  const fibDiff = process.hrtime(fibStart);

  const memoGen = memofib();
  const memoStart = process.hrtime();
  results.memoized = range(1, numbers).map(() => memoGen.next().value);
  const memoDiff = process.hrtime(memoStart);

  const formulaGen = formulafib();
  const formulaStart = process.hrtime();
  results.formula = range(1, numbers).map(() => formulaGen.next().value);
  const formulaDiff = process.hrtime(formulaStart);

  const lookupGen = lookupfib();
  const lookupStart = process.hrtime();
  results.lookup = range(1, numbers).map(() => lookupGen.next().value);
  const lookupDiff = process.hrtime(lookupStart);

  const original = nsTime(fibDiff);
  const memoized = nsTime(memoDiff);
  const formula = nsTime(formulaDiff);
  const lookup = nsTime(lookupDiff);

  console.log(msg);
  console.log(`
    original: ${ original }ns
    memoized: ${ memoized }ns
    formula:  ${ formula }ns
    lookup:   ${ lookup }ns
  `);

  logInfo(results);
};

profile();
