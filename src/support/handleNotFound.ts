export async function handleNotFound<T>(
	predicate: () => Promise<T>
): Promise<T | null> {
	try {
		return await predicate()
	} catch (e) {
		if (e.statusCode === 404) {
			return null
		} else {
			throw e
		}
	}
}
