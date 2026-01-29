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

export function AddTodoInput({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
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
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit} className="border border-border rounded-xl bg-card shadow-lg hover:shadow-xl transition-shadow overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header / Title Input */}
            <div className="p-4 border-b border-border">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Task Title"
                    className="text-xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground text-foreground w-full"
                    autoFocus
                />
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-muted/50 overflow-x-auto">
                <ToolbarIcon icon={TextBoldIcon} onClick={() => insertFormat("**", "**")} />
                <ToolbarIcon icon={TextItalicIcon} onClick={() => insertFormat("_", "_")} />
                <ToolbarIcon icon={TextUnderlineIcon} onClick={() => insertFormat("<u>", "</u>")} />
                <div className="w-px h-4 bg-border mx-1" />
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
                    className="w-full h-full min-h-[100px] bg-transparent border-none outline-none resize-none text-muted-foreground font-medium leading-relaxed placeholder:text-muted-foreground/50"
                />
            </div>

            {/* Meta & Actions Footer */}
            <div className="bg-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                    <Popover>
                        <PopoverTrigger
                            render={
                                <button type="button" className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors", date ? "text-primary bg-primary/10 border-primary/20" : "text-muted-foreground border-border hover:bg-accent")}>
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
                                <button type="button" className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors", project ? "text-primary bg-primary/10 border-primary/20" : "text-muted-foreground border-border hover:bg-accent")}>
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
                                            "w-full text-left text-sm px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-2",
                                            project === label && "bg-accent text-accent-foreground"
                                        )}
                                    >
                                        <HugeiconsIcon icon={Tag01Icon} className="size-3.5 text-muted-foreground" />
                                        {label}
                                    </button>
                                ))}
                                <div className="mt-2 pt-2 border-t border-border">
                                    <input
                                        placeholder="Custom label..."
                                        className="w-full bg-transparent text-sm outline-none px-2 py-1 text-foreground placeholder:text-muted-foreground"
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
                        onClick={onClose}
                        className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="px-6 py-2 rounded-full text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
            className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
            <HugeiconsIcon icon={Icon} className="size-4" strokeWidth={2} />
        </button>
    )
}
