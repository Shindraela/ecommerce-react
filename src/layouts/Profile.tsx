import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import profile from '../profile.json'
import { OrderCard } from '../components/cards/OrderCard'
import { UserPersonalData } from '../components/UserPersonalData'
import { IOrder } from '../types/profile'
import { useState } from 'react'

export const Profile = () => {
	const [orders, setOrders] = useState<IOrder[]>([])

	if (profile.orders) {
		setOrders([...profile.orders])
	} else {
		setOrders([])
	}

	return (
		<Tabs>
			<TabList mt='4'>
				<Tab>My orders</Tab>
				<Tab>My personal data</Tab>
			</TabList>
			<TabPanels p='2rem'>
				<TabPanel>
					{orders && orders.map(order => <OrderCard key={order.reference} order={order} />)}
				</TabPanel>
				<TabPanel>
					<UserPersonalData data={profile} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}
