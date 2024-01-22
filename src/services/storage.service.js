class StorageService {
	add(key, value) {
		return localStorage.setItem(key, value)
	}
	remove(key) {
		return localStorage.removeItem(key)
	}
	get(key) {
		return localStorage.getItem(key)
	}
}

export default new StorageService()
