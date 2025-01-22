import { create } from "zustand";

interface TaskStoreState {
	openedTasks: string[];
}

const initialTaskStoreState: TaskStoreState = {
	openedTasks: [],
};

interface TaskStore extends TaskStoreState {
	isOpenedTask: (taskId: string) => boolean;
	toogleTask: (taskId: string) => void;
	closeAll: () => void;
}

export const useTaskStore = create<TaskStore>()((set, get) => ({
	...initialTaskStoreState,

	isOpenedTask: (taskId) => get().openedTasks.includes(taskId),

	toogleTask: (taskId) =>
		set((state) => ({
			openedTasks: state.openedTasks.includes(taskId)
				? state.openedTasks.filter((arg) => arg !== taskId)
				: [...state.openedTasks, taskId],
		})),

	closeAll: () => set({ openedTasks: [] }),
}));
