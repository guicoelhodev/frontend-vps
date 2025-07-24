"use client";

import { useActionState } from "react";
import { createTask } from "./createTask.action";
import { AiOutlineLoading, AiOutlineSend } from "react-icons/ai";

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

	return (
		<form
			action={formAction}
			className="w-full flex flex-col items-stretch gap-4 sm:px-4"
		>
			<article className="flex gap-4 items-center">
				<input
					name="description-input"
					placeholder="Add your new task here"
					className="bg-neutral-800 resize-none p-4 rounded-md flex-1"
				/>

				<button className="bg-neutral-800 w-16 h-16 rounded-full grid  place-content-center">
					{pending ? (
						<AiOutlineLoading className="animate-spin" />
					) : (
						<AiOutlineSend className="translate-x-0.5" size={24} />
					)}
				</button>
			</article>

			{state?.status === 400 && (
				<span className="text-red-300">{state.message}</span>
			)}
		</form>
	);
}
