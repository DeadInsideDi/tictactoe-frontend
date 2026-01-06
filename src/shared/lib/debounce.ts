export const debounce = <A extends unknown[], R>(
	func: (...args: A) => R,
	timeout = 300,
) => {
	let timer: ReturnType<typeof setTimeout>

	return function (this: unknown, ...args: A) {
		clearTimeout(timer)
		timer = setTimeout(() => func.apply(this, args), timeout)
	}
}
