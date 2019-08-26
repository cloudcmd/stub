'use strict';

const test = require('supertape');
const tryToCatch = require('try-to-catch');
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
    const fn = stub(async () => {
        return 'hello';
    });
    
    await fn();
    
    t.ok(fn.called);
    t.end();
});

test('stub: called: await: result', async (t) => {
    const fn = stub(async () => {
        return 'hello';
    });
    
    const result = await fn();
    
    t.equal(result, 'hello', 'should equal');
    t.end();
});

test('stub: called: await: throw', async (t) => {
    const fn = stub(async (a) => {
        throw Error(a);
    });
    
    const [e] = await tryToCatch(fn, 'hello');
    
    t.equal(e.message, 'hello', 'should equal');
    t.end();
});

test('stub: calledWith', async (t) => {
    const fn = stub();
    
    fn('hello');
    
    t.ok(fn.calledWith('hello'), 'should check sondition');
    t.end();
});

test('stub: calledWith: different', async (t) => {
    const {log} = console;
    console.log = noop;
    
    reRequire('../lib/called-with');
    const stub = reRequire('..');
    
    const fn = stub();
    await fn('world');
    
    console.log = log;
    
    t.notOk(fn.calledWith('hello'), 'should check sondition');
    t.end();
});

test('stub: calledWith: not called', async (t) => {
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
    
    t.equal(result, 'hello', 'should equal');
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
    
    t.equal(fn.callCount, 3, 'should equal');
    t.end();
});

test('stub: callCount: not called', (t) => {
    const fn = stub();
    
    t.equal(fn.callCount, 0, 'should equal');
    t.end();
});

