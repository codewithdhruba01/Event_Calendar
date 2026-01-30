"use client";

import Link from "next/link";

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
    ArrowRight01Icon,
    Folder02Icon,
    Share05Icon,
    Delete01Icon,
    Edit02Icon,
    ArrowUpRight01Icon,
    FolderAddIcon,
    Add01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Types
interface Folder {
    id: string;
    label: string;
    count: number;
    size: string;
    color: string;
}

export default function FilesPage() {
    // State
    const [folders, setFolders] = useState<Folder[]>([
        { id: "1", label: "Design Assets", count: 24, size: "1.2 GB", color: "text-purple-400" },
        { id: "2", label: "Projects", count: 18, size: "856 MB", color: "text-blue-400" },
        { id: "3", label: "Documents", count: 45, size: "234 MB", color: "text-orange-400" },
        { id: "4", label: "Media", count: 67, size: "4.5 GB", color: "text-pink-400" },
        { id: "5", label: "Archives", count: 12, size: "2.1 GB", color: "text-emerald-400" },
    ]);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isRenameOpen, setIsRenameOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [folderToRename, setFolderToRename] = useState<Folder | null>(null);
    const [renameValue, setRenameValue] = useState("");

    // Handlers
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    const handleCreateFolder = () => {
        if (!newFolderName.trim()) return;
        const newFolder: Folder = {
            id: Date.now().toString(),
            label: newFolderName,
            count: 0,
            size: "0 B",
            color: "text-muted-foreground", // Default color
        };
        setFolders([...folders, newFolder]);
        setNewFolderName("");
        setIsCreateOpen(false);
    };

    const handleDeleteFolder = (id: string) => {
        setFolders(folders.filter(f => f.id !== id));
    };

    const openRenameDialog = (folder: Folder) => {
        setFolderToRename(folder);
        setRenameValue(folder.label);
        setIsRenameOpen(true);
    };

    const handleRenameFolder = () => {
        if (!renameValue.trim() || !folderToRename) return;
        setFolders(folders.map(f => f.id === folderToRename.id ? { ...f, label: renameValue } : f));
        setIsRenameOpen(false);
        setFolderToRename(null);
        setRenameValue("");
    };

    return (
        <SidebarProvider>
            <CalendarSidebar />
            <SidebarInset>
                <div className="flex flex-col h-svh overflow-hidden bg-background text-foreground font-sans">
                    {/* Header - Full Width */}
                    <AppHeader
                        showNotifications={false}
                        showSignIn={false}
                        className="py-5 md:py-5"
                        breadcrumbs={
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl font-semibold tracking-tight text-foreground">My Files</h1>
                                <p className="text-muted-foreground text-xs">Manage your documents and assets.</p>
                            </div>
                        }
                    >
                        <div className="relative hidden md:block group">
                            <HugeiconsIcon icon={Search01Icon} className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            <Input
                                placeholder="Search files..."
                                className="pl-9 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground w-64 focus-visible:ring-ring h-9 transition-colors group-hover:border-accent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-muted/50 border border-input rounded-lg p-1 gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn("size-7 rounded-md hover:bg-background hover:text-foreground", viewMode === 'grid' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <HugeiconsIcon icon={GridViewIcon} className="size-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn("size-7 rounded-md hover:bg-background hover:text-foreground", viewMode === 'list' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}
                                    onClick={() => setViewMode('list')}
                                >
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
                                    <h2 className="text-lg font-medium text-muted-foreground">Folders</h2>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 text-xs text-muted-foreground hover:text-foreground gap-2"
                                        onClick={() => setIsCreateOpen(true)}
                                    >
                                        <HugeiconsIcon icon={FolderAddIcon} className="size-4" />
                                        New Folder
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {folders.map((folder) => (
                                        <div key={folder.id} className="contents">
                                            {/* We wrap in contents div to keep key on element but preserve grid layout if needed, though Link is better wrapper */}
                                            <FolderCard
                                                folder={folder}
                                                onDelete={() => handleDeleteFolder(folder.id)}
                                                onRename={() => openRenameDialog(folder)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Recent Files */}
                            <section className="flex-1">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-medium text-muted-foreground">All Files</h2>
                                </div>
                                {viewMode === 'list' ? (
                                    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                                        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 p-4 text-xs font-medium text-muted-foreground border-b border-border uppercase tracking-wider">
                                            <div className="w-8"></div>
                                            <div>Name</div>
                                            <div className="w-24 text-right">Size</div>
                                            <div className="w-32 text-right">Modified</div>
                                            <div className="w-32 text-right">Created</div>
                                            <div className="w-10"></div>
                                        </div>
                                        <div className="divide-y divide-border">
                                            {ALL_FILES.map((file, i) => (
                                                <FileRow key={i} {...file} />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                        {ALL_FILES.map((file, i) => (
                                            <FileCard key={i} {...file} />
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Right Panel - Info */}
                        <div className="w-96 border-l border-border bg-muted/10 hidden xl:flex flex-col p-6 space-y-6 overflow-y-auto">

                            {/* Storage Overview Card */}
                            <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[15px] font-semibold text-card-foreground">Storage Overview</h3>
                                    <Link href="/plans" className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">Upgrade</Link>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-2.5 w-full bg-muted/50 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-purple-500 w-[27%]" />
                                        <div className="h-full bg-pink-500 w-[36%]" />
                                        <div className="h-full bg-orange-500 w-[17%]" />
                                        <div className="h-full bg-emerald-500 w-[13%]" />
                                        <div className="h-full bg-muted-foreground/30 w-[7%]" />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground text-[13px]">8.9 GB of 15 GB used</span>
                                        <span className="font-bold text-card-foreground text-[15px]">59%</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <LegendItem label="Images" size="2.4 GB" color="bg-purple-500" />
                                    <LegendItem label="Videos" size="3.2 GB" color="bg-pink-500" />
                                    <LegendItem label="Documents" size="1.5 GB" color="bg-orange-500" />
                                    <LegendItem label="Archives" size="1.2 GB" color="bg-emerald-500" />
                                    <LegendItem label="Other" size="0.6 GB" color="bg-muted-foreground/30" />
                                </div>
                            </div>

                            {/* Team Members Card */}
                            <div className="bg-card border border-border rounded-2xl p-4 space-y-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[15px] font-semibold text-card-foreground">Team Members</h3>
                                    <span className="text-xs font-medium text-muted-foreground">5 people</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="size-8 rounded-full border-2 border-background bg-gradient-to-br from-cyan-400 to-blue-500 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>John Doe</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="size-8 rounded-full border-2 border-background bg-gradient-to-br from-blue-500 to-purple-500 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>Jane Smith</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="size-8 rounded-full border-2 border-background bg-gradient-to-br from-purple-500 to-pink-500 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>Mike Johnson</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="size-8 rounded-full border-2 border-background bg-gradient-to-br from-pink-500 to-rose-500 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent>Sarah Wilson</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <div className="size-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground cursor-help">
                                                    +1
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>And 1 more</TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <button className="size-8 rounded-full border border-border bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                                        <HugeiconsIcon icon={Add01Icon} className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Recent Activity Card */}
                            <div className="bg-card border border-border rounded-2xl p-6 flex-1 flex flex-col min-h-0 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-[15px] font-semibold text-card-foreground">Recent Activity</h3>
                                    <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">View all</button>
                                </div>
                                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
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

            </SidebarInset >

            {/* Create Folder Dialog */}
            < Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen} >
                <DialogContent className="sm:max-w-[425px] bg-background border-border text-foreground">
                    <DialogHeader>
                        <DialogTitle>Create New Folder</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Enter a name for your new folder.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right text-muted-foreground">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                className="col-span-3 bg-muted/50 border-input text-foreground focus-visible:ring-ring"
                                placeholder="My New Folder"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleCreateFolder();
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsCreateOpen(false)} className="text-muted-foreground hover:text-foreground hover:bg-accent">Cancel</Button>
                        <Button onClick={handleCreateFolder} className="bg-primary text-primary-foreground hover:bg-primary/90">Create Folder</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >

            {/* Rename Folder Dialog */}
            < Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen} >
                <DialogContent className="sm:max-w-[425px] bg-background border-border text-foreground">
                    <DialogHeader>
                        <DialogTitle>Rename Folder</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Enter a new name for the folder.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rename" className="text-right text-muted-foreground">
                                Name
                            </Label>
                            <Input
                                id="rename"
                                value={renameValue}
                                onChange={(e) => setRenameValue(e.target.value)}
                                className="col-span-3 bg-muted/50 border-input text-foreground focus-visible:ring-ring"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleRenameFolder();
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsRenameOpen(false)} className="text-muted-foreground hover:text-foreground hover:bg-accent">Cancel</Button>
                        <Button onClick={handleRenameFolder} className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </SidebarProvider >
    );
}

// Components

function StorageCard({ icon: Icon, label, amount, percentage, color, bg, barColor }: any) {
    return (
        <div className="bg-card border border-border rounded-2xl p-3 flex flex-col gap-2 hover:bg-accent/50 transition-colors shadow-sm">
            <div className={cn("size-8 rounded-lg flex items-center justify-center border border-border/50", bg, color)}>
                <HugeiconsIcon icon={Icon} className="size-4" />
            </div>
            <div>
                <div className="font-medium text-[13px] text-card-foreground">{label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{amount}</div>
            </div>
            <div className="mt-auto pt-1">
                <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
                    <span>Used</span>
                    <span>{percentage}%</span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", barColor)} style={{ width: `${percentage}%` }} />
                </div>
            </div>
        </div>
    );
}

function FolderCard({ folder, onDelete, onRename }: { folder: Folder, onDelete: () => void, onRename: () => void }) {
    // Generate slug for link
    const slug = folder.label.toLowerCase().replace(/ /g, "-");

    return (
        <div className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3 hover:bg-accent/50 transition-colors group cursor-pointer relative shadow-sm">
            <Link href={`/files/${slug}`} className="absolute inset-0 z-10" />
            <div className="flex items-start justify-between relative">
                <HugeiconsIcon icon={Folder01Icon} className={cn("size-8 transition-colors", folder.color)} />
                <DropdownMenu>
                    <DropdownMenuTrigger onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-2 -mt-2 cursor-pointer z-20 relative">
                        <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent onClick={(e) => e.preventDefault()} align="end" className="w-48 bg-popover border-border">
                        <Link href={`/files/${slug}`} passHref>
                            <DropdownMenuItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground gap-2 cursor-pointer">
                                <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
                                Open
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                            className="text-popover-foreground focus:bg-accent focus:text-accent-foreground gap-2 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRename();
                            }}
                        >
                            <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                            Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground gap-2 cursor-pointer">
                            <HugeiconsIcon icon={Share05Icon} className="size-4" />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-400 focus:bg-red-500/10 focus:text-red-400 gap-2 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete();
                            }}
                        >
                            <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="mt-1 text-left">
                <div className="font-medium text-[13px] text-card-foreground truncate leading-snug">{folder.label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{folder.count} files • {folder.size}</div>
            </div>
        </div>
    );
}

function FileRow({ name, size, modified, created, icon: Icon, color }: any) {
    return (
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-4 p-4 items-center hover:bg-accent/50 transition-colors group cursor-pointer">
            <div className="w-8 flex justify-center">
                <HugeiconsIcon icon={Icon} className={cn("size-5", color)} />
            </div>
            <div className="font-medium text-sm text-foreground truncate">{name}</div>
            <div className="w-24 text-right text-xs text-muted-foreground">{size}</div>
            <div className="w-32 text-right text-xs text-muted-foreground">{modified}</div>
            <div className="w-32 text-right text-xs text-muted-foreground">{created}</div>
            <div className="w-10 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                    <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground p-1 cursor-pointer">
                        <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
                        <DropdownMenuItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground gap-2 cursor-pointer">
                            <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
                            Open
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground gap-2 cursor-pointer">
                            <HugeiconsIcon icon={Share05Icon} className="size-4" />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground gap-2 cursor-pointer">
                            <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                            Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 gap-2 cursor-pointer">
                            <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

// Data
const ALL_FILES = [
    { name: "Dashboard Mockup.fig", size: "12.4 MB", modified: "2 hours ago", created: "Dec 15, 2024", icon: Image01Icon, color: "text-purple-400" },
    { name: "Brand Guidelines.pdf", size: "8.2 MB", modified: "Yesterday", created: "Dec 10, 2024", icon: File02Icon, color: "text-orange-400" },
    { name: "Product Demo.mp4", size: "248 MB", modified: "3 days ago", created: "Dec 8, 2024", icon: VideoReplayIcon, color: "text-pink-400" },
    { name: "Client Presentation.pptx", size: "15.7 MB", modified: "1 week ago", created: "Dec 1, 2024", icon: File01Icon, color: "text-orange-400" },
    { name: "Source Code.zip", size: "124 MB", modified: "2 weeks ago", created: "Nov 25, 2024", icon: ArchiveIcon, color: "text-emerald-400" },
    { name: "UI Components.sketch", size: "34.5 MB", modified: "4 days ago", created: "Dec 5, 2024", icon: Image01Icon, color: "text-purple-400" },
];

function FileCard({ name, size, modified, icon: Icon, color }: any) {
    return (
        <div className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3 hover:bg-accent/50 transition-colors group cursor-pointer relative shadow-sm">
            <div className="flex items-start justify-between relative z-10">
                <div className={cn("p-2 rounded-lg bg-muted/50 border border-border/50", color.replace('text-', 'bg-').replace('400', '500/10'))}>
                    <HugeiconsIcon icon={Icon} className={cn("size-6 transition-colors", color)} />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger onClick={(e) => e.preventDefault()} className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-2 -mt-2 cursor-pointer relative">
                        <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent onClick={(e) => e.preventDefault()} align="end" className="w-48 bg-popover border-border">
                        <DropdownMenuItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground gap-2 cursor-pointer">
                            <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
                            Open
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground gap-2 cursor-pointer">
                            <HugeiconsIcon icon={Share05Icon} className="size-4" />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-popover-foreground focus:bg-accent focus:text-accent-foreground gap-2 cursor-pointer">
                            <HugeiconsIcon icon={Edit02Icon} className="size-4" />
                            Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 gap-2 cursor-pointer">
                            <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="mt-1">
                <div className="font-medium text-[13px] text-card-foreground truncate leading-snug">{name}</div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-muted-foreground">{size}</span>
                    <span className="text-[11px] text-muted-foreground">•</span>
                    <span className="text-[11px] text-muted-foreground">{modified}</span>
                </div>
            </div>
        </div>
    );
}

function LegendItem({ label, size, color }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className={cn("size-2 rounded-full", color)} />
                <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <span className="text-xs font-medium text-foreground">{size}</span>
        </div>
    );
}

function ActivityItem({ user, action, target, time, icon: Icon, iconColor, avatarGradient }: any) {
    return (
        <div className="flex items-start gap-3 group">
            <div className={cn("size-8 rounded-full border-2 border-background bg-gradient-to-br shrink-0", avatarGradient)} />
            <div className="flex-1 min-w-0 pt-0.5">
                <div className="text-[13px] text-foreground leading-snug">
                    <span className="font-semibold">{user}</span> <span className="text-muted-foreground">{action}</span> <span className="font-medium text-foreground">{target}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <HugeiconsIcon icon={Icon} className={cn("size-3.5", iconColor)} />
                    <span className="text-[11px] text-muted-foreground">{time}</span>
                </div>
            </div>
        </div>
    );
}
