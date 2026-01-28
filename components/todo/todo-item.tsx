"use client";

import { Todo, useTodoStore } from "@/store/todo-store";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Tick02Icon, Calendar01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TodoItemProps {
    todo: Todo;
}

// Simple hash function to pick a color for the label
function getLabelColor(label: string) {
    const colors = [
        { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
        { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800" },
        { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", border: "border-red-200 dark:border-red-800" },
        { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-800" },
        { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-800" },
    ];
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
        hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

export function TodoItem({ todo }: TodoItemProps) {
    const { toggleTodo, deleteTodo } = useTodoStore();

    const labelStyle = todo.project ? getLabelColor(todo.project) : null;

    return (
        <div
            className="group flex items-start gap-3 py-3 border-b border-border/40 hover:bg-muted/30 -mx-4 px-4 transition-colors"
        >
            <button
                onClick={() => toggleTodo(todo.id)}
                className={cn(
                    "mt-0.5 size-5 rounded-full border border-zinc-400 dark:border-zinc-600 flex items-center justify-center shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
                    todo.completed
                        ? "bg-primary border-primary text-primary-foreground"
                        : "hover:border-primary hover:bg-primary/10"
                )}
            >
                {todo.completed && <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={3} />}
            </button>

            <div className="flex-1 min-w-0 flex flex-col gap-1">
                <span
                    className={cn(
                        "text-sm text-zinc-800 dark:text-zinc-200 cursor-pointer select-none font-medium",
                        todo.completed && "line-through text-muted-foreground"
                    )}
                    onClick={() => toggleTodo(todo.id)}
                >
                    {todo.text}
                </span>

                {(todo.time || todo.project) && (
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                        {todo.project && labelStyle && (
                            <span className={cn(
                                "text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0",
                                labelStyle.bg,
                                labelStyle.text,
                                labelStyle.border
                            )}>
                                {todo.project}
                            </span>
                        )}
                        {todo.time && (
                            <div className="flex items-center gap-1.5 text-[11px] text-red-600 dark:text-red-400 font-medium shrink-0">
                                <HugeiconsIcon icon={Calendar01Icon} className="size-3" />
                                <span>{todo.time}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity size-7 h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => deleteTodo(todo.id)}
            >
                <HugeiconsIcon icon={Delete02Icon} className="size-4" />
            </Button>
        </div>
    );
}
