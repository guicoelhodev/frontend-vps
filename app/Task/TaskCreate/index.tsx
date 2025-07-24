"use client";

import { useActionState } from "react";
import { createTask } from "./createTask.action";

export type TCreateStatus = {
	status: number | null;
	message: string;
};

const initialState: TCreateStatus = {
	status: null,
	message: "",
};

export function TaskCreate() {
	const [state, formAction, pending] = useActionState(createTask, initialState);

	console.log(state);
	return (
		<form action={formAction} className="flex flex-col gap-4 items-center">
			<article className="flex gap-4">
				<textarea
					name="description-textarea"
					placeholder="Add your new task here"
					className="bg-neutral-800 resize-none p-4 rounded-md w-full sm:min-w-96"
					rows={1}
				/>

				<button>
					<span>
						{pending ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 8 8"
							>
								<path fill="currentColor" d="m0 0l8 3.5L0 7l1-3q5-.5 0-1" />
							</svg>
						)}
					</span>
					{}
				</button>
			</article>

			{state?.status === 400 && <span>{state.message}</span>}

			{pending && <p>Enviando</p>}
		</form>
	);
}
