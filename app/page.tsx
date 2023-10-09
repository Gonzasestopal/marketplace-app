'use client';

import ProductListPage from './products/page';
import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { useEffect } from 'react';
import User from './api/users/schema';
import getApiUrl from './utils/api';


function getUser() {
	const url = getApiUrl('users/1')
	return fetch(url)
}

export default function Home() {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		getUser().then(res => res.json()).then(data => setUser(data))
	}, [])

	return (
		<div>
			<Navbar user={user!}></Navbar>
			<ProductListPage></ProductListPage>
		</div >
	)
}
