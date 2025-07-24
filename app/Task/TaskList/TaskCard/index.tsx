"use client";

import { TTask } from "@/services/TaskService/TaskServiceContract";
import { twMerge } from "tailwind-merge";
import { editTask } from "./action";
import { useState } from "react";
import { getTargetTriple } from "next/dist/build/swc/generated-native";

export function TaskCard(task: TTask) {
	const [isUpdate, setIsUpdate] = useState(false);

	function getHour(isoDate: string) {
		return new Intl.DateTimeFormat("pt-BR", {
			timeStyle: "short",
		}).format(new Date(isoDate));
	}
	return (
		<li
			key={task.id}
			className={
				"p-4 rounded-md bg-neutral-800 text-neutral-200 flex gap-4 items-center"
			}
		>
			{isUpdate ? (
				<svg
					className="animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
				>
					<path
						fill="currentColor"
						d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8"
					/>
				</svg>
			) : (
				<input
					type="checkbox"
					className="h-4 w-4"
					checked={task.completed}
					onChange={async (e) => {
						setIsUpdate(true);
						await editTask(task.id, { completed: e.target.checked });
						setIsUpdate(false);
					}}
				/>
			)}
			<input
				disabled={true}
				value={task.description}
				className={twMerge(
					"flex-1 text-neutral-500",
					task.completed && "line-through",
				)}
			/>

			<p className="text-sm text-neutral-500">{getHour(task.createdAt)}</p>
		</li>
	);
}
