import * as T from "./TaskServiceContract";

export class TaskService implements T.TaskServiceContract {
	private env: string;
	constructor() {
		this.env = process.env.NEXT_PUBLIC_API ?? "not-found";
	}

	async deleteTask(body: T.DeleteTaskBody) {
		return fetch(`${this.env}/task/${body.id}`, {
			method: "DELETE",
		});
	}

	async updateTask(body: T.UpdateTaskBody) {
		const response = await fetch(`${this.env}/task`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		return response;
	}

	async createTask(body: T.CreateTaskBody) {
		return fetch(`${this.env}/task`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ description: body.description }),
		});
	}

	async getTasks() {
		const response = await fetch(`${this.env}/task`, {
			method: "GET",
			next: {
				tags: ["GET_tasks"],
			},
		});

		const data = (await response.json()) as T.TTask[];

		return data;
	}
}
