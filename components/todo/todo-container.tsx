"use client";

import { useTodoStore } from "@/store/todo-store";
import { TodoItem } from "./todo-item";
import { AddTodoInput } from "./add-todo-input";
import { Separator } from "@/components/ui/separator";

export function TodoContainer() {
    const { todos } = useTodoStore();

    // Sort: Incomplete first, then by date logic if we had it, but for now just reverse creation (default)
    const sortedTodos = [...todos].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });

    const activeTodos = sortedTodos.filter(t => !t.completed);
    const completedTodos = sortedTodos.filter(t => t.completed);

    return (
        <div className="p-8 h-full flex flex-col max-w-4xl mx-auto w-full">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight mb-1">Today</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
                <div className="space-y-0.5">
                    {activeTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </div>

                <div className="py-2">
                    <AddTodoInput />
                </div>

                {completedTodos.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Completed</h3>
                        <Separator className="mb-2" />
                        <div className="space-y-0.5 opacity-60">
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
