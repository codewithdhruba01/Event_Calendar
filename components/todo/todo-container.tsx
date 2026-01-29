"use client";

import { useState } from "react";
import { useTodoStore } from "@/store/todo-store";
import { TodoItem } from "./todo-item";
import { AddTodoInput } from "./add-todo-input";
import { AppHeader } from "@/components/app-header";
import { AnalyticsDashboard } from "../analytics/analytics-dashboard";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Sorting05Icon, Add01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

export function TodoContainer() {
    const { todos } = useTodoStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const [isAddingTask, setIsAddingTask] = useState(false);

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
        <div className="h-full flex flex-col w-full bg-zinc-50/50 dark:bg-background text-foreground transition-colors duration-300">
            <AppHeader>
                <Button
                    onClick={() => setIsAddingTask(true)}
                    size="sm"
                    variant="outline"
                    className="hidden md:flex"
                >
                    <HugeiconsIcon icon={Add01Icon} className="size-4 mr-2" />
                    New Task
                </Button>
                <Button
                    onClick={() => setIsAddingTask(true)}
                    size="icon"
                    variant="ghost"
                    className="md:hidden"
                >
                    <HugeiconsIcon icon={Add01Icon} className="size-5" />
                </Button>
            </AppHeader>
            <div className="p-6 md:p-8 flex-1 overflow-hidden flex flex-col pb-20">
                {/* Header Section */}
                <div className="mb-6 space-y-4 w-full">
                    {/* Search Bar */}
                    <div className="relative group">
                        <HugeiconsIcon icon={Search01Icon} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-5 transition-colors group-focus-within:text-foreground" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-muted/50 dark:bg-muted text-foreground pl-12 pr-4 py-3.5 rounded-2xl border-none focus:ring-0 focus:bg-accent transition-all outline-none placeholder:text-muted-foreground font-medium"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setFilter("all")}
                            className={cn(
                                "px-5 py-2 rounded-xl text-[13px] font-semibold transition-all tracking-wide",
                                filter === "all" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-muted/50 dark:bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("active")}
                            className={cn(
                                "px-5 py-2 rounded-xl text-[13px] font-semibold transition-all tracking-wide",
                                filter === "active" ? "bg-zinc-800 text-white dark:bg-zinc-700" : "bg-muted/50 dark:bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={cn(
                                "px-5 py-2 rounded-xl text-[13px] font-semibold transition-all tracking-wide",
                                filter === "completed" ? "bg-zinc-800 text-white dark:bg-zinc-700" : "bg-muted/50 dark:bg-muted text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                        >
                            Completed
                        </button>
                        <div className="ml-auto pl-2">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted size-10 rounded-xl">
                                <HugeiconsIcon icon={Sorting05Icon} className="size-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pb-20 space-y-4">

                    <div className="space-y-3 w-full">
                        {filteredTodos.map((todo) => (
                            <TodoItem key={todo.id} todo={todo} />
                        ))}

                        {filteredTodos.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                <p>No tasks found</p>
                            </div>
                        )}
                    </div>

                    <div className="w-full pt-6">
                        <AnalyticsDashboard />
                    </div>

                    <div className="pt-4 sticky bottom-0 w-full pointer-events-none">
                        <div className="pointer-events-auto">
                            <AddTodoInput isOpen={isAddingTask} onClose={() => setIsAddingTask(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
