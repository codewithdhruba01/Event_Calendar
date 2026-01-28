"use client";

import { useState } from "react";
import { useTodoStore } from "@/store/todo-store";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Calendar01Icon, Tag01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function AddTodoInput() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState("");
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [project, setProject] = useState("");

    const { addTodo } = useTodoStore();

    const PRESET_LABELS = ["Work", "Personal", "Shopping", "Health", "Finance"];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            const timeString = date ? format(date, "MMM d") : undefined;
            addTodo(text.trim(), timeString, project || undefined);
            setText("");
            setDate(undefined);
            setProject("");
            setIsExpanded(false);
        }
    };

    if (!isExpanded) {
        return (
            <button
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-2 text-sm text-zinc-500 hover:text-primary transition-colors py-2 px-1 group"
            >
                <div className="size-5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                    <HugeiconsIcon icon={Add01Icon} className="size-4" />
                </div>
                <span className="group-hover:text-primary">Add task</span>
            </button>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="border border-border rounded-lg p-3 shadow-sm bg-card">
            <div className="flex flex-col gap-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Task name"
                    className="bg-transparent border-none outline-none text-sm font-medium placeholder:text-muted-foreground w-full"
                    autoFocus
                />
                <div className="flex items-center gap-2">
                    {project && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full border bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 font-medium flex items-center gap-1">
                            <HugeiconsIcon icon={Tag01Icon} className="size-3" />
                            {project}
                            <button type="button" onClick={() => setProject("")} className="hover:text-destructive ml-1">×</button>
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
                <div className="flex gap-1">
                    <Popover>
                        <PopoverTrigger
                            render={
                                <Button type="button" variant="ghost" size="sm" className={cn("h-7 text-xs text-muted-foreground gap-1.5 px-2", date && "text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary")}>
                                    <HugeiconsIcon icon={Calendar01Icon} className="size-3.5" />
                                    {date ? format(date, "MMM d") : "Date"}
                                </Button>
                            }
                        />
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger
                            render={
                                <Button type="button" variant="ghost" size="sm" className={cn("h-7 text-xs text-muted-foreground gap-1.5 px-2", project && "text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary")}>
                                    <HugeiconsIcon icon={Tag01Icon} className="size-3.5" />
                                    {project || "Label"}
                                </Button>
                            }
                        />
                        <PopoverContent className="w-[200px] p-2" align="start">
                            <div className="space-y-1">
                                <h4 className="font-medium text-xs text-muted-foreground mb-2 px-2">Select Label</h4>
                                {PRESET_LABELS.map(label => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => setProject(label)}
                                        className={cn(
                                            "w-full text-left text-sm px-2 py-1.5 rounded-md hover:bg-accent transition-colors flex items-center gap-2",
                                            project === label && "bg-accent"
                                        )}
                                    >
                                        <HugeiconsIcon icon={Tag01Icon} className="size-3.5 text-muted-foreground" />
                                        {label}
                                    </button>
                                ))}
                                <div className="mt-2 pt-2 border-t border-border">
                                    <input
                                        placeholder="Custom label..."
                                        className="w-full bg-transparent text-sm outline-none px-2 py-1"
                                        value={project}
                                        onChange={(e) => setProject(e.target.value)}
                                    />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsExpanded(false)} className="h-7 text-xs">
                        Cancel
                    </Button>
                    <Button type="submit" size="sm" disabled={!text.trim()} className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90">
                        Add task
                    </Button>
                </div>
            </div>
        </form>
    );
}
