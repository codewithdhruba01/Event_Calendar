"use client";

import { Todo, useTodoStore } from "@/store/todo-store";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Tick02Icon,
    Calendar01Icon,
    Delete02Icon,
    UserIcon,
    Briefcase01Icon,
    FavouriteIcon,
    ShoppingBag01Icon,
    Coins01Icon,
    Alert02Icon,
    Tag01Icon
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TodoItemProps {
    todo: Todo;
}

function getPriorityStyle(text: string) {
    const styles = [
        { ring: "border-orange-500", bar: "bg-orange-500" },
        { ring: "border-green-500", bar: "bg-green-500" },
        { ring: "border-blue-500", bar: "bg-blue-500" },
        { ring: "border-purple-500", bar: "bg-purple-500" },
        { ring: "border-rose-500", bar: "bg-rose-500" },
    ];
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return styles[Math.abs(hash) % styles.length];
}

// Project/Category Details (Icon & Text Color & Background)
function getProjectDetails(project: string) {
    const p = project.toLowerCase();
    if (p.includes("personal")) return { color: "text-purple-400", bg: "bg-purple-500/10", icon: UserIcon };
    if (p.includes("work")) return { color: "text-blue-400", bg: "bg-blue-500/10", icon: Briefcase01Icon };
    if (p.includes("health")) return { color: "text-rose-400", bg: "bg-rose-500/10", icon: FavouriteIcon };
    if (p.includes("shopping")) return { color: "text-emerald-400", bg: "bg-emerald-500/10", icon: ShoppingBag01Icon };
    if (p.includes("finance")) return { color: "text-yellow-400", bg: "bg-yellow-500/10", icon: Coins01Icon };
    if (p.includes("urgent") || p.includes("bug")) return { color: "text-red-400", bg: "bg-red-500/10", icon: Alert02Icon };

    return { color: "text-zinc-400", bg: "bg-zinc-500/10", icon: Tag01Icon };
}

export function TodoItem({ todo }: TodoItemProps) {
    const { toggleTodo, deleteTodo } = useTodoStore();

    // Visual Styling
    const priorityStyle = getPriorityStyle(todo.id + todo.text); // Consistent random based on ID/Text
    const projectDetails = todo.project ? getProjectDetails(todo.project) : null;

    // Date Logic
    const isToday = todo.time?.toLowerCase().includes("today") || false;
    const isTomorrow = todo.time?.toLowerCase().includes("tomorrow") || false;

    return (
        <div
            className="group relative flex items-start gap-4 p-5 bg-[#1C1C1E] rounded-[20px] transition-all hover:bg-[#252528] mb-3"
        >
            {/* Right colored bar */}
            <div className={cn("absolute right-0 top-4 bottom-4 w-1.5 rounded-l-full", priorityStyle.bar)} />

            <button
                onClick={() => toggleTodo(todo.id)}
                className={cn(
                    "mt-0.5 size-6 rounded-full border-[3px] flex items-center justify-center shrink-0 transition-all focus:outline-none",
                    todo.completed
                        ? "bg-green-500 border-green-500 text-black" // Checked: Green Filled
                        : cn("bg-transparent hover:opacity-80", priorityStyle.ring) // Unchecked: Colored Ring
                )}
            >
                {todo.completed && <HugeiconsIcon icon={Tick02Icon} className="size-3.5" strokeWidth={4} />}
            </button>

            <div className="flex-1 min-w-0 flex flex-col gap-1 pr-4">
                <div className="flex items-center justify-between gap-2">
                    <span
                        className={cn(
                            "text-[17px] font-normal text-zinc-100 cursor-pointer select-none leading-snug relative",
                            todo.completed && "text-zinc-500 line-through decoration-zinc-600"
                        )}
                        onClick={() => toggleTodo(todo.id)}
                    >
                        {todo.text}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity size-8 h-8 -mt-1 text-zinc-500 hover:text-red-400 hover:bg-neutral-800 rounded-full"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                    </Button>
                </div>

                {/* Description - Basic Markdown Rendering */}
                {todo.description && !todo.completed && (
                    <div className="text-sm text-zinc-400 leading-relaxed font-normal max-w-2xl whitespace-pre-wrap mt-0.5 mb-1.5">
                        {todo.description.split(/(\*\*.*?\*\*|_.*?_|<u>.*?<\/u>|\[.*?\]\(.*?\)|> .*?|\n- .*?)/g).map((part, i) => {
                            if (part.startsWith("**") && part.endsWith("**")) return <strong key={i} className="font-bold text-zinc-200">{part.slice(2, -2)}</strong>;
                            if (part.startsWith("_") && part.endsWith("_")) return <em key={i} className="italic text-zinc-300">{part.slice(1, -1)}</em>;
                            if (part.startsWith("<u>") && part.endsWith("</u>")) return <u key={i} className="underline decoration-zinc-500 underline-offset-2">{part.slice(3, -4)}</u>;
                            if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
                                const match = part.match(/\[(.*?)\]\((.*?)\)/);
                                if (match) return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:no-underline font-medium">{match[1]}</a>;
                            }
                            if (part.startsWith("> ")) return <div key={i} className="border-l-2 border-zinc-600 pl-3 my-1 text-zinc-500 italic">{part.slice(2)}</div>;
                            if (part.trim().startsWith("- ")) return <div key={i} className="flex gap-2 ml-1 my-0.5"><span className="text-zinc-500 text-[10px] mt-1.5">●</span><span>{part.trim().slice(2)}</span></div>;
                            return part;
                        })}
                    </div>
                )}

                {/* Meta Row: Project | Date */}
                {(todo.time || todo.project) && (
                    <div className="flex items-center gap-4 mt-2">
                        {todo.project && projectDetails && (
                            <div className={cn(
                                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-opacity group/label cursor-pointer hover:opacity-80",
                                projectDetails.bg
                            )}>
                                <HugeiconsIcon icon={projectDetails.icon} className={cn("size-3.5", projectDetails.color)} />
                                <span className={cn(
                                    "text-[12px] font-semibold tracking-wide",
                                    projectDetails.color
                                )}>
                                    {todo.project}
                                </span>
                            </div>
                        )}
                        {todo.time && (
                            <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium shrink-0">
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
