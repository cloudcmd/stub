export type Stub = Function & {
    called: boolean;
    args: unknown[];
    callCount: number;
    value: unknown;
    calledWith: (...args: unknown[]) => boolean;
    throws: (error: Error) => Stub;
    rejects: (error: Error) => Promise<Stub>;
    resolves: (value: unknown) => Stub;
    returns: (value: unknown) => Stub;
}

export function stub(fn?: Function): Stub;
export function isStub(fn: Stub | Function): Boolean;
