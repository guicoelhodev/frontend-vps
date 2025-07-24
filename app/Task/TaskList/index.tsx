import { TTask } from "..";

export async function TaskList() {
	const API_ENV = process.env.NEXT_PUBLIC_API;

	const response = await fetch(`${API_ENV!}/task`, {
		next: {
			tags: ["GET_tasks"],
		},
	});

	await new Promise((resolve) => setTimeout(resolve, 1000));
	const data = (await response.json()) as { task: TTask[] };

	return (
		<ul className="w-full mt-4 flex flex-col gap-4 max-h-52 overflow-auto px-4">
			{data.task.length ? (
				data.task.reverse().map((i) => (
					<li key={i.id} className="p-4 rounded-md bg-neutral-800">
						{i.description}
					</li>
				))
			) : (
				<aside>
					<p>Nothing to see here :(</p>
				</aside>
			)}
		</ul>
	);
}
