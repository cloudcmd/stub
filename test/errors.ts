import {
    stub,
    isStub,
} from '../lib/stub.js';

// THROWS Type 'Stub' is not assignable to type 'string'.
const a: string = stub();

const fn = stub();
fn(a);

fn.called;

// THROWS Type 'boolean' is not assignable to type 'string'.
const b: string = fn.calledWith();

// THROWS Type 'Boolean' is not assignable to type 'number'.
const c: number = isStub(fn);

fn(b, c);
