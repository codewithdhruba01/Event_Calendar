"use client";

import { AppHeader } from "@/components/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
    Home01Icon,
    Add01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export default function FilesPage() {
    return (
        <SidebarProvider>
            <CalendarSidebar />
            <SidebarInset>
                <div className="flex flex-col h-svh overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
                    {/* Header - Full Width */}
                    <AppHeader
                        showNotifications={false}
                        showSignIn={false}
                        className="py-5 md:py-5"
                    >
                        <div className="relative hidden md:block group">
                            <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500 group-hover:text-zinc-400 transition-colors" />
                            <Input
                                placeholder="Search files..."
                                className="pl-9 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 w-64 focus-visible:ring-zinc-700 h-9 transition-colors group-hover:border-zinc-700"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 gap-1">
                                <Button variant="ghost" size="icon" className="size-7 rounded-md hover:bg-zinc-800 text-zinc-100 bg-zinc-800">
                                    <HugeiconsIcon icon={GridViewIcon} className="size-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="size-7 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100">
                                    <HugeiconsIcon icon={FilterHorizontalIcon} className="size-4" />
                                </Button>
                            </div>
                            <Button size="sm" className="hidden md:flex gap-2">
                                <HugeiconsIcon icon={Upload02Icon} className="size-4" />
                                Upload
                            </Button>
                        </div>
                    </AppHeader>

                    {/* Main Container - Split View on Desktop */}
                    <div className="flex flex-1 overflow-hidden">

                        {/* Left Column - Main Content */}
                        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 md:p-8 space-y-8">

                            {/* Header */}
                            {/* Header */}


                            <div className="px-1">
                                <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">My Files</h1>
                                <p className="text-zinc-400 text-sm">Manage your documents and assets.</p>
                            </div>

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
                        <div className="w-96 border-l border-zinc-800 bg-zinc-950/50 hidden xl:flex flex-col p-6 space-y-6 overflow-y-auto">

                            {/* Storage Overview Card */}
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-semibold text-zinc-100">Storage Overview</h3>
                                    <button className="text-xs font-medium text-purple-400 hover:text-purple-300">Upgrade</button>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-purple-500 w-[27%]" />
                                        <div className="h-full bg-pink-500 w-[36%]" />
                                        <div className="h-full bg-orange-500 w-[17%]" />
                                        <div className="h-full bg-emerald-500 w-[13%]" />
                                        <div className="h-full bg-zinc-600 w-[7%]" />
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">8.9 GB of 15 GB used</span>
                                        <span className="font-medium text-zinc-100">59%</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <LegendItem label="Images" size="2.4 GB" color="bg-purple-500" />
                                    <LegendItem label="Videos" size="3.2 GB" color="bg-pink-500" />
                                    <LegendItem label="Documents" size="1.5 GB" color="bg-orange-500" />
                                    <LegendItem label="Archives" size="1.2 GB" color="bg-emerald-500" />
                                    <LegendItem label="Other" size="0.6 GB" color="bg-zinc-600" />
                                </div>
                            </div>

                            {/* Team Members Card */}
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-base font-semibold text-zinc-100">Team Members</h3>
                                    <span className="text-xs font-medium text-zinc-500">5 people</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-3">
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="size-10 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-cyan-400 to-blue-500 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>John Doe</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="size-10 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-blue-500 to-purple-500 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>Jane Smith</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="size-10 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-purple-500 to-pink-500 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>Mike Johnson</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="size-10 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-pink-500 to-rose-500 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>Sarah Wilson</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="size-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400 cursor-help">
                                                    +1
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>And 1 more</TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <button className="size-10 rounded-xl border border-zinc-700/50 bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
                                        <HugeiconsIcon icon={Add01Icon} className="size-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity Card */}
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex-1 flex flex-col min-h-0">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-base font-semibold text-zinc-100">Recent Activity</h3>
                                    <button className="text-xs font-medium text-zinc-500 hover:text-zinc-300">View all</button>
                                </div>
                                <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                                    <ActivityItem
                                        user="Leonel Ngoya"
                                        action="uploaded"
                                        target="Dashboard Mockup.fig"
                                        time="2 min ago"
                                        icon={Upload02Icon}
                                        iconColor="text-emerald-400"
                                        avatarGradient="from-yellow-200 to-lime-500"
                                    />
                                    <ActivityItem
                                        user="Sarah Chen"
                                        action="shared"
                                        target="Brand Guidelines.pdf"
                                        time="15 min ago"
                                        icon={Share01Icon}
                                        iconColor="text-blue-400"
                                        avatarGradient="from-cyan-300 to-blue-500"
                                    />
                                    <ActivityItem
                                        user="Alex Kim"
                                        action="edited"
                                        target="UI Components.sketch"
                                        time="1 hour ago"
                                        icon={PencilEdit02Icon}
                                        iconColor="text-amber-400"
                                        avatarGradient="from-purple-400 to-indigo-500"
                                    />
                                    <ActivityItem
                                        user="Marie Dupont"
                                        action="downloaded"
                                        target="Product Demo.mp4"
                                        time="3 hours ago"
                                        icon={Download01Icon}
                                        iconColor="text-purple-400"
                                        avatarGradient="from-fuchsia-400 to-pink-500"
                                    />
                                    <ActivityItem
                                        user="James Wilson"
                                        action="moved"
                                        target="Client Presentation.pptx"
                                        time="5 hours ago"
                                        icon={Share01Icon}
                                        iconColor="text-cyan-400"
                                        avatarGradient="from-orange-200 to-amber-500"
                                    />
                                    <ActivityItem
                                        user="Emma Taylor"
                                        action="commented on"
                                        target="App Icon.png"
                                        time="Yesterday"
                                        icon={PencilEdit02Icon}
                                        iconColor="text-pink-400"
                                        avatarGradient="from-pink-300 to-rose-500"
                                    />
                                    <ActivityItem
                                        user="David Brown"
                                        action="deleted"
                                        target="Old Backup.zip"
                                        time="Yesterday"
                                        icon={Delete02Icon}
                                        iconColor="text-red-400"
                                        avatarGradient="from-lime-300 to-green-500"
                                    />
                                </div>
                            </div>
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
        <div className="flex items-center gap-3 bg-zinc-950/30 p-2.5 rounded-xl border border-zinc-800/30">
            <div className={cn("size-2.5 rounded-full shrink-0", color)} />
            <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-zinc-300 truncate">{label}</span>
                <span className="text-[10px] text-zinc-100 font-bold">{size}</span>
            </div>
        </div>
    );
}

function ActivityItem({ user, action, target, time, icon: Icon, iconColor, avatarGradient }: any) {
    return (
        <div className="flex gap-4 group">
            <div className="relative shrink-0">
                <div className={cn("size-10 rounded-full bg-gradient-to-br", avatarGradient)} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-zinc-100 leading-snug">
                        <span className="font-semibold">{user}</span> <span className="text-zinc-500">{action}</span> <br />
                        <span className="text-zinc-500 truncate block text-xs mt-0.5">{target}</span>
                    </p>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className={cn("p-1.5 rounded-lg bg-zinc-800/50 group-hover:bg-zinc-800 transition-colors", iconColor)}>
                            <HugeiconsIcon icon={Icon} className="size-3.5" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-1">
                    <span className="text-[10px] text-zinc-600">{time}</span>
                </div>
            </div>
        </div>
    );
}
