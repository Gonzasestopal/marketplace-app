'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth';
import getApiUrl from '../utils/api';
import { saveToStorage } from '../utils/local-storage';
import Link from 'next/link';

function registerUser(email: string, externalId: string, name: string) {
    const url = getApiUrl("auth/register")
    return fetch(url, { method: 'POST', body: JSON.stringify({ email: email, externalId: externalId, name: name }) })
}

export default function RegisterPage() {
    const { signUp } = useAuth();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("")
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const onSubmit = (event: any) => {
        setError("")
        //check if passwords match. If they do, create user in Firebase
        // and redirect to your logged in page.
        if (passwordOne === passwordTwo)
            signUp(email, passwordOne)
                .then((authUser: any) => {
                    console.log('setting JWT', authUser.user.uid)
                    registerUser(email, authUser.user.uid, name).then(response => {
                        response.json().then(body => {
                            saveToStorage("accessToken", body.externalId)
                            saveToStorage("userId", body.id)
                            console.log("Success. The user is created in Firebase")
                            router.push("/products");
                        })
                    })
                })
                .catch((error: any) => {
                    // An error occurred. Set error message to be displayed to user
                    setError(error.message)
                });
        else
            setError("Password do not match")
        event.preventDefault();
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                    {error && <p color="danger">{error}</p>}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="name"
                                autoComplete="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={passwordOne}
                                onChange={(event) => setPasswordOne(event.target.value)}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="passwordTwo" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="passwordTwo"
                                name="passwordTwo"
                                type="password"
                                value={passwordTwo}
                                onChange={(event) => setPasswordTwo(event.target.value)}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
}
