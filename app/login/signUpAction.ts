'use server'


export async function SignUpAction(formData: FormData) {

	const email = formData.get('email');
	const password = formData.get('password');
	const name = formData.get('name');

	console.log('email,password,name', email, password, name)

	await new Promise(resolve => setTimeout(resolve, 2000))
}
