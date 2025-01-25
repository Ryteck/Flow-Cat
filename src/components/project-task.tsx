import { destroyProjectTaskAction } from "@/actions/destroy-project-task";
import { useTaskStore } from "@/store/task";
import type RootTask from "@/types/RootTask";
import { ChevronsUpDownIcon, LoaderIcon, TrashIcon } from "lucide-react";
import { type FC, useState } from "react";
import { mutate } from "swr";
import { FormProjectTaskComponent } from "./forms/project-task";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";

interface Props {
	rootTask: RootTask;
}

export const ProjectTaskComponent: FC<Props> = ({ rootTask }) => {
	const taskId = rootTask.task?.id ?? null;

	const taskStore = useTaskStore();

	const [isDeleting, setIsDeleting] = useState(false);

	return (
		<Collapsible
			open={taskId ? taskStore.isOpenedTask(taskId) : true}
			onOpenChange={taskId ? () => taskStore.toogleTask(taskId) : undefined}
		>
			{rootTask.task && (
				<div className="w-fit flex gap-2 items-center">
					<p className="w-64 border-b">{rootTask.task.name}</p>

					<Badge>{rootTask.task.status}</Badge>

					<CollapsibleTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							disabled={rootTask.subtasks.length === 0}
						>
							<ChevronsUpDownIcon className="h-4 w-4" />
						</Button>
					</CollapsibleTrigger>

					<FormProjectTaskComponent
						projectId={rootTask.task.projectId}
						parentId={rootTask.task.id}
					/>

					<Button
						size="icon"
						variant="destructive"
						disabled={isDeleting}
						onClick={async () => {
							if (rootTask.task === null) return;
							setIsDeleting(true);
							await destroyProjectTaskAction(rootTask.task.id);
							await mutate(`/api/projects/${rootTask.task.projectId}/tasks`);
						}}
					>
						{isDeleting ? (
							<LoaderIcon className="animate-spin" />
						) : (
							<TrashIcon />
						)}
					</Button>
				</div>
			)}

			<CollapsibleContent
				data-root={rootTask.task === null}
				className="data-[root=false]:ml-8 my-2 flex flex-col w-96"
			>
				{rootTask.subtasks.map((arg) => (
					<ProjectTaskComponent key={arg.task?.id} rootTask={arg} />
				))}
			</CollapsibleContent>
		</Collapsible>
	);
};
