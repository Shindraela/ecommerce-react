import IProfile from '../types/profile'

type DataProps = {
	data: IProfile
}

export const UserPersonalData = ({ data }: DataProps) => {
	return (
		<ul>
			<li>Name : {data.name}</li>
			<li>Email : {data.email}</li>
			<li>
				Address : {data.address} {data.postcode} {data.city}, {data.country}
			</li>
			<li>Birth date : {data.birth_date}</li>
		</ul>
	)
}
