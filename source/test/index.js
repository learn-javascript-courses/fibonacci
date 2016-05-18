import test from 'tape';

import recursivefib from 'recursivefib';
import iterativefib from 'iterativefib';
import memofib from 'memofib';
import memoRfib from 'memo-recursive';
import formulafib from 'formulafib';
import cappedMemofib from 'capped-memofib';
import lookup from 'lookup';

import range from 'test/helpers/range';

test('recursive fibonacci implementation', assert => {
  const msg = 'should produce the fibonacci sequence';

  const [...actual] = recursivefib(8);

  const expected = [0, 1, 1, 2, 3, 5, 8, 13];

  assert.same(actual, expected, msg);
  assert.end();
});

test('recursive fibonacci infinite', assert => {
  const msg = 'should produce the fibonacci sequence';
  const gen = recursivefib();

  const actual = range(0, 7).map(() => gen.next().value);

  const expected = [0, 1, 1, 2, 3, 5, 8, 13];

  assert.same(actual, expected, msg);
  assert.end();
});


test('iterative fibonacci implementation', assert => {
  const msg = 'should produce the fibonacci sequence';

  const [...actual] = iterativefib(8);

  const expected = [0, 1, 1, 2, 3, 5, 8, 13];

  assert.same(actual, expected, msg);
  assert.end();
});

test('iterative fibonacci infinite', assert => {
  const msg = 'should produce the fibonacci sequence';
  const gen = iterativefib();

  const actual = range(0, 7).map(() => gen.next().value);

  const expected = [0, 1, 1, 2, 3, 5, 8, 13];

  assert.same(actual, expected, msg);
  assert.end();
});

test('memoized fibonacci implementation', nest => {

  nest.test('...first pass', assert => {
    const msg = 'should produce the fibonacci sequence';

    const [...actual] = memofib(8);

    const expected = [0, 1, 1, 2, 3, 5, 8, 13];

    assert.same(actual, expected, msg);
    assert.end();
  });

  nest.test('...2nd pass', assert => {
    const msg = 'should produce the correct sequence twice';

    const [...m5] = memofib(5);
    const [...actual] = memofib(3);

    const expected = [0, 1, 1];
    const m5Expected = [0, 1, 1, 2, 3];

    assert.same(actual, expected, msg);
    assert.same(m5, m5Expected, msg);
    assert.end();
  });
});


test('memoized recursive fibonacci implementation', nest => {

  nest.test('...first pass', assert => {
    const msg = 'should produce the fibonacci sequence';

    const [...actual] = memoRfib(8);

    const expected = [0, 1, 1, 2, 3, 5, 8, 13];

    assert.same(actual, expected, msg);
    assert.end();
  });

  nest.test('...2nd pass', assert => {
    const msg = 'should produce the correct sequence twice';

    const [...m5] = memoRfib(5);
    const [...actual] = memoRfib(3);

    const expected = [0, 1, 1];
    const m5Expected = [0, 1, 1, 2, 3];

    assert.same(actual, expected, msg);
    assert.same(m5, m5Expected, msg);
    assert.end();
  });
});

test('formula fibonacci implementation', assert => {
  const msg = 'should produce the fibonacci sequence';

  const [...actual] = formulafib(8);

  const expected = [0, 1, 1, 2, 3, 5, 8, 13];

  assert.same(actual, expected, msg);
  assert.end();
});

test('formula fibonacci infinite', assert => {
  const msg = 'should produce the fibonacci sequence';
  const gen = formulafib();

  const actual = range(0, 7).map(() => gen.next().value);

  const expected = [0, 1, 1, 2, 3, 5, 8, 13];

  assert.same(actual, expected, msg);
  assert.end();
});

test('formula fibonacci accuracy', assert => {
  const formulagen = formulafib();
  const iterativegen = iterativefib();

  const formula = range(0, 79).map(() => formulagen.next().value);
  const iterative = range(0, 79).map(() => iterativegen.next().value);

  const driftIndex =
    formula.findIndex((n, i) => formula[i] !== iterative[i]) - 1;

  assert.pass(`The formula implementation is accurate
    up to n = ${ driftIndex }`);
  assert.end();
});

test('capped memoized fibonacci implementation', nest => {
  nest.test('...basic implementation', assert => {

    const msg = 'should produce the fibonacci sequence';

    const [...actual] = cappedMemofib(8);

    const expected = [0, 1, 1, 2, 3, 5, 8, 13];

    assert.same(actual, expected, msg);
    assert.end();
  });

  nest.test('...capped n argument', assert => {
    const msg = 'should throw for n > 79';
    assert.throws(() => cappedMemofib(90).next(), Error, msg);
    assert.end();
  });

  nest.test('...capped infinite series', assert => {
    const msg = 'should stop at n = 79';

    const [...series] = cappedMemofib();
    const actual = series.length;
    const expected = 79;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});

test('capped fibonacci lookup', nest => {
  nest.test('...basic implementation', assert => {

    const msg = 'should produce the fibonacci sequence';

    const [...actual] = lookup(8);

    const expected = [0, 1, 1, 2, 3, 5, 8, 13];

    assert.same(actual, expected, msg);
    assert.end();
  });

  nest.test('...capped n argument', assert => {
    const msg = 'should throw for n > 79';
    assert.throws(() => lookup(90).next(), Error, msg);
    assert.end();
  });

  nest.test('...capped infinite series', assert => {
    const msg = 'should stop at n = 79';

    const [...series] = lookup();
    const actual = series.length;
    const expected = 79;

    assert.equal(actual, expected, msg);
    assert.end();
  });
});
