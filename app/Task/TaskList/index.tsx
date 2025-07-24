import { TTask } from "..";

export async function TaskList() {
	const API_ENV = process.env.NEXT_PUBLIC_API;

	const response = await fetch(`${API_ENV!}/task`);

	await new Promise((resolve) => setTimeout(resolve, 1000));
	const data = (await response.json()) as { task: TTask[] };

	return (
		<ul>
			{data.task.length ? (
				data.task.map((i) => (
					<li key={i.id} className="border p-4 rounded-md">
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
