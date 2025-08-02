import { SignUpAction } from "./signUpAction";
import { SubmitSignUp } from "./SubitSignUp";

export default function Page() {

	return (
		<section className="p-4 flex justify-end items-center min-h-svh">

			<form action={SignUpAction} className="max-w-96 w-full flex flex-col gap-4">
				<input
					name="name"
					className="p-4 border rounded-md"
					placeholder="John Doe"
					defaultValue='Guilherme Coelho'
				/>
				<input
					name="email"
					className="p-4 border rounded-md"
					placeholder="your_email@email.com"
					defaultValue='gs.coelho_dev@outlook.com'
				/>
				<input
					name="password"
					className="p-4 border rounded-md"
					placeholder="**********"
					defaultValue='12345678'
				/>

				<SubmitSignUp />
			</form>
		</section>
	)
}
