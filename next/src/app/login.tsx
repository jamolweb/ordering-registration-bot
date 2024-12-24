'use client'

import $api from '@/api/axios'
import { useState } from 'react'

export default function AdminLoginForm({ setIsLoggedIn }: any) {
	const [formData, setFormData] = useState({ username: '', password: '' })
	const [error, setError] = useState('')

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		setError('')

		await $api
			.post('/auth/login', formData)
			.then(res => {
				const { token, userdata } = res.data

				if (token && userdata) {
					const { id, username, fullName, image } = userdata
					if (id && username && image && fullName) {
						console.log(token)

						localStorage.setItem('token', token)
						setIsLoggedIn(true)
					}
				}
			})
			.catch(err => {
				setError(err.response?.data?.message || 'An error occurred')
			})
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Admin Login
					</h2>
				</div>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<input type='hidden' name='remember' value='true' />
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='username' className='sr-only'>
								Username
							</label>
							<input
								id='username'
								name='username'
								type='text'
								autoComplete='username'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Username'
								onChange={handleChange}
							/>
						</div>
						<div>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Password'
								onChange={handleChange}
							/>
						</div>
					</div>

					{error && <div className='text-red-500 text-sm mt-2'>{error}</div>}

					<div>
						<button
							type='submit'
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}