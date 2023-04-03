class handleStorage {
	add(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}
	remove(key) {
		localStorage.removeItem(key)
	}
	get(key) {
		localStorage.getItem(key)
	}
}

export {
	handleStorage,
}
