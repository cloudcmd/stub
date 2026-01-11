import calledWith from './called-with.js';

const noop = () => {};

const MARK = 'stub';

export const isStub = (fn) => fn && fn.__watermark === MARK;
const counter = (i = 0) => () => ++i;
const next = counter();

const {defineProperty} = Object;
let {log} = console;

export default stub;

export const setLog = (fn) => log = fn;

export function stub(impl = noop) {
    let args = [];
    let calledWithNew = false;
    
    const returns = {
        called: false,
    };
    
    const fn = function anonymous(...a) {
        args = a;
        fn.called = true;
        fn.callId = next();
        fn.args.push(a);
        ++fn.callCount;
        
        calledWithNew = this instanceof fn;
        
        const result = impl(...a);
        
        if (returns.throwed)
            throw returns.error;
        
        if (returns.resolved)
            return Promise.resolve(returns.value);
        
        if (returns.rejected)
            return Promise.reject(returns.error);
        
        if (returns.called)
            return returns.value;
        
        return result;
    };
    
    fn.args = [];
    fn.called = false;
    fn.callCount = 0;
    fn.calledWith = (...calledArgs) => calledWith({
        log,
        args,
        called: fn.called,
        calledArgs,
    });
    
    fn.calledWithNew = () => calledWithNew;
    
    fn.throws = (error) => {
        returns.throwed = true;
        returns.error = error;
        
        return fn;
    };
    
    fn.rejects = (error) => {
        returns.rejected = true;
        returns.error = error;
        return fn;
    };
    
    fn.resolves = (value) => {
        returns.resolved = true;
        returns.value = value;
        return fn;
    };
    
    fn.returns = (value) => {
        returns.called = true;
        returns.value = value;
        
        return fn;
    };
    
    fn.withName = (value) => {
        defineProperty(fn, 'name', {
            value,
        });
        
        return fn;
    };
    
    fn.calledBefore = (f) => fn.callId < f.callId;
    fn.calledAfter = (f) => fn.callId > f.callId;
    
    fn.__watermark = MARK;
    
    return fn;
}
