import { Suspense } from "react";
import { TaskCreate } from "./TaskCreate";
import { TaskList } from "./TaskList";
import { LoadingTask } from "./TaskList/loading";

export function Task() {
	return (
		<section className="flex flex-col-reverse sm:flex-col items-center justify-center gap-4 size-full max-w-[600px]">
			<TaskCreate />

			<Suspense fallback={<LoadingTask />}>
				<TaskList />
			</Suspense>
		</section>
	);
}
