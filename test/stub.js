'use strict';

const test = require('tape');
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

