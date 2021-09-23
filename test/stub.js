'use strict';

const test = require('supertape');
const tryToCatch = require('try-to-catch');
const tryCatch = require('try-catch');
const {reRequire} = require('mock-require');
const stub = require('..');

const noop = () => {};

test('stub: called', (t) => {
    const fn = stub();
    
    fn();
    
    t.ok(fn.called);
    t.end();
});

test('stub: not called', (t) => {
    const fn = stub();
    
    t.notOk(fn.called, 'should not call');
    t.end();
});

test('stub: called: await', async (t) => {
    const fn = stub(async () => 'hello');
    
    await fn();
    
    t.ok(fn.called);
    t.end();
});

test('stub: called: await: result', async (t) => {
    const fn = stub(async () => 'hello');
    
    const result = await fn();
    
    t.equal(result, 'hello');
    t.end();
});

test('stub: called: await: throw', async (t) => {
    const fn = stub(async (a) => {
        throw Error(a);
    });
    
    const [e] = await tryToCatch(fn, 'hello');
    
    t.equal(e.message, 'hello');
    t.end();
});

test('stub: calledWith', (t) => {
    const fn = stub();
    
    fn('hello');
    
    const result = fn.calledWith('hello');
    
    t.ok(result, 'should check condition');
    t.end();
});

test('stub: calledWith: different', async (t) => {
    const fn = stub();
    
    stub.setLog(stub());
    
    await fn('world');
    const result = fn.calledWith('hello');
    
    stub.setLog(console.log);
    
    t.notOk(result, 'should check condition');
    t.end();
});

test('stub: calledWith: not called', (t) => {
    const {log} = console;
    console.log = noop;
    
    reRequire('../lib/called-with');
    const stub = reRequire('..');
    
    const fn = stub();
    
    console.log = log;
    
    t.notOk(fn.calledWith('hello'), 'should check sondition');
    t.end();
});

test('stub: returns', (t) => {
    const fn = stub().returns('hello');
    
    const result = fn();
    
    t.equal(result, 'hello');
    t.end();
});

test('stub: calledWithNew', (t) => {
    const fn = stub();
    
    new fn();
    
    t.ok(fn.calledWithNew(), 'should be called with new');
    t.end();
});

test('stub: calledWithNew: no', (t) => {
    const fn = stub();
    
    fn();
    
    t.notOk(fn.calledWithNew(), 'should not be called with new');
    t.end();
});

test('stub: args', (t) => {
    const fn = stub();
    
    fn(1, 2);
    fn('hello', 'world');
    
    t.deepEqual(fn.args, [[1, 2], ['hello', 'world']], 'should equal');
    t.end();
});

test('stub: args: no', (t) => {
    const fn = stub();
    
    t.deepEqual(fn.args, [], 'should equal');
    t.end();
});

test('stub: callCount', (t) => {
    const fn = stub();
    
    fn();
    fn();
    fn();
    
    t.equal(fn.callCount, 3);
    t.end();
});

test('stub: callCount: not called', (t) => {
    const fn = stub();
    
    t.equal(fn.callCount, 0);
    t.end();
});

test('stub: throws', (t) => {
    const fn = stub().throws('hello');
    
    const [e] = tryCatch(fn);
    
    t.equal(e, 'hello');
    t.end();
});

test('stub: rejects', async (t) => {
    const fn = stub().rejects('hello');
    const catcher = stub();
    
    await fn().catch(catcher);
    
    t.calledWith(catcher, ['hello']);
    t.end();
});

test('stub: resolves', async (t) => {
    const fn = stub().resolves('hello');
    const catcher = stub();
    
    await fn().then(catcher);
    
    t.calledWith(catcher, ['hello']);
    t.end();
});

test('stub: callId: before', (t) => {
    const init = stub();
    const show = stub();
    
    init();
    show();
    
    t.ok(init.callId < show.callId);
    t.end();
});

test('stub: callId: after', (t) => {
    const init = stub().withName('init');
    const show = stub().withName('show');
    
    show();
    init();
    
    t.notOk(init.callId < show.callId);
    t.end();
});

test('stub: calledAfter', (t) => {
    const init = stub().withName('init');
    const show = stub().withName('show');
    
    init();
    show();
    
    t.ok(show.calledAfter(init));
    t.end();
});

test('stub: calledBefore', (t) => {
    const init = stub().withName('init');
    const show = stub().withName('show');
    
    init();
    show();
    
    t.ok(init.calledBefore(show));
    t.end();
});

test('stub: isStub', (t) => {
    const fn = stub();
    
    t.ok(stub.isStub(fn), 'should be stub');
    t.end();
});

test('stub: isStub: no', (t) => {
    const fn = () => {};
    
    t.notOk(stub.isStub(fn), 'should not to be stub');
    t.end();
});

test('stub: isStub: no arg', (t) => {
    t.notOk(stub.isStub(), 'should not to be stub');
    t.end();
});

