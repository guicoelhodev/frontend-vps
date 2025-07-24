"use server";

import { TaskService } from "@/services/TaskService";
import { TTask } from "@/services/TaskService/TaskServiceContract";
import { revalidateTag } from "next/cache";

export async function editTask(taskId: string, body: Partial<TTask>) {
	const taskService = new TaskService();

	await taskService.updateTask({
		...body,
		id: taskId,
	});

	return revalidateTag("GET_tasks");
}

export async function deleteTask(taskId: string) {
	const taskService = new TaskService();

	await taskService.deleteTask({ id: taskId });

	return revalidateTag("GET_tasks");
}
