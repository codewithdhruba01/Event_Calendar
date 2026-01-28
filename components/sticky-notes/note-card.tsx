"use client";

import { useNotesStore, Note, NoteColor } from "@/store/notes-store";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon, Tick01Icon, MoreHorizontalIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NoteCardProps {
    note: Note;
    index: number;
}

const COLOR_MAP: Record<NoteColor, string> = {
    yellow: "bg-[#fff740] text-zinc-800",
    blue: "bg-[#a0e8ff] text-zinc-800",
    green: "bg-[#ccff90] text-zinc-800",
    pink: "bg-[#ff90c9] text-zinc-800",
    purple: "bg-[#e5bcff] text-zinc-800",
    orange: "bg-[#ffbe76] text-zinc-800",
};

export function NoteCard({ note, index }: NoteCardProps) {
    const { updateNote, updateNoteTitle, deleteNote, changeNoteColor } = useNotesStore();

    // Deterministic rotation based on index, between -3 and 3 degrees
    const rotate = (index % 2 === 0 ? 1 : -1) * ((index % 3) + 1);

    return (
        <div
            className={cn(
                "relative flex flex-col p-4 min-h-[250px] shadow-lg transition-transform hover:z-10 hover:scale-[1.02] duration-200 font-handwriting",
                COLOR_MAP[note.color]
            )}
            style={{
                transform: `rotate(${rotate}deg)`,
                boxShadow: "2px 4px 6px rgba(0,0,0,0.1)",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-2 border-b border-black/5 pb-2">
                <input
                    value={note.title}
                    onChange={(e) => updateNoteTitle(note.id, e.target.value)}
                    className="bg-transparent border-none text-lg font-bold w-full focus:outline-none placeholder:text-black/30 text-inherit truncate"
                    placeholder="Title"
                />
                <div className="flex items-center gap-0.5 shrink-0">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button variant="ghost" size="icon" className="size-6 h-6 w-6 rounded-full hover:bg-black/10 text-inherit">
                                    <HugeiconsIcon icon={MoreHorizontalIcon} className="size-4" />
                                </Button>
                            }
                        />
                        <DropdownMenuContent align="end" className="p-1 min-w-[120px]">
                            <div className="grid grid-cols-3 gap-1">
                                {(Object.keys(COLOR_MAP) as NoteColor[]).map((color) => (
                                    <DropdownMenuItem
                                        key={color}
                                        className="p-1 focus:bg-transparent"
                                        onClick={() => changeNoteColor(note.id, color)}
                                    >
                                        <div className={cn("size-6 rounded-full border border-black/10 flex items-center justify-center",
                                            color === 'yellow' && "bg-[#fff740]",
                                            color === 'blue' && "bg-[#a0e8ff]",
                                            color === 'green' && "bg-[#ccff90]",
                                            color === 'pink' && "bg-[#ff90c9]",
                                            color === 'purple' && "bg-[#e5bcff]",
                                            color === 'orange' && "bg-[#ffbe76]",
                                        )}>
                                            {note.color === color && <HugeiconsIcon icon={Tick01Icon} className="size-3 text-black" />}
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 h-6 w-6 rounded-full hover:bg-black/10 text-inherit"
                        onClick={() => deleteNote(note.id)}
                    >
                        <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
                    </Button>
                </div>
            </div>

            {/* Body */}
            <textarea
                value={note.text}
                onChange={(e) => updateNote(note.id, e.target.value)}
                className="flex-1 bg-transparent border-none resize-none focus:outline-none text-inherit text-xl font-normal leading-snug w-full h-full"
                placeholder="Write your note here..."
                spellCheck={false}
            />
        </div>
    );
}
