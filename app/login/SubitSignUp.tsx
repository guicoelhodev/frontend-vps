'use client';

import { useFormStatus } from "react-dom";


export function SubmitSignUp() {
	const { pending } = useFormStatus();

	return (
		<button className="p-4 rounded-md bg-white text-black" disabled={pending}>
			{pending ? 'Sign Up ...' : 'Sign Up'}
		</button>
	)
}
