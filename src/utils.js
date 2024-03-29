const maskedNumber = number => number.slice(-4).padStart(number.length, '*')

const formattedCart = (products, purchase) => {
	const currentProduct = products.find(p => p._id === purchase.productId)

	return {
		_id: purchase.productId,
		image: currentProduct.images[0],
		title: currentProduct.title,
		quantity: purchase.quantity,
		cost: purchase.quantity * currentProduct.price,
	}
}

export { maskedNumber, formattedCart }
