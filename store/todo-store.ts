import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
    id: string;
    text: string;
    description?: string;
    completed: boolean;
    time?: string;
    project?: string;
    createdAt: string;
}

interface TodoState {
    todos: Todo[];
    addTodo: (text: string, description?: string, time?: string, project?: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    clearCompleted: () => void;
}

const DEFAULT_TODOS: Todo[] = [
    {
        id: "1",
        text: "Design Review",
        description: "Review new homepage mockups with the team.",
        completed: false,
        time: "10:00 AM",
        project: "Work",
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        text: "Grocery Shopping",
        completed: false,
        project: "Personal",
        createdAt: new Date().toISOString(),
    },
];

export const useTodoStore = create<TodoState>()(
    persist(
        (set) => ({
            todos: DEFAULT_TODOS,
            addTodo: (text, description, time, project) =>
                set((state) => ({
                    todos: [
                        {
                            id: uuidv4(),
                            text,
                            description,
                            time,
                            project,
                            completed: false,
                            createdAt: new Date().toISOString(),
                        },
                        ...state.todos,
                    ],
                })),
            toggleTodo: (id) =>
                set((state) => ({
                    todos: state.todos.map((todo) =>
                        todo.id === id ? { ...todo, completed: !todo.completed } : todo
                    ),
                })),
            deleteTodo: (id) =>
                set((state) => ({
                    todos: state.todos.filter((todo) => todo.id !== id),
                })),
            clearCompleted: () =>
                set((state) => ({
                    todos: state.todos.filter((todo) => !todo.completed),
                })),
        }),
        {
            name: "todo-storage",
        }
    )
);
