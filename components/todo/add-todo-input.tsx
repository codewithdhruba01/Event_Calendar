"use client";

import { useState, useRef } from "react";
import { useTodoStore } from "@/store/todo-store";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Add01Icon,
    Calendar01Icon,
    Tag01Icon,
    TextBoldIcon,
    TextItalicIcon,
    Link01Icon,
    TextUnderlineIcon,
    ListSettingIcon,
    QuoteDownIcon
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function AddTodoInput() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [project, setProject] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { addTodo } = useTodoStore();

    const PRESET_LABELS = ["Work", "Personal", "Shopping", "Health", "Finance", "Bug", "Feature"];

    const insertFormat = (formatStart: string, formatEnd: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;
        const selectedText = value.substring(start, end);

        let newText = "";
        let newCursorPos = 0;

        if (formatEnd) {
            // Wrapping functionality (e.g. **bold**)
            newText = value.substring(0, start) + formatStart + selectedText + formatEnd + value.substring(end);
            newCursorPos = start + formatStart.length + selectedText.length + formatEnd.length;
            if (start === end) {
                // No selection: place cursor inside tags
                newCursorPos = start + formatStart.length;
            }
        } else {
            // Prefix functionality (e.g. - List)
            // Find the start of the current line
            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            newText = value.substring(0, lineStart) + formatStart + value.substring(lineStart);
            newCursorPos = end + formatStart.length;
        }

        setDescription(newText);

        // Restore focus and cursor
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const handleLink = () => {
        const url = prompt("Enter URL:", "https://");
        if (url) {
            insertFormat("[", `](${url})`);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            const timeString = date ? format(date, "MMM d") : undefined;
            addTodo(text.trim(), description.trim() || undefined, timeString, project || undefined);
            setText("");
            setDescription("");
            setDate(undefined);
            setProject("");
            setIsExpanded(false);
        }
    };

    if (!isExpanded) {
        return (
            <div className="flex justify-start">
                <Button
                    onClick={() => setIsExpanded(true)}
                    className="bg-[#5E51D0] hover:bg-[#4b41a8] text-white rounded-full px-6 transition-all shadow-sm gap-2"
                >
                    <HugeiconsIcon icon={Add01Icon} className="size-5" />
                    New Task
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="border border-zinc-800 rounded-xl bg-[#1E1E1E] shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header / Title Input */}
            <div className="p-4 border-b border-zinc-800">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Task Title"
                    className="text-xl font-bold bg-transparent border-none outline-none placeholder:text-zinc-500 text-zinc-100 w-full"
                    autoFocus
                />
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 px-2 py-1.5 border-b border-zinc-800 bg-[#252525] overflow-x-auto">
                <ToolbarIcon icon={TextBoldIcon} onClick={() => insertFormat("**", "**")} />
                <ToolbarIcon icon={TextItalicIcon} onClick={() => insertFormat("_", "_")} />
                <ToolbarIcon icon={TextUnderlineIcon} onClick={() => insertFormat("<u>", "</u>")} />
                <div className="w-px h-4 bg-zinc-700 mx-1" />
                <ToolbarIcon icon={Link01Icon} onClick={handleLink} />
                <ToolbarIcon icon={QuoteDownIcon} onClick={() => insertFormat("> ")} />
                <ToolbarIcon icon={ListSettingIcon} onClick={() => insertFormat("- ")} />
            </div>

            {/* Description Body */}
            <div className="p-4 min-h-[120px]">
                <textarea
                    ref={textareaRef}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add extra details or description..."
                    className="w-full h-full min-h-[100px] bg-transparent border-none outline-none resize-none text-zinc-300 font-medium leading-relaxed placeholder:text-zinc-600"
                />
            </div>

            {/* Meta & Actions Footer */}
            <div className="bg-[#1E1E1E] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-zinc-800">
                <div className="flex flex-wrap gap-2">
                    <Popover>
                        <PopoverTrigger
                            render={
                                <button type="button" className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors", date ? "text-[#5E51D0] bg-[#5E51D0]/10 border-[#5E51D0]/20" : "text-zinc-400 border-zinc-700 hover:bg-zinc-800")}>
                                    <HugeiconsIcon icon={Calendar01Icon} className="size-3.5" />
                                    {date ? format(date, "MMM d") : "Due Date"}
                                </button>
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
                                <button type="button" className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors", project ? "text-[#5E51D0] bg-[#5E51D0]/10 border-[#5E51D0]/20" : "text-zinc-400 border-zinc-700 hover:bg-zinc-800")}>
                                    <HugeiconsIcon icon={Tag01Icon} className="size-3.5" />
                                    {project || "Level / Label"}
                                </button>
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

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                        type="button"
                        onClick={() => setIsExpanded(false)}
                        className="px-4 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="px-6 py-2 rounded-full text-sm font-bold text-white bg-[#5E51D0] hover:bg-[#4b41a8] shadow-md shadow-[#5E51D0]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Add this task
                    </button>
                </div>
            </div>
        </form>
    );
}

function ToolbarIcon({ icon: Icon, onClick }: { icon: any, onClick?: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="p-1.5 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
        >
            <HugeiconsIcon icon={Icon} className="size-4" strokeWidth={2} />
        </button>
    )
}
