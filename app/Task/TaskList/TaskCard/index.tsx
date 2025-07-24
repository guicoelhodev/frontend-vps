"use client";

import { TTask } from "@/services/TaskService/TaskServiceContract";
import { twMerge } from "tailwind-merge";
import { deleteTask, editTask } from "./action";
import { useRef, useState } from "react";
import {
	AiOutlineLoading,
	AiOutlineEdit,
	AiOutlineCheck,
	AiOutlineClose,
} from "react-icons/ai";
import { MdDelete } from "react-icons/md";

type TAction = {
	isUpdate: boolean;
	editMode: "checkbox" | "input" | "idle" | "delete";
	inputDescription: string;
};

export function TaskCard(task: TTask) {
	const descriptionInput = useRef<HTMLInputElement>(null);
	const [actions, setActions] = useState<TAction>({
		isUpdate: true,
		editMode: "idle",
		inputDescription: task.description,
	});

	function handleActions(obj: Partial<TAction>) {
		return setActions((prev) => ({ ...prev, ...obj }));
	}

	function getHour(isoDate: string) {
		return new Intl.DateTimeFormat("pt-BR", {
			timeStyle: "short",
		}).format(new Date(isoDate));
	}

	async function updateDescription() {
		handleActions({ isUpdate: true });

		await editTask(task.id, {
			description: actions.inputDescription,
		});

		handleActions({ isUpdate: false, editMode: "idle" });

		return (descriptionInput.current!.disabled = true);
	}

	return (
		<li
			key={task.id}
			className={
				"p-2 pl-4 rounded-md bg-neutral-800 text-neutral-200 flex flex-col sm:flex-row gap-4 items-center"
			}
		>
			<div className="flex items-center gap-4 w-full">
				{actions.isUpdate && actions.editMode === "checkbox" ? (
					<AiOutlineLoading className="animate-spin" />
				) : (
					<input
						type="checkbox"
						className="h-4 w-4"
						checked={task.completed}
						onChange={async (e) => {
							handleActions({ isUpdate: true, editMode: "checkbox" });
							await editTask(task.id, { completed: e.target.checked });
							handleActions({ isUpdate: false, editMode: "idle" });
						}}
					/>
				)}

				<input
					disabled={true}
					ref={descriptionInput}
					value={actions.inputDescription}
					className={twMerge(
						"w-full text-neutral-500 p-2",
						task.completed && "line-through",
						actions.editMode === "input" && "text-white",
					)}
					onChange={(e) => handleActions({ inputDescription: e.target.value })}
					onKeyDown={async (e) => {
						if (actions.editMode !== "input" || e.key !== "Enter") return;

						await updateDescription();
					}}
				/>
			</div>

			<div className="flex items-center gap-2 justify-end w-full sm:w-fit">
				{actions.editMode === "idle" && !task.completed && (
					<button
						onClick={() => {
							handleActions({ editMode: "input", isUpdate: false });
							descriptionInput.current!.disabled = false;
							return descriptionInput.current?.focus();
						}}
					>
						<AiOutlineEdit />
					</button>
				)}

				{actions.editMode === "input" && (
					<aside className="flex gap-4">
						<button
							onClick={() => {
								descriptionInput.current!.disabled = true;
								handleActions({ editMode: "idle" });
							}}
						>
							<AiOutlineClose />
						</button>

						<button disabled={actions.isUpdate} onClick={updateDescription}>
							{actions.isUpdate ? (
								<AiOutlineLoading className="animate-spin" />
							) : (
								<AiOutlineCheck />
							)}
						</button>
					</aside>
				)}
				<p className="text-sm text-neutral-500">{getHour(task.createdAt)}</p>

				<button
					onClick={async () => {
						handleActions({ editMode: "delete", isUpdate: true });
						await deleteTask(task.id);
						handleActions({ editMode: "idle", isUpdate: false });
					}}
					className="p-2 rounded-full"
				>
					{actions.editMode === "delete" ? (
						<AiOutlineLoading className="animate-spin" />
					) : (
						<MdDelete className="text-red-400" size={20} />
					)}
				</button>
			</div>
		</li>
	);
}
