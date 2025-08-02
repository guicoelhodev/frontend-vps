import { Task } from "./Task";

export default function Home() {
	const a: { name: number } = { name: 8}
	return (
		<div className="flex w-svw h-svh flex-col items-stretch justify-center">
			<main className="flex flex-col items-center justify-center gap-4 size-full p-4">
				<Task />
			</main>
		</div>
	);
}
