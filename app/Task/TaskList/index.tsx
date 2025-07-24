import { TaskService } from "@/services/TaskService";

export async function TaskList() {
	const taskService = new TaskService();

	const tasks = await taskService.getTasks();

	return (
		<ul className="w-full mt-4 flex flex-col gap-4 max-h-52 overflow-auto px-4">
			{tasks.length ? (
				tasks.reverse().map((i) => (
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
