"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import Login from "./login";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleForm = async (event: FormEvent) => {
		event.preventDefault();

		const { result, error } = await Login(email, password);

		if (error) {
			return console.log(error);
		}

		// else successful
		console.log(result);
		return router.push("/admin");
	};

	return (
		<div className="flex flex-col md:flex-row">
			<Image
				src={
					"https://www.bennett.edu.in/wp-content/uploads/2022/07/Centre-for-Sustainability.webp"
				}
				alt="Picture of the University"
				width={500}
				height={500}
				className="pointer-events-none absolute z-10 h-full w-full object-cover opacity-5"
			/>
			<div className="relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-600 to-sky-900 text-white">
				<div className="z-20 text-center">
					<h1 className="text-5xl font-bold">BU News</h1>
					<h3 className="mb-8 text-lg">
						The pulse of University life
					</h3>

					<p className="mb-5">
						New to BU News? Create an account to get started
					</p>

					<button
						className="my-1 px-16 rounded bg-white py-3 text-center text-red-500 hover:bg-gray-100 focus:outline-none"
						onClick={() => router.push("/signup")}>
						Sign up here
					</button>
				</div>
			</div>
			<div className="flex min-h-screen w-full flex-col bg-gray-200 md:w-2/3">
				<Image
					src={
						"https://www.bennett.edu.in/wp-content/uploads/2022/07/Centre-for-Sustainability.webp"
					}
					alt="Picture of the University"
					width={500}
					height={500}
					className="pointer-events-none absolute z-10 h-full w-full object-cover opacity-10 md:hidden"
				/>
				<div className="container z-10 mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2">
					<form
						className="w-full rounded bg-white px-6 py-10 text-black shadow-md"
						onSubmit={handleForm}>
						<h1 className="mb-8 text-center text-3xl font-medium">
							Login
						</h1>

						<input
							type="text"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="email"
							placeholder="Email"
							required
							onChange={(event) => setEmail(event.target.value)}
						/>

						<input
							type="password"
							className="mb-4 block w-full rounded border border-gray-200 p-3 hover:border-red-300"
							name="password"
							placeholder="Password"
							required
							onChange={(event) =>
								setPassword(event.target.value)
							}
						/>

						<button
							type="submit"
							className="my-1 w-full rounded bg-red-500 py-3 text-center text-white hover:bg-red-600 focus:outline-none">
							Login
						</button>

						<div className="mt-8 text-center text-sm text-gray-700">
							Forgot your password?
							<Link
								href="/forgot-password"
								className="border-b border-black">
								{" "}
								Click here{" "}
							</Link>
							to reset it.
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
