"use client";

import { useNotesStore } from "@/store/notes-store";
import { NoteCard } from "./note-card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { AppHeader } from "@/components/app-header";

export function NotesBoard() {
    const { notes, addNote } = useNotesStore();

    return (
        <div className="h-full flex flex-col bg-zinc-50/50 dark:bg-background transition-colors duration-300">
            <AppHeader>
                <Button onClick={() => addNote("New Note", "")} size="sm" variant="outline" className="hidden md:flex">
                    <HugeiconsIcon icon={Add01Icon} className="size-4 mr-2" />
                    Add Note
                </Button>
                <Button onClick={() => addNote("New Note", "")} size="icon" variant="ghost" className="md:hidden">
                    <HugeiconsIcon icon={Add01Icon} className="size-5" />
                </Button>
            </AppHeader>
            <div className="p-6 h-full flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Sticky Notes</h1>
                        <p className="text-muted-foreground text-sm">Capture your thoughts and ideas.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-20">
                    {notes.map((note, index) => (
                        <NoteCard key={note.id} note={note} index={index} />
                    ))}

                    {notes.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground opacity-50 border-2 border-dashed rounded-xl">
                            <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <HugeiconsIcon icon={Add01Icon} className="size-8" />
                            </div>
                            <p>No notes yet</p>
                            <Button variant="link" onClick={() => addNote("New Note", "")}>Create one</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
