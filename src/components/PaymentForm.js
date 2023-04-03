import React, { useContext, useState } from 'react';
import {
  Text,
  Box,
  Progress,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  ButtonGroup,
	Button,
	Center,
	Stack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { maskedNumber } from '../utils';
import countries from '../countries.json';
import CartContext from '../contexts/CartContext';
import { URLS } from '../constants';

const Form1 = ({ formData, onChange }) => {
  return (
    <Flex direction='column' p={6} pb={0}>
      <Heading w='100%' size='md' fontWeight='bold' mb='2%'>
        Customer
      </Heading>

      <Flex>
        <FormControl isRequired mr='5%'>
          <FormLabel htmlFor='firstName' fontWeight='normal'>
            First name
          </FormLabel>

          <Input
            type='text'
            id='firstName'
            name='firstName'
            value={formData.form1.firstName}
            onChange={(e) => onChange('form1', e.target.name, e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='lastName' fontWeight='normal'>
            Last name
          </FormLabel>

          <Input
            type='text'
            id='lastName'
            name='lastName'
            value={formData.form1.lastName}
            onChange={(e) => onChange('form1', e.target.name, e.target.value)}
          />
        </FormControl>
      </Flex>

      <Flex mt='2%'>
        <FormControl>
          <FormLabel htmlFor='tel' fontWeight='normal'>
            Phone number
          </FormLabel>

          <Input
            id='tel'
            type='tel'
            name='phone'
            value={formData.form1.phone}
            onChange={(e) => onChange('form1', e.target.name, e.target.value)}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};

const Form2 = ({ formData, onChange }) => {
  return (
    <Flex direction='column' p={6} pb={2}>
      <Heading w='100%' size='md' fontWeight='bold' mb='2%'>
        Shipping address
      </Heading>

      <Flex>
        <FormControl mr='5%' isRequired>
          <FormLabel htmlFor='fullName' fontWeight='normal'>
            Full name
          </FormLabel>

          <Input
            type='text'
            id='fullName'
            name='fullName'
            onChange={(e) => onChange('form2', e.target.name, e.target.value)}
            value={formData.form2.fullName}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='address' fontWeight='normal'>
            Address
          </FormLabel>

          <Input
            id='address'
            type='text'
            value={formData.form1.address}
            name='address'
            onChange={(e) => onChange('form1', e.target.name, e.target.value)}
          />
        </FormControl>
      </Flex>

      <Flex mt='2%'>
        <FormControl isRequired mr='5%'>
          <FormLabel>Country</FormLabel>

          <Select
            name='country'
            onChange={(e) => onChange('form2', e.target.name, e.target.value)}
            placeholder='Select country'
          >
            {countries.map((country) => (
              <option key={country.code} value={formData.form2.selectedCountry}>
                {country.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='city' fontWeight='normal'>
            City
          </FormLabel>

          <Input
            type='text'
            id='city'
            name='city'
            value={formData.form2.city}
            onChange={(e) => onChange('form2', e.target.name, e.target.value)}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};

const Form3 = ({ formData, onChange }) => {
  return (
    <Flex direction='column' p={6} pb={2}>
      <Heading w='100%' size='md' fontWeight='bold' mb='2%'>
        Payment details
      </Heading>

      <Flex>
        <FormControl mr='5%' isRequired>
          <FormLabel htmlFor='cardName' fontWeight='normal'>
            Name On Card
          </FormLabel>

          <Input
            type='text'
            id='cardName'
            name='cardName'
            onChange={(e) => onChange('form3', e.target.name, e.target.value)}
            value={formData.form3.cardName}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='cardNumber' fontWeight='normal'>
            Card Number
          </FormLabel>

          <Input
            type='text'
            id='cardNumber'
            name='cardNumber'
            value={formData.form3.cardNumber}
            onChange={(e) => onChange('form3', e.target.name, e.target.value)}
          />
        </FormControl>
      </Flex>

      <Flex mt='2%'>
        <FormControl mr='5%' isRequired>
          <FormLabel htmlFor='expiryDate' fontWeight='normal'>
            Expiry Date
          </FormLabel>

          <Input
            type='date'
            id='expiryDate'
            name='expiryDate'
            value={formData.form3.expiryDate}
            onChange={(e) => onChange('form3', e.target.name, e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor='cvv' fontWeight='normal'>
            CVV
          </FormLabel>

          <Input
            type='text'
            id='cvv'
            name='cvv'
            value={formData.form3.cvv}
            onChange={(e) => onChange('form3', e.target.name, e.target.value)}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};

const Form4 = ({ formData, onChange }) => {
  return (
    <Flex direction='column' p={6} pb={2}>
      <Heading w='100%' size='md' fontWeight='bold' mb='2%'>
        Order Summary
      </Heading>

			<Center>
				<Stack
					flex={1}
					flexDirection='row'
					justifyContent='space-between'
					alignItems='flex-start'
					pt={2}
				>
					<Box>
						<Heading w='100%' size='md' fontWeight='bold' mb='2%'>
							Customer
						</Heading>

						<Text>{formData.form1.firstName}</Text>
						<Text>{formData.form1.lastName}</Text>
						<Text>{formData.form1.phone}</Text>
					</Box>

					<Box>
						<Heading w='100%' size='md' fontWeight='bold' mb='2%'>
							Shipping address
						</Heading>

						<Text>{formData.form2.fullName}</Text>
						<Text>{formData.form2.address}</Text>
						<Text>{formData.form2.selectedCountry}</Text>
						<Text>{formData.form2.city}</Text>
					</Box>

					<Box>
						<Heading w='100%' size='md' fontWeight='bold' mb='2%'>
							Payment details
						</Heading>

						<Text>{formData.form3.cardName}</Text>
						<Text>{maskedNumber(formData.form3.cardNumber)}</Text>
						<Text>{formData.form3.expiryDate}</Text>
						<Text>{formData.form3.cvv}</Text>
					</Box>
				</Stack>
			</Center>
    </Flex>
  );
};

const PaymentModal = ({ modalIsOpen, setModalOpen }) => {
	const nav = useNavigate()

  return (
		<Modal
			isCentered
			isOpen={modalIsOpen}
			onClose={() => setModalOpen(false)}
			motionPreset='slideInBottom'
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Order succeed</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>You will receive an email from us soon with all the delivery details!</Text>
				</ModalBody>

				<ModalFooter>
					<Button variant='ghost' mr={3} onClick={() => setModalOpen(false)}>
						Close
					</Button>
					<Button colorScheme='blue' onClick={() => nav(URLS.HOMEPAGE)}>Go Home</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
  )
}

export const PaymentForm = () => {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)
	const [modalIsOpen, setModalOpen] = useState(false)
	const { cart, setCart } = useContext(CartContext)
	const initCart = {}

  const [formData, setFormData] = useState({
    form1: {
      firstName: '',
      setFirstName: () => {},
      lastName: '',
      setLastName: () => {},
      phone: '',
      setPhone: () => {},
    },
    form2: {
      fullName: '',
      setFullName: () => {},
      address: '',
      setAddress: () => {},
      selectedCountry: '',
      setSelectedCountry: () => {},
      city: '',
      setCity: () => {},
    },
    form3: {
      cardName: '',
      setCardName: () => {},
      cardNumber: '',
      setCardNumber: () => {},
      expiryDate: '',
      setExpiryDate: () => {},
      cvv: '',
      setCvv: () => {},
    },
	})

  const onChange = (formName, fieldName, value) => {
    setFormData((oldFormData) => ({
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
			{Object.values(cart).length > 0 ?
				<Box
					borderWidth='1px'
					rounded='lg'
					shadow='1px 1px 3px rgba(0,0,0,0.3)'
					maxWidth={800}
					direction={{base: 'column', md: 'row' }}
					p={4}
					m={6}
					as='form'
				>
					<Progress
						hasStripe
						value={progress}
						mt='5%'
						mx='3%'
						isAnimated
					></Progress>

					{step === 1 ? (
						<Form1 formData={formData} onChange={onChange} />
					) : step === 2 ? (
						<Form2 formData={formData} onChange={onChange} />
					) : step === 3 ? (
						<Form3 formData={formData} onChange={onChange} />
					) : (
						<Form4 formData={formData} onChange={onChange} />
					)}

					<ButtonGroup mt='5%' p={4} w='100%'>
						<Flex flex={1} justifyContent='space-between'>
							<Flex>
								<Button
									onClick={() => {
										setStep(step - 1);
										setProgress(progress - 25);
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
										setStep(step + 1);
										if (step === 4) {
											setProgress(100);
										} else {
											setProgress(progress + 25);
										}
									}}
									colorScheme='teal'
									variant='outline'
								>
									Next
								</Button>
							</Flex>

							{step === 4 ? (
								<Button
									w='7rem'
									colorScheme='red'
									variant='solid'
									onClick={onSubmit}
								>
									Submit
								</Button>
							) : null}
						</Flex>
					</ButtonGroup>
				</Box>
			: null}
			
			{modalIsOpen ? <PaymentModal modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} /> : null}
    </>
  );
};
