import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import profile from '../profile.json'
import { OrderCard } from '../components/cards/OrderCard'
import { UserPersonalData } from '../components/UserPersonalData'

export const Profile = () => {
	return (
		<Tabs>
			<TabList mt='4'>
				<Tab>My orders</Tab>
				<Tab>My personal data</Tab>
			</TabList>
			<TabPanels p='2rem'>
				<TabPanel>
					{profile.orders &&
						profile.orders.map(order => <OrderCard key={order.reference} order={order} />)}
				</TabPanel>
				<TabPanel>
					<UserPersonalData data={profile} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}
