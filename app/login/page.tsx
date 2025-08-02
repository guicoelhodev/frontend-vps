
'use client';

import { SubmitSignUp } from './SubitSignUp';
import { signUpAction } from './signUpAction';
import { useActionState } from 'react';


export type TSignUpActionReturn = {
	status: 'success' | 'error' | 'idle'
	message: string;
	data: null | any
}
const initialState: TSignUpActionReturn = {
	status: 'idle',
	message: '',
	data: null
};

export default function Page() {
	const [state, formAction] = useActionState(signUpAction, initialState);

	return (
		<section className="p-4 flex justify-end items-center min-h-svh">
			<form action={formAction} className="max-w-96 w-full flex flex-col gap-4">
				<input
					name="name"
					className="p-4 border rounded-md"
					placeholder="John Doe"
					defaultValue="Guilherme Coelho"
				/>
				<input
					name="email"
					className="p-4 border rounded-md"
					placeholder="your_email@email.com"
					defaultValue="gs.coelho_dev@outlook.com"
				/>
				<input
					name="password"
					className="p-4 border rounded-md"
					placeholder="**********"
					type="password"
					defaultValue="12345678"
				/>

				<SubmitSignUp />

				{state.message && (
					<p className={`text-sm text-center ${state.status !== 'error' ? 'text-green-600' : 'text-red-400'}`}>
						{state.message}
					</p>
				)}
			</form>
		</section>
	);
}

