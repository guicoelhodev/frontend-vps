export interface TaskServiceContract {
	getTasks: () => Promise<TTask[]>;
	createTask: (body: CreateTaskBody) => Promise<Response>;
	updateTask: (body: UpdateTaskBody) => Promise<Response>;
	deleteTask: (body: DeleteTaskBody) => Promise<Response>;
}

export type CreateTaskBody = {
	description: string;
};

export type UpdateTaskBody = {
	id: string;
	description?: string;
	checked?: boolean?;
};

export type DeleteTaskBody = {
	id: string;
};

export type TTask = { id: string; description: string; checked: boolean };
