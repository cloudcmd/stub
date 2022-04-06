# Stub [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@cloudcmd/stub.svg?style=flat&longCache=true
[BuildStatusURL]: https://github.com/coderaiser/putout/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/putout/workflows/Node%20CI/badge.svg
[NPMURL]: https://npmjs.org/package/@cloudcmd/stub "npm"
[CoverageURL]: https://coveralls.io/github/cloudcmd/stub?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/cloudcmd/stub/badge.svg?branch=master&service=github

Simplest [sinon.stub()](https://sinonjs.org/) alternative. With support of showing diff on `calleddWith`.

## Install

```
npm i @cloudcmd/stub
```

## API

### stub([impl])

- `impl` - stub implementation

```js
const stub = require('@cloudcmd/stub');
const fn = stub();
// fn contains stubbed function

const asyncFn = stub(async () => {
    throw Error('hi');
});

// asyncFn contains stub async function
```

### stub().returns([value])

```js
const fn = stub().returns('hello');
fn();
// returns
'hello';
```

### stub().throws([error])

```js
const fn = stub().throws(Error('hello'));
fn();
// throws
Error('hello');
```

### stub().rejects([error])

```js
const fn = stub().rejects(Error('hello'));
await fn();
// rejects
Error('hello');
```

### stub().resolves([values])

```js
const fn = stub().resolves('hello');
await fn();
// resolves
'hello';
```

### stub().calledWith([args])

```js
const fn = stub();

fn('hello', 'world');

fn.calledWith('hello', 'world');
// returns true
```

### stub().calledWithNew()

```js
const fn = stub();

new fn();

fn.calledWithNew();
// returns
true;
```

### stub().calledBefore(fn)

```js
const fn1 = stub();
const fn2 = stub();

fn1();
fn2();

fn1.calledBefore(fn2);
// returns
true;
```

### stub().calledAfter(fn)

```js
const fn1 = stub();
const fn2 = stub();

fn1();
fn2();

fn2.calledAfter(fn1);
// returns
true;
```

### stub().called

```js
const fn = stub();

fn.called;
// returns
false;

fn();

fn.called;
// returns
true;
```

### stub().callCount

```js
const fn = stub();

fn.callCount;
// returns
0;

fn();

fn.callCount;
// returns
1;
```

### stub().args

```js
const fn = stub();

fn.args;
// returns
[];

fn(1);

fn.args;
// returns
[[1]];
```

### stub().callId

Each `stub` has it `callId`, which can be used to determine order of `stub` calls:

```js
const fn1 = stub();
const fn2 = stub();

fn1();
fn2();

fn1.callId;
// returns
1;

fn2.callId;
// returns
2;
```

### isStub(fn)

Check if provided function is stub.

```js
const {stub, isStub} = require('@cloudcmd/stub');
const fn = stub();

isStub(fn);
// returns
true;

isStub(() => {});
// returns
false;
```

## Related

- [sinon-called-with-diff](https://github.com/coderaiser/sinon-called-with-diff) - sinon `calledWith` diff
- [try-to-tape](https://github.com/coderaiser/try-to-tape) - `try catch` for async tape tests
- [try-catch](https://github.com/coderaiser/try-catch "TryCatch") - functional try-catch wrapper.
- [try-to-catch](https://github.com/coderaiser/try-to-catch "TryToCatch") - functional try-catch wrapper for promises.

## License

MIT
