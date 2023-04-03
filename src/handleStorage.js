class handleStorage {
	add(key, value) {
		return localStorage.setItem(key, JSON.stringify(value))
	}
	remove(key) {
		return localStorage.removeItem(key)
	}
	get(key) {
		return localStorage.getItem(key)
	}
}

export {
	handleStorage,
}
