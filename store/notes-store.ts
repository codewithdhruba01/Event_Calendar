import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type NoteColor = "yellow" | "blue" | "green" | "pink" | "purple" | "orange";

export interface Note {
    id: string;
    title: string;
    text: string;
    color: NoteColor;
    date: string;
}

interface NotesState {
    notes: Note[];
    addNote: (title: string, text: string, color?: NoteColor) => void;
    updateNote: (id: string, text: string) => void;
    updateNoteTitle: (id: string, title: string) => void;
    changeNoteColor: (id: string, color: NoteColor) => void;
    deleteNote: (id: string) => void;
}

const DEFAULT_NOTES: Note[] = [
    {
        id: "1",
        title: "Ideas 💡",
        text: "Welcome to Sticky Notes! 📝\n\nClick the + button to add a new note.",
        color: "yellow",
        date: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Shopping List",
        text: "You can change colors 🎨\nand delete notes you don't need.",
        color: "blue",
        date: new Date().toISOString(),
    },
];

export const useNotesStore = create<NotesState>()(
    persist(
        (set) => ({
            notes: DEFAULT_NOTES,
            addNote: (title, text, color = "yellow") =>
                set((state) => ({
                    notes: [
                        ...state.notes,
                        {
                            id: uuidv4(),
                            title,
                            text,
                            color,
                            date: new Date().toISOString(),
                        },
                    ],
                })),
            updateNote: (id, text) =>
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note.id === id ? { ...note, text } : note
                    ),
                })),
            updateNoteTitle: (id, title) =>
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note.id === id ? { ...note, title } : note
                    ),
                })),
            changeNoteColor: (id, color) =>
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note.id === id ? { ...note, color } : note
                    ),
                })),
            deleteNote: (id) =>
                set((state) => ({
                    notes: state.notes.filter((note) => note.id !== id),
                })),
        }),
        {
            name: "sticky-notes-storage",
        }
    )
);
