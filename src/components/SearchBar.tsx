import { ChangeEvent, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flex, Input, Box, Stack } from '@chakra-ui/react'
import ProductsContext from '../contexts/ProductsContext'
import IProduct from '../types/product'

export const SearchBar = () => {
	const [query, setQuery] = useState('')
	const { allProducts } = useContext(ProductsContext)
	const [results, setResults] = useState<IProduct[]>([])
	const [emptyResults, setEmptyResults] = useState<string>('')

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
		const results = allProducts.filter(p =>
			p.title.toLowerCase().startsWith(e.target.value.toLocaleLowerCase()),
		)

		if (results.length === 0) setEmptyResults('No search found.')
		setResults(results)
	}

	const resetSearch = () => {
		setQuery('')
		setResults([])
	}

	const searchStyle: React.CSSProperties = {
		position: 'absolute',
		top: '4rem',
		zIndex: 1,
		backgroundColor: 'white',
		border: '1px solid grey',
		borderRadius: '0.5rem',
		padding: '1rem',
	}

	return (
		<Flex align='center' direction='column' style={{ position: 'relative' }}>
			<Box p={4}>
				<Stack>
					<Input placeholder='Search' value={query} onChange={e => onSearch(e)} />
				</Stack>

				{query.length > 0 ? (
					<Stack as='nav' spacing={4} style={searchStyle}>
						{results.length > 0 ? (
							results.map(product => (
								<Link
									key={product._id}
									to={`/products/${product._id}`}
									relative='path'
									onClick={resetSearch}
								>
									{product.title}
								</Link>
							))
						) : (
							<span>{emptyResults}</span>
						)}
					</Stack>
				) : null}
			</Box>
		</Flex>
	)
}
