import iterativefib from 'iterativefib';
import memofib from 'memofib';
import formulafib from 'formulafib';
import lookupfib from 'lookup';
import range from 'test/helpers/range';

const nsTime = (hrtime) => hrtime[0] * 1e9 + hrtime[1];

const profile = () => {
  const numbers = 80;
  const msg = `Profile with ${ numbers } numbers`;

  const fibGen = iterativefib();
  const fibStart = process.hrtime();
  range(1, numbers).map(() => fibGen.next().value);
  const fibDiff = process.hrtime(fibStart);

  const memoGen = memofib();
  const memoStart = process.hrtime();
  range(1, numbers).map(() => memoGen.next().value);
  const memoDiff = process.hrtime(memoStart);

  const formulaGen = formulafib();
  const formulaStart = process.hrtime();
  range(1, numbers).map(() => formulaGen.next().value);
  const formulaDiff = process.hrtime(formulaStart);

  const lookupGen = lookupfib();
  const lookupStart = process.hrtime();
  range(1, numbers).map(() => lookupGen.next().value);
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
};

profile();
