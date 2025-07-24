"use server";

import z from "zod";
import { TCreateStatus } from ".";
import { revalidateTag } from "next/cache";
import { TaskService } from "@/services/TaskService";

const schema = z.object({
	description: z
		.string()
		.min(5, "Description must be at least 5 characters long"),
});

export async function createTask(
	initialData: TCreateStatus,
	formData: FormData,
) {
	const validatedFields = schema.safeParse({
		description: formData.get("description-input"),
	});

	if (validatedFields.error) {
		return {
			status: 400,
			message: validatedFields.error.issues[0].message,
		};
	}

	const taskService = new TaskService();

	try {
		await taskService.createTask({
			description: validatedFields.data.description,
		});
	} catch (err) {
		const error = err as Error;

		return {
			status: 400,
			message: error.message,
		};
	}

	revalidateTag("GET_tasks");
	return initialData;
}
