import { TaskService } from "@/services/TaskService";
import { TTask } from "@/services/TaskService/TaskServiceContract";
import { TaskCard } from "./TaskCard";

export async function TaskList() {
	const taskService = new TaskService();

	let tasks: TTask[] = [];
	try {
		const tmpTask = await taskService.getTasks();

		tasks = tmpTask;
	} catch (err) {
		tasks = [];

		console.error((err as Error).message);
	}

	const tasksSorted = tasks.sort((prev, curr) => {
		if (prev.completed !== curr.completed) {
			return curr.completed ? 1 : -1;
		}

		return (
			new Date(prev.createdAt).getTime() - new Date(curr.createdAt).getTime()
		);
	});
	return (
		<ul className="w-full mt-4 flex flex-col gap-4 h-full sm:max-h-52 overflow-auto sm:px-4">
			{tasksSorted.length ? (
				tasks.reverse().map((i) => <TaskCard key={i.id} {...i} />)
			) : (
				<aside className="mx-auto">
					<p>Nothing to see here :(</p>
				</aside>
			)}
		</ul>
	);
}
