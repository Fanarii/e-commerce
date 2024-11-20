"use client"
import Social from '@/components/auth/Social'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { registerSchema } from '@/schema/auth'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from 'next/link'
import FormError from '@/components/auth/formError'
import FormSuccess from '@/components/auth/formSuccess'
import { register } from '@/actions/resgiter'

const Page = () => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: ""
		}
	})

	const onSubmit = (values: z.infer<typeof registerSchema>) => {
		setError('')
		setSuccess('')

		register(values).then((data) => {
			setError(data.error)
			setSuccess(data.success)
		})
	}

	return (
		<div className='w-full h-[89vh] flex justify-center items-center bg-slate-100'>
			<Card className='w-[380px]'>
				<CardHeader className='text-lg'>
					<CardTitle>Register</CardTitle>
					<CardDescription>Create an account</CardDescription>
				</CardHeader>
				<CardContent className='text-lg'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-t-6'>
							<div>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input {...field} type='text' id="name" placeholder="John Doe" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input {...field} type='email' id="email" placeholder="johndoe@example.com" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input {...field} type='password' id="password" placeholder="******" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormError message={error} />
							<FormSuccess message={success} />
							<div className='flex flex-col gap-y-2 mt-5 justify-center'>
								<Button type='submit' size='lg' className='w-full'>Register</Button>
								<Social />
								<Link href={'/login'}>
									<p className='mt-6 hover:underline hover:cursor-pointer text-sm text-center'>Already have an account?</p>
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	)
}

export default Page
