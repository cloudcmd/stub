export function stub<
    Args extends any[] = any[],
>(
    fn?: (...args: Args) => unknown,
): Stub<Args, void>;

export type Stub<
    Args extends unknown[] = unknown[],
    Return = unknown,
> = ((...args: Args) => Return) & {
    called: boolean;
    callId: number;

    args: Args[];
    callCount: number;
    value: Return;

    calledWith: (...args: Args) => boolean;

    calledBefore: (fn: Stub<any, any>) => boolean;
    calledAfter: (fn: Stub<any, any>) => boolean;

    withName: (name: string) => Stub<Args, Return>;

    returns: <T>(value: T) => Stub<Args, T>;
    resolves: <T>(value: T) => Stub<Args, Promise<T>>;

    throws: (error: Error) => Stub<Args, never>;
    rejects: (error: Error) => Stub<Args, Promise<never>>;
};

export function isStub(fn: unknown): fn is Stub;
