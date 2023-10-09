import { PhotoIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import getApiUrl from '../utils/api';
import { getFromStorage } from '../utils/local-storage';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { ProductWithPhotos } from '../api/products/route';

function registerProduct(name: string, description: string, price: number, token: string | undefined) {
    const headers = { Authorization: `Bearer ${token}` }
    const url = getApiUrl("products")
    return fetch(url, { method: 'POST', headers: headers, body: JSON.stringify({ name: name, description: description, price: price }) })
}

function getProducts() {
    const url = getApiUrl('products')
    return fetch(url)
}


export default function ProductForm({ setProducts }: { setProducts: Dispatch<SetStateAction<ProductWithPhotos[]>> }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState("");
    const accessToken = getFromStorage("accessToken") ?? undefined

    const onSubmit = (event: any) => {
        setError("")
        registerProduct(name, description, Number(price), accessToken)
            .then((response: any) => {
                console.log("Success. The product was created")
                getProducts().then(productsResponse => {
                    productsResponse.json().then(products => {
                        setProducts(products)
                        resetForm(event)
                    })
                })
            })
            .catch((error: any) => {
                // An error occurred. Set error message to be displayed to user
                setError(error.message)
            });

        event.preventDefault();
    };

    function resetForm(e: any) {
        e.preventDefault()
        setName("")
        setDescription("");
        setPrice("")
    }

    return (
        <form method="POST" onSubmit={onSubmit}>
            {error && <p color="danger">{error}</p>}
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Register new product</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        autoComplete="name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Polo t-shirt"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    name="description"
                                    rows={3}
                                    required
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences description about the product.</p>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        required
                                        value={price}
                                        onChange={(event) => setPrice(event.target.value)}
                                        autoComplete="price"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="100.32"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Product photo
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}
