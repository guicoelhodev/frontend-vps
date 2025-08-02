'use server';

import { auth } from "../lib/auth";
import { TSignUpActionReturn } from "./page";
import { redirect } from "next/navigation";

export async function signUpAction(
	prevState: any,
	formData: FormData
): Promise<TSignUpActionReturn> {
	try {
		const email = formData.get('email')!.toString();
		const password = formData.get('password')!.toString();
		const name = formData.get('name')!.toString();

		await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
			},
		});


	} catch (error) {

		return {
			status: 'error',
			message: (error as Error)?.message || 'Erro ao criar conta.',
			data: null
		};
	}

	redirect('/')
}
