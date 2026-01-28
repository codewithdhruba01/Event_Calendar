"use client";

import { useTodoStore } from "@/store/todo-store";
import { TodoItem } from "./todo-item";
import { AddTodoInput } from "./add-todo-input";
import { Separator } from "@/components/ui/separator";

export function TodoContainer() {
    const { todos } = useTodoStore();

    const sortedTodos = [...todos].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });

    const activeTodos = sortedTodos.filter(t => !t.completed);
    const completedTodos = sortedTodos.filter(t => t.completed);

    // Calculate progress
    const total = todos.length;
    const completed = completedTodos.length;

    return (
        <div className="p-6 md:p-12 h-full flex flex-col max-w-4xl mx-auto w-full bg-white dark:bg-black/20 pb-20">
            <div className="mb-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">To-dos</h1>
                    <div className="bg-[#5E51D0]/10 text-[#5E51D0] px-3 py-1 rounded-full text-sm font-bold">
                        {completed}/{total}
                    </div>
                </div>
                <p className="text-zinc-500 font-medium">Capture ideas and track your work</p>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-20 px-2">
                <div className="mb-8">
                    <AddTodoInput />
                </div>

                <div className="space-y-1">
                    {activeTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </div>

                {completedTodos.length > 0 && (
                    <div className="mt-12">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4 ml-4">Recently Completed</h3>
                        <div className="space-y-1 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                            {completedTodos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
