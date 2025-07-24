import { Task } from "./Task";

export default function Home() {
	return (
		<div className="flex w-svw h-svh flex-col items-stretch justify-center">
			<main className="flex flex-col items-center justify-center gap-4 size-full">
				<Task />
			</main>

			<footer className="flex justify-end">
				<span className="p-2">
					<b>api:</b>
					{process.env.NEXT_PUBLIC_API}
				</span>
			</footer>
		</div>
	);
}
