'use client';

import React from 'react';
import { useAuth } from './context/auth';
import { useRouter } from 'next/navigation';


export default function Home() {
	const router = useRouter()
	const { user } = useAuth()

	React.useEffect(() => {
		if (!user.uid) router.push("/login")
		router.push('/products')
	}, [user])

	return (
		<div></div>
	)
}
