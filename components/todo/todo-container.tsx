"use client";

import { useState } from "react";
import { useTodoStore } from "@/store/todo-store";
import { TodoItem } from "./todo-item";
import { AddTodoInput } from "./add-todo-input";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Sorting05Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export function TodoContainer() {
    const { todos } = useTodoStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    const filteredTodos = todos.filter((todo) => {
        const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (todo.description && todo.description.toLowerCase().includes(searchQuery.toLowerCase()));

        if (!matchesSearch) return false;

        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const activeTodos = filteredTodos.filter(t => !t.completed);
    const completedTodos = filteredTodos.filter(t => t.completed);

    return (
        <div className="p-6 md:p-8 h-full flex flex-col w-full bg-[#121212] pb-20 text-zinc-100">
            {/* Header Section */}
            <div className="mb-6 space-y-4 max-w-5xl mx-auto w-full">
                {/* Search Bar */}
                <div className="relative group">
                    <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 size-5 transition-colors group-focus-within:text-zinc-300" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#1C1C1E] text-zinc-200 pl-12 pr-4 py-3.5 rounded-2xl border-none focus:ring-0 focus:bg-[#252528] transition-all outline-none placeholder:text-zinc-600 font-medium"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setFilter("all")}
                        className={cn(
                            "px-5 py-2 rounded-xl text-[13px] font-semibold transition-all tracking-wide",
                            filter === "all" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-[#1C1C1E] text-zinc-400 hover:text-zinc-200 hover:bg-[#252528]"
                        )}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("active")}
                        className={cn(
                            "px-5 py-2 rounded-xl text-[13px] font-semibold transition-all tracking-wide",
                            filter === "active" ? "bg-zinc-800 text-white" : "bg-[#1C1C1E] text-zinc-400 hover:text-zinc-200 hover:bg-[#252528]"
                        )}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilter("completed")}
                        className={cn(
                            "px-5 py-2 rounded-xl text-[13px] font-semibold transition-all tracking-wide",
                            filter === "completed" ? "bg-zinc-800 text-white" : "bg-[#1C1C1E] text-zinc-400 hover:text-zinc-200 hover:bg-[#252528]"
                        )}
                    >
                        Completed
                    </button>
                    <div className="ml-auto pl-2">
                        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-zinc-300 hover:bg-[#1C1C1E] size-10 rounded-xl">
                            <HugeiconsIcon icon={Sorting05Icon} className="size-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-4">

                <div className="space-y-3 max-w-5xl mx-auto w-full">
                    {filteredTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}

                    {filteredTodos.length === 0 && (
                        <div className="text-center py-12 text-zinc-600">
                            <p>No tasks found</p>
                        </div>
                    )}
                </div>

                <div className="pt-4 sticky bottom-0 bg-[#121212] max-w-5xl mx-auto w-full">
                    <AddTodoInput />
                </div>
            </div>
        </div>
    );
}
