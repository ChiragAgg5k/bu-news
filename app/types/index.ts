export interface SignUpPageProps {
	email: string
	password: string
	name: string
	phoneNo: string
	city: string
	admin: boolean
}

export interface UserDetail {
	name: string
	phoneNo: string
	city: string | undefined
	admin: boolean
}

export interface News {
	id: string
	authorized: boolean
	category: string
	dateInMilliseconds: number
	mImageUrl: string
	newsDescription: string
	newsHeading: string
	promoted: boolean
	username: string
}

export interface Weather {
	temp: number
	description: string
	icon: string
}

export interface NewsCategory {
	'Clubs Related': boolean
	[Event: string]: boolean
	General: boolean
	Sports: boolean
}
