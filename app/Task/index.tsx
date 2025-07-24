import { Suspense } from "react";
import { TaskCreate } from "./TaskCreate";
import { TaskList } from "./TaskList";
import { LoadingTask } from "./TaskList/loading";

export type TTask = { id: string; description: string; checked: boolean };

export function Task() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 size-full">
			<TaskCreate />

			<Suspense fallback={<LoadingTask />}>
				<TaskList />
			</Suspense>
		</section>
	);
}
