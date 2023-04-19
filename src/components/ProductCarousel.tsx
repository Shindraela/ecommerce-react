import React, { useState } from 'react'
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import Slider from 'react-slick'
import IProduct from '../types/product'

// Settings for the slider
const settings = {
	dots: true,
	arrows: false,
	fade: true,
	speed: 500,
	autoplaySpeed: 5000,
	slidesToShow: 1,
	slidesToScroll: 1,
}

type ImagesProps = {
	images: IProduct['images']
}

export const ProductCarousel = ({ images }: ImagesProps) => {
	const [slider, setSlider] = useState(null)

	// Breakpoints which changes the position of
	// the buttons as the screen size changes
	const top = useBreakpointValue({ base: '90%', md: '50%' })
	const side = useBreakpointValue({ base: '30%', md: '10px' })

	return (
		<Box position='relative' height='1xl' width='full' overflow='hidden'>
			{/* CSS files for react-slick */}
			<link
				rel='stylesheet'
				type='text/css'
				charSet='UTF-8'
				href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
			/>
			<link
				rel='stylesheet'
				type='text/css'
				href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
			/>

			<IconButton
				aria-label='left-arrow'
				colorScheme='messenger'
				backgroundColor='black'
				_hover={{
					backgroundColor: 'grey',
				}}
				borderRadius='full'
				position='absolute'
				left={side}
				top={top}
				transform='translate(0%, -50%)'
				zIndex={2}
				onClick={() => slider?.slickPrev()}
			>
				<BiLeftArrowAlt />
			</IconButton>

			<IconButton
				aria-label='right-arrow'
				colorScheme='messenger'
				backgroundColor='black'
				_hover={{
					backgroundColor: 'grey',
				}}
				borderRadius='full'
				position='absolute'
				right={side}
				top={top}
				transform='translate(0%, -50%)'
				zIndex={2}
				onClick={() => slider?.slickNext()}
			>
				<BiRightArrowAlt />
			</IconButton>

			<Slider {...settings} ref={slider => setSlider(slider)}>
				{images.map((url, index) => (
					<Box
						key={index}
						height='2xl'
						position='relative'
						backgroundPosition='center'
						backgroundRepeat='no-repeat'
						backgroundSize='cover'
						backgroundImage={`url(${url})`}
					/>
				))}
			</Slider>
		</Box>
	)
}
