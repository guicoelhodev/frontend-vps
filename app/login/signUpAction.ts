'use server';

import { auth } from "../lib/auth";
import { TSignUpActionReturn } from "./page";

export async function signUpAction(
	prevState: any,
	formData: FormData
): Promise<TSignUpActionReturn> {
	try {
		const email = formData.get('email')!.toString();
		const password = formData.get('password')!.toString();
		const name = formData.get('name')!.toString();

		const response = await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
				callbackURL: 'http://0.0.0.0:3000'
			},
		});

		return {
			status: 'success',
			message: 'Conta criada com sucesso!',
			data: response
		};
	} catch (error) {
		return {
			status: 'error',
			message: (error as Error)?.message || 'Erro ao criar conta.',
			data: null
		};
	}
}
