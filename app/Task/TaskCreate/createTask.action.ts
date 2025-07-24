"use server";

import z from "zod";
import { TCreateStatus } from ".";
import { deserialize } from "v8";
import { revalidateTag } from "next/cache";

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

	try {
		const API_ENV = process.env.NEXT_PUBLIC_API;

		await fetch(`${API_ENV}/task`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ description: validatedFields.data.description }),
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
