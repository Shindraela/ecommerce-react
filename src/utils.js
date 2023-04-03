const maskedNumber = number => number.slice(-4).padStart(number.length, '*')

const formattedCart = (products, purchase) => {
	return {
		id: purchase.productId,
		image: products[purchase.productId].images[0],
		title: products[purchase.productId].title,
		quantity: purchase.quantity,
		cost: purchase.quantity * products[purchase.productId].price,
	};
}

export {
	maskedNumber,
	formattedCart,
}
