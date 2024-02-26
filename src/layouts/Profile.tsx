import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import profile from '../profile.json'
import { OrderCard } from '../components/cards/OrderCard'
import { UserPersonalData } from '../components/UserPersonalData'
import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

export const Profile = () => {
	const { currentUser } = useContext(UserContext)

	return (
		<Tabs>
			<TabList mt='4'>
				<Tab>My personal data</Tab>
				<Tab>My orders</Tab>
			</TabList>
			<TabPanels p='2rem'>
				{currentUser && (
					<TabPanel>
						<UserPersonalData />
					</TabPanel>
				)}

				<TabPanel>
					{profile.orders &&
						profile.orders.map(order => <OrderCard key={order.reference} order={order} />)}
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}
