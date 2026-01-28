"use client";

import { Todo, useTodoStore } from "@/store/todo-store";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Tick02Icon, Calendar01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TodoItemProps {
    todo: Todo;
}

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
            className="group flex items-start gap-4 py-5 border-b border-zinc-100 dark:border-zinc-800 -mx-4 px-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
        >
            <button
                onClick={() => toggleTodo(todo.id)}
                className={cn(
                    "mt-1 size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all focus:outline-none focus:ring-4 focus:ring-[#5E51D0]/10",
                    todo.completed
                        ? "bg-[#5E51D0] border-[#5E51D0] text-white"
                        : "border-zinc-300 dark:border-zinc-600 hover:border-[#5E51D0]"
                )}
            >
                {todo.completed && <HugeiconsIcon icon={Tick02Icon} className="size-3.5" strokeWidth={4} />}
            </button>

            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                    <span
                        className={cn(
                            "text-base font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer select-none leading-tight",
                            todo.completed && "line-through text-zinc-400 dark:text-zinc-600 font-normal"
                        )}
                        onClick={() => toggleTodo(todo.id)}
                    >
                        {todo.text}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity size-8 h-8 -mt-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                    </Button>
                </div>

                {/* Description - Basic Markdown Rendering */}
                {todo.description && !todo.completed && (
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl whitespace-pre-wrap">
                        {todo.description.split(/(\*\*.*?\*\*|_.*?_|<u>.*?<\/u>|\[.*?\]\(.*?\)|> .*?|\n- .*?)/g).map((part, i) => {
                            // Bold
                            if (part.startsWith("**") && part.endsWith("**")) {
                                return <strong key={i} className="font-bold text-zinc-800 dark:text-zinc-200">{part.slice(2, -2)}</strong>;
                            }
                            // Italic
                            if (part.startsWith("_") && part.endsWith("_")) {
                                return <em key={i} className="italic text-zinc-700 dark:text-zinc-300">{part.slice(1, -1)}</em>;
                            }
                            // Underline
                            if (part.startsWith("<u>") && part.endsWith("</u>")) {
                                return <u key={i} className="underline decoration-zinc-400 underline-offset-2">{part.slice(3, -4)}</u>;
                            }
                            // Link
                            if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
                                const match = part.match(/\[(.*?)\]\((.*?)\)/);
                                if (match) {
                                    return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-[#5E51D0] underline hover:no-underline font-medium">{match[1]}</a>;
                                }
                            }
                            // Blockquote
                            if (part.startsWith("> ")) {
                                return (
                                    <div key={i} className="border-l-2 border-zinc-300 dark:border-zinc-600 pl-3 my-1 text-zinc-500 italic">
                                        {part.slice(2)}
                                    </div>
                                )
                            }
                            // Lists
                            if (part.trim().startsWith("- ")) {
                                return (
                                    <div key={i} className="flex gap-2 ml-1 my-0.5">
                                        <span className="text-zinc-400 text-[10px] mt-1.5">●</span>
                                        <span>{part.trim().slice(2)}</span>
                                    </div>
                                )
                            }

                            return part;
                        })}
                    </div>
                )}

                {/* Meta Tags */}
                {(todo.time || todo.project) && (
                    <div className="flex items-center gap-3 mt-1 min-w-0">
                        {todo.project && labelStyle && (
                            <span className={cn(
                                "text-[11px] px-2.5 py-0.5 rounded-full border font-semibold tracking-wide shrink-0 bg-opacity-50",
                                labelStyle.bg,
                                labelStyle.text,
                                labelStyle.border
                            )}>
                                {todo.project.toUpperCase()}
                            </span>
                        )}
                        {todo.time && (
                            <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium shrink-0">
                                <HugeiconsIcon icon={Calendar01Icon} className="size-3.5" />
                                <span>{todo.time}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
