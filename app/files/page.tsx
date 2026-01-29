"use client";

import { AppHeader } from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Search01Icon,
    FilterHorizontalIcon,
    GridViewIcon,
    Image01Icon,
    VideoReplayIcon,
    File02Icon,
    ArchiveIcon,
    Folder01Icon,
    MoreVerticalIcon,
    File01Icon,
    Download01Icon,
    Share01Icon,
    PencilEdit02Icon,
    Delete02Icon,
    Clock01Icon,
    Upload02Icon,
    FolderAddIcon,
    Link01Icon,
    FileAddIcon,
    Home01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export default function FilesPage() {
    return (
        <SidebarProvider>
            <CalendarSidebar />
            <SidebarInset>
                <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 font-sans">
                    {/* Main Container - Split View on Desktop */}
                    <div className="flex flex-1 overflow-hidden">

                        {/* Left Column - Main Content */}
                        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 md:p-8 space-y-8">

                            {/* Header */}
                            <AppHeader
                                breadcrumbs={
                                    <div className="flex items-center gap-2 text-sm">
                                        <HugeiconsIcon icon={Home01Icon} className="size-4 text-zinc-500" />
                                        <span className="text-zinc-500">/</span>
                                        <span className="font-medium text-zinc-200">My Files</span>
                                    </div>
                                }
                                centerContent={
                                    <div className="flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-full shadow-sm">
                                        <Button variant="ghost" size="icon" className="size-8 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                                            <HugeiconsIcon icon={Upload02Icon} className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="size-8 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                                            <HugeiconsIcon icon={FolderAddIcon} className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="size-8 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                                            <HugeiconsIcon icon={Link01Icon} className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="size-8 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                                            <HugeiconsIcon icon={FileAddIcon} className="size-4" />
                                        </Button>
                                    </div>
                                }
                            >
                                <div className="relative hidden md:block">
                                    <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                                    <Input
                                        placeholder="Search files..."
                                        className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 w-64 focus-visible:ring-zinc-700 h-9"
                                    />
                                </div>
                                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                                    <Button variant="ghost" size="icon" className="size-8 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100">
                                        <HugeiconsIcon icon={GridViewIcon} className="size-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="size-8 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100">
                                        <HugeiconsIcon icon={FilterHorizontalIcon} className="size-4" />
                                    </Button>
                                </div>
                            </AppHeader>

                            {/* Storage Categories */}
                            <section>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <StorageCard
                                        icon={Image01Icon}
                                        label="Images"
                                        amount="2.4 GB"
                                        percentage={16}
                                        color="text-purple-400"
                                        bg="bg-purple-500/10"
                                        barColor="bg-purple-500"
                                    />
                                    <StorageCard
                                        icon={VideoReplayIcon}
                                        label="Videos"
                                        amount="3.2 GB"
                                        percentage={21}
                                        color="text-pink-400"
                                        bg="bg-pink-500/10"
                                        barColor="bg-pink-500"
                                    />
                                    <StorageCard
                                        icon={File01Icon}
                                        label="Documents"
                                        amount="1.5 GB"
                                        percentage={10}
                                        color="text-orange-400"
                                        bg="bg-orange-500/10"
                                        barColor="bg-orange-500"
                                    />
                                    <StorageCard
                                        icon={ArchiveIcon}
                                        label="Archives"
                                        amount="1.2 GB"
                                        percentage={8}
                                        color="text-emerald-400"
                                        bg="bg-emerald-500/10"
                                        barColor="bg-emerald-500"
                                    />
                                </div>
                            </section>

                            {/* Folders */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium text-zinc-400">Folders</h2>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    <FolderCard label="Design Assets" count={24} size="1.2 GB" color="text-purple-400" />
                                    <FolderCard label="Projects" count={18} size="856 MB" color="text-blue-400" />
                                    <FolderCard label="Documents" count={45} size="234 MB" color="text-orange-400" />
                                    <FolderCard label="Media" count={67} size="4.5 GB" color="text-pink-400" />
                                    <FolderCard label="Archives" count={12} size="2.1 GB" color="text-emerald-400" />
                                </div>
                            </section>

                            {/* Recent Files */}
                            <section className="flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium text-zinc-400">All Files</h2>
                                </div>
                                <div className="bg-zinc-900/50 rounded-xl border border-zinc-800/50 overflow-hidden">
                                    <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 p-4 text-xs font-medium text-zinc-500 border-b border-zinc-800 uppercase tracking-wider">
                                        <div className="w-8"></div>
                                        <div>Name</div>
                                        <div className="w-24 text-right">Size</div>
                                        <div className="w-32 text-right">Modified</div>
                                        <div className="w-32 text-right">Created</div>
                                        <div className="w-10"></div>
                                    </div>
                                    <div className="divide-y divide-zinc-800/50">
                                        <FileRow name="Dashboard Mockup.fig" size="12.4 MB" modified="2 hours ago" created="Dec 15, 2024" icon={Image01Icon} color="text-purple-400" />
                                        <FileRow name="Brand Guidelines.pdf" size="8.2 MB" modified="Yesterday" created="Dec 10, 2024" icon={File02Icon} color="text-orange-400" />
                                        <FileRow name="Product Demo.mp4" size="248 MB" modified="3 days ago" created="Dec 8, 2024" icon={VideoReplayIcon} color="text-pink-400" />
                                        <FileRow name="Client Presentation.pptx" size="15.7 MB" modified="1 week ago" created="Dec 1, 2024" icon={File01Icon} color="text-orange-400" />
                                        <FileRow name="Source Code.zip" size="124 MB" modified="2 weeks ago" created="Nov 25, 2024" icon={ArchiveIcon} color="text-emerald-400" />
                                        <FileRow name="UI Components.sketch" size="34.5 MB" modified="4 days ago" created="Dec 5, 2024" icon={Image01Icon} color="text-purple-400" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Panel - Info */}
                        <div className="w-80 border-l border-zinc-800 bg-zinc-950/50 hidden xl:flex flex-col p-6 space-y-8">
                            {/* Storage Overview */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-zinc-300">Storage Overview</h3>
                                    <button className="text-xs text-purple-400 hover:text-purple-300">Upgrade</button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-zinc-500">
                                        <span>8.9 GB of 15 GB used</span>
                                        <span>59%</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-purple-500 w-[27%]" />
                                        <div className="h-full bg-pink-500 w-[36%]" />
                                        <div className="h-full bg-orange-500 w-[17%]" />
                                        <div className="h-full bg-emerald-500 w-[13%]" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                                    <LegendItem label="Images" size="2.4 GB" color="bg-purple-500" />
                                    <LegendItem label="Videos" size="3.2 GB" color="bg-pink-500" />
                                    <LegendItem label="Documents" size="1.5 GB" color="bg-orange-500" />
                                    <LegendItem label="Archives" size="1.2 GB" color="bg-emerald-500" />
                                    <LegendItem label="Other" size="0.6 GB" color="bg-zinc-500" />
                                </div>
                            </section>

                            <div className="h-px bg-zinc-800" />

                            {/* Team Members */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-zinc-300">Team Members</h3>
                                    <span className="text-xs text-zinc-500">5 people</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        <Avatar className="border-2 border-zinc-950 size-8"><AvatarImage src="https://i.pravatar.cc/150?u=1" /><AvatarFallback>JD</AvatarFallback></Avatar>
                                        <Avatar className="border-2 border-zinc-950 size-8"><AvatarImage src="https://i.pravatar.cc/150?u=2" /><AvatarFallback>SM</AvatarFallback></Avatar>
                                        <Avatar className="border-2 border-zinc-950 size-8"><AvatarImage src="https://i.pravatar.cc/150?u=3" /><AvatarFallback>KD</AvatarFallback></Avatar>
                                        <Avatar className="border-2 border-zinc-950 size-8 bg-zinc-800 text-xs font-medium text-zinc-300 flex items-center justify-center">+1</Avatar>
                                    </div>
                                    <Button size="icon" variant="outline" className="size-8 rounded-full border-zinc-700 bg-transparent hover:bg-zinc-800">
                                        <HugeiconsIcon icon={Share01Icon} className="size-3" />
                                    </Button>
                                </div>
                            </section>

                            <div className="h-px bg-zinc-800" />

                            {/* Recent Activity */}
                            <section className="space-y-4 flex-1 overflow-hidden flex flex-col">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-zinc-300">Recent Activity</h3>
                                    <button className="text-xs text-zinc-500 hover:text-zinc-300">View all</button>
                                </div>
                                <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                                    <ActivityItem
                                        user="Leonel Ngoya"
                                        action="uploaded"
                                        target="Dashboard Mockup.fig"
                                        time="2 min ago"
                                        icon={Download01Icon}
                                        iconColor="text-emerald-400 bg-emerald-500/10"
                                    />
                                    <ActivityItem
                                        user="Sarah Chen"
                                        action="shared"
                                        target="Brand Guidelines.pdf"
                                        time="15 min ago"
                                        icon={Share01Icon}
                                        iconColor="text-blue-400 bg-blue-500/10"
                                    />
                                    <ActivityItem
                                        user="Alex Kim"
                                        action="edited"
                                        target="UI Components.sketch"
                                        time="1 hour ago"
                                        icon={PencilEdit02Icon}
                                        iconColor="text-orange-400 bg-orange-500/10"
                                    />
                                    <ActivityItem
                                        user="Marie Dupont"
                                        action="downloaded"
                                        target="Product Demo.mp4"
                                        time="3 hours ago"
                                        icon={Download01Icon}
                                        iconColor="text-purple-400 bg-purple-500/10"
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

// Components

function StorageCard({ icon: Icon, label, amount, percentage, color, bg, barColor }: any) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 hover:border-zinc-700 transition-colors">
            <div className={cn("size-10 rounded-lg flex items-center justify-center", bg, color)}>
                <HugeiconsIcon icon={Icon} className="size-5" />
            </div>
            <div>
                <div className="font-medium text-sm text-zinc-200">{label}</div>
                <div className="text-xs text-zinc-500">{amount}</div>
            </div>
            <div className="mt-auto pt-2">
                <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                    <span>Used</span>
                    <span>{percentage}%</span>
                </div>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", barColor)} style={{ width: `${percentage}%` }} />
                </div>
            </div>
        </div>
    );
}

function FolderCard({ label, count, size, color }: any) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-2 hover:bg-zinc-800/50 transition-colors group cursor-pointer relative">
            <div className="flex items-start justify-between">
                <HugeiconsIcon icon={Folder01Icon} className={cn("size-8 transition-colors", color)} />
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-zinc-300">
                    <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                </button>
            </div>
            <div className="mt-2">
                <div className="font-medium text-sm text-zinc-200 truncate">{label}</div>
                <div className="text-xs text-zinc-500">{count} files • {size}</div>
            </div>
        </div>
    );
}

function FileRow({ name, size, modified, created, icon: Icon, color }: any) {
    return (
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 p-4 items-center hover:bg-zinc-800/30 transition-colors group cursor-pointer">
            <div className="w-8 flex justify-center">
                <HugeiconsIcon icon={Icon} className={cn("size-5", color)} />
            </div>
            <div className="font-medium text-sm text-zinc-300 truncate">{name}</div>
            <div className="w-24 text-right text-xs text-zinc-500">{size}</div>
            <div className="w-32 text-right text-xs text-zinc-500">{modified}</div>
            <div className="w-32 text-right text-xs text-zinc-500">{created}</div>
            <div className="w-10 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-zinc-500 hover:text-zinc-300 p-1">
                    <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                </button>
            </div>
        </div>
    );
}

function LegendItem({ label, size, color }: any) {
    return (
        <div className="flex items-center gap-2">
            <div className={cn("size-2 rounded-full", color)} />
            <div className="flex flex-col">
                <span className="text-xs font-medium text-zinc-400">{label}</span>
                <span className="text-[10px] text-zinc-600">{size}</span>
            </div>
        </div>
    );
}

function ActivityItem({ user, action, target, time, icon: Icon, iconColor }: any) {
    return (
        <div className="flex gap-3">
            <div className="relative">
                <Avatar className="size-8 border-2 border-zinc-950"><AvatarImage src={`https://i.pravatar.cc/150?u=${user}`} /><AvatarFallback>U</AvatarFallback></Avatar>
                <div className={cn("absolute -bottom-1 -right-1 size-4 rounded-full flex items-center justify-center border border-zinc-950", iconColor)}>
                    <HugeiconsIcon icon={Icon} className="size-2.5" />
                </div>
            </div>
            <div className="flex flex-col min-w-0">
                <p className="text-sm text-zinc-300">
                    <span className="font-medium">{user}</span> <span className="text-zinc-500">{action}</span> <br />
                    <span className="text-zinc-400 truncate block">{target}</span>
                </p>
                <span className="text-xs text-zinc-600 mt-0.5">{time}</span>
            </div>
        </div>
    );
}
