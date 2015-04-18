declare module "mobservable" {
	interface Lambda {
		(): void;
	}
	interface IObservableValue<T, S> {
		(): T;
		(value: T): S;
		observe(callback: (newValue: T, oldValue: T) => void, fireImmediately:boolean): Lambda;
	}

	export function array<T>(values?:T[]): IObservableArray<T>;
	export function value<T,S>(value?:T|{():T}, scope?:S):IObservableValue<T,S>;
	export function watch<T>(func:()=>T, onInvalidate:Lambda):[T,Lambda];
    export function observeProperty(object:Object, key:string, listener:Function):Lambda;

	// annotation
    export function observable(target:Object, key:string);

	export function batch(action:Lambda);
	export function onReady(listener:Lambda):Lambda;
	export function onceReady(listener:Lambda);
	export function defineObservableProperty<T>(object:Object, name:string, initialValue?:T);
	export function initializeObservableProperties(object:Object);

	interface IObservableArray<T> extends Array<T> {
		[n: number]: T;
		length: number;

		spliceWithArray(index:number, deleteCount?:number, newItems?:T[]):T[];
		observe(listener:()=>void, fireImmediately?:boolean):Lambda;
		clear(): T[];
		replace(newItems:T[]);
		values(): T[];
	}
}