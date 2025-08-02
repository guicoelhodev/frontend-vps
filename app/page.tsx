import { headers } from "next/headers";
import { Task } from "./Task";
import { auth } from "./lib/auth";

export default async function Home() {

	const session = await auth.api.getSession({
		headers: await headers()
	})
	console.log('session', session)
	return (
		<div className="flex w-svw h-svh flex-col items-stretch justify-center">
			<main className="flex flex-col items-center justify-center gap-4 size-full p-4">
				<Task />
			</main>
		</div>
	);
}
