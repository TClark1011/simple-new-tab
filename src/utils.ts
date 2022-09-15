import { A, flow, N, O, pipe } from "@mobily/ts-belt";

export const randomInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

export const takeRandom = flow(A.shuffle, A.head, O.toUndefined);

export const takeRandomUntilSatisfied = <T>(
	arr: T[],
	predicate: (item: T) => boolean,
) => pipe(arr, A.shuffle, A.find(predicate), O.toUndefined);

export const mean = (arr: number[]) =>
	pipe(arr, A.reduce(0, N.add), N.divide(arr.length));

export const asAsync =
	<Params extends unknown[], Return>(
		fn: (...p: Params) => Return,
	): ((...p: Params) => Promise<Return>) =>
	(...p: Params) =>
		(async () => fn(...p))();

export const runIfParamIsDefined =
	<Param, Return>(fn: (p: Exclude<Param, undefined>) => Return) =>
	(p: Param | undefined): Return | undefined =>
		p && fn(p as never);

export const then =
	<Input, Output>(callback: (p: Input) => Output) =>
	(promise: Promise<Input>) =>
		promise.then(callback);
