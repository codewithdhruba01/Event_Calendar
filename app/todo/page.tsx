import { TodoContainer } from "@/components/todo/todo-container";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";

export default function TodoPage() {
    return (
        <SidebarProvider className="bg-sidebar">
            <CalendarSidebar />
            <div className="h-svh overflow-hidden lg:p-2 w-full">
                <div className="lg:border lg:rounded-md overflow-hidden flex flex-col items-start justify-start bg-container h-full w-full bg-background relative">
                    <div className="absolute inset-0 overflow-hidden w-full h-full">
                        <TodoContainer />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
