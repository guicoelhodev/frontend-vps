"use server";

import z from "zod";
import { TCreateStatus } from ".";

const schema = z.object({
	description: z.string().min(5, "A tarefa deve ter no mínimo 5 letras"),
});

export async function createTask(
	initialData: TCreateStatus,
	formData: FormData,
) {
	const validatedFields = schema.safeParse({
		description: formData.get("description-textarea"),
	});

	console.log(validatedFields.error?.issues);

	if (validatedFields.error) {
		return {
			status: 400,
			message: validatedFields.error.issues[0].message,
		};
	}

	await new Promise((resolve) => setTimeout(resolve, 2000));

	return initialData;
}
