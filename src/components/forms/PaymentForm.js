import React, { useContext, useEffect, useState } from 'react'
import { Box, Progress, Flex, ButtonGroup, Button } from '@chakra-ui/react'
import CartContext from '../../contexts/CartContext'
import { Form1 } from './Form1'
import { Form2 } from './Form2'
import { Form3 } from './Form3'
import { Form4 } from './Form4'
import { PaymentModal } from '../PaymentModal'

export const PaymentForm = () => {
	const [step, setStep] = useState(1)
	const [progress, setProgress] = useState(25)
	const [modalIsOpen, setModalOpen] = useState(false)
	const { cart, setCart } = useContext(CartContext)
	const initCart = {}

	useEffect(() => {
		setProgress(step * 25)
	}, [step])

	const [formData, setFormData] = useState({
		form1: {
			firstName: '',
			lastName: '',
			phone: '',
		},
		form2: {
			fullName: '',
			address: '',
			selectedCountry: '',
			city: '',
		},
		form3: {
			cardName: '',
			cardNumber: '',
			expiryDate: '',
			cvv: '',
		},
	})

	const onChange = (formName, fieldName, value) => {
		setFormData(oldFormData => ({
			...oldFormData,
			[formName]: { ...oldFormData[formName], [fieldName]: value },
		}))
	}

	const onSubmit = () => {
		setCart({ ...initCart })
		setModalOpen(true)
	}

	return (
		<>
			{Object.values(cart).length > 0 ? (
				<Box
					borderWidth='1px'
					rounded='lg'
					shadow='1px 1px 3px rgba(0,0,0,0.3)'
					maxWidth={800}
					direction={{ base: 'column', md: 'row' }}
					p={4}
					m={6}
					as='form'
				>
					<Progress hasStripe value={progress} mt='5%' mx='3%' isAnimated></Progress>

					{step === 1 && (
						<Form1
							formData={formData.form1}
							onChange={(fileName, value) => onChange('form1', fileName, value)}
						/>
					)}
					{step === 2 && (
						<Form2
							formData={formData.form2}
							onChange={(fileName, value) => onChange('form2', fileName, value)}
						/>
					)}
					{step === 3 && (
						<Form3
							formData={formData.form3}
							onChange={(fileName, value) => onChange('form3', fileName, value)}
						/>
					)}
					{step === 4 && <Form4 formData={formData} />}

					<ButtonGroup mt='5%' p={4} w='100%'>
						<Flex flex={1} justify='space-between'>
							<Flex>
								<Button
									onClick={() => {
										setStep(step - 1)
									}}
									isDisabled={step === 1}
									colorScheme='teal'
									variant='solid'
									w='7rem'
									mr='5%'
								>
									Back
								</Button>
								<Button
									w='7rem'
									isDisabled={step === 4}
									onClick={() => {
										setStep(step + 1)
									}}
									colorScheme='teal'
									variant='outline'
								>
									Next
								</Button>
							</Flex>

							{step === 4 ? (
								<Button w='7rem' colorScheme='red' variant='solid' onClick={onSubmit}>
									Submit
								</Button>
							) : null}
						</Flex>
					</ButtonGroup>
				</Box>
			) : null}

			<PaymentModal modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
		</>
	)
}
