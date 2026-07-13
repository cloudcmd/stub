import {stub, isStub} from '../lib/stub.js';

// THROWS Type 'Stub<any[], void>' is not assignable to type 'string'.
const a: string = stub();

const fn = stub();
const fn1 = stub();

fn(a);

fn.called;
fn.callId;

fn.calledBefore(fn1);
fn.calledAfter(fn1);
fn.withName('hello');

// THROWS Type 'boolean' is not assignable to type 'string'.
const b: string = fn.calledWith();

// THROWS Type 'boolean' is not assignable to type 'number'.
const c: number = isStub(fn);

fn(b, c);

type Log = (message: string) => void;

const log = stub<[string]>();

const typedLog: Log = log;

typedLog('hello');

