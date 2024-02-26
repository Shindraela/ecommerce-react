import { FormEvent, useContext, useState } from 'react'
import { Button, Stack, useToast } from '@chakra-ui/react'
import UserContext from '../contexts/UserContext'
import IUser from '../types/user'
import '../styles/profile.scss'

export const UserPersonalData = () => {
	const { currentUser, setCurrentUser, updateUser } = useContext(UserContext)
	const [switchToForm, setSwitchToForm] = useState<boolean>(false)
	const [editedUser, setEditedUser] = useState<IUser>(currentUser)
	const [isError, setIsError] = useState<boolean>(false)
	const toast = useToast()

	const handleFirstNameChange = (e: FormEvent<HTMLInputElement>): void => {
		const currentUsername = e.currentTarget.value

		setEditedUser((editedUser: IUser) => ({
			...editedUser,
			username: currentUsername,
		}))
	}

	const handleEmailChange = (e: FormEvent<HTMLInputElement>): void => {
		const currentEmail = e.currentTarget.value

		setEditedUser((editedUser: IUser) => ({
			...editedUser,
			email: currentEmail,
		}))
	}

	const switchToUpdate = () => (switchToForm ? setSwitchToForm(false) : setSwitchToForm(true))

	const updateProfile = () => {
		updateUser(editedUser)
			.then(({ data, status }) => {
				if (status === 200) {
					setCurrentUser(data)

					toast({
						title: 'User updated.',
						description: 'User was correctly updated!',
						status: 'success',
						duration: 3000,
						isClosable: true,
					})
				}

				setSwitchToForm(false)
			})
			.catch(error => {
				setIsError(true)
				toast({
					title: 'User update failed.',
					description: 'Oops, an error occured!',
					status: 'error',
					duration: 3000,
					isClosable: true,
				})
			})
	}

	return (
		<>
			{switchToForm ? (
				<div className='UserPersonalData'>
					<ul className='UserPersonalData-list'>
						<li className='UserPersonalData-listItem'>
							<span>Name :</span>
							<input
								type='text'
								value={editedUser.username}
								onChange={handleFirstNameChange}
								className='UserPersonalData-editedInput'
							/>
						</li>

						<li className='UserPersonalData-listItem'>
							<span>Email :</span>
							<input
								type='text'
								value={editedUser.email}
								onChange={handleEmailChange}
								className='UserPersonalData-editedInput'
							/>
						</li>
					</ul>
				</div>
			) : (
				<form className='UserPersonalData'>
					<ul className='UserPersonalData-list'>
						<li>
							<span>Name : </span>
							<span>{currentUser.username}</span>
						</li>

						<li>
							<span>Email : </span>
							<span>{currentUser.email}</span>
						</li>
					</ul>
				</form>
			)}

			<Stack spacing={4} direction='row' align='center'>
				{switchToForm && (
					<Button colorScheme='teal' size='sm' onClick={updateProfile}>
						Save
					</Button>
				)}

				<Button colorScheme={switchToForm ? 'red' : 'teal'} size='sm' onClick={switchToUpdate}>
					{switchToForm ? 'Cancel' : 'Update user'}
				</Button>
			</Stack>
		</>
	)
}
