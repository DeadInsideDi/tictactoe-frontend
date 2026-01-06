export const unionByKey = <T>(
	arr1: T[],
	arr2: T[],
	key: (item: T) => unknown,
) => {
	const map = new Map<unknown, T>(arr1.map(item => [key(item), item]))
	arr2.map(item => map.set(key(item), item))
	return Array.from(map.values())
}

export const intersectByKey = <T>(
	arr1: T[],
	arr2: T[],
	key: (item: T) => unknown,
) => {
	const map = new Map<unknown, T>(arr1.map(item => [key(item), item]))
	return arr2.filter(item => map.has(key(item)))
}
