import { useNavigate } from 'react-router'
import {
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from '@chakra-ui/react'
import { URLS } from '../constants'
import { ModalType } from '../types/modal'

export const PaymentModal = ({ modalIsOpen, setModalOpen }: ModalType) => {
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
					<Button colorScheme='blue' onClick={() => nav(URLS.HOMEPAGE)}>
						Go Home
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
