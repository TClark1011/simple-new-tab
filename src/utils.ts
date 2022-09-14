import { A, flow, O, pipe } from "@mobily/ts-belt";

export const randomInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

export const takeRandom = flow(A.shuffle, A.head, O.toUndefined);

export const takeRandomUntilSatisfied = <T>(
	arr: T[],
	predicate: (item: T) => boolean,
) => pipe(arr, A.shuffle, A.find(predicate), O.toUndefined);
