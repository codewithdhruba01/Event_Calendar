"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
    Notification01Icon,
    Github01Icon,
    Tick02Icon,
    Clock01Icon,
    AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignedOut, SignInButton } from "@clerk/nextjs";

export function AppHeader({ children, centerContent, breadcrumbs }: { children?: React.ReactNode; centerContent?: React.ReactNode; breadcrumbs?: React.ReactNode }) {
    return (
        <div className="border-b border-border bg-background transition-colors duration-300 relative">
            <div className="px-3 md:px-6 py-2.5 md:py-3">
                <div className="flex items-center justify-between gap-2 md:gap-3 flex-nowrap">
                    {/* Left Side: Sidebar Trigger + Breadcrumbs */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <SidebarTrigger className="shrink-0 text-muted-foreground hover:text-foreground" />
                        <div className="flex items-center gap-2 min-w-0">
                            {breadcrumbs}
                        </div>
                    </div>

                    {/* Center Content (Absolute centered) */}
                    {centerContent && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                            {centerContent}
                        </div>
                    )}

                    {/* Right Side: Icons */}
                    <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2 shrink-0">
                        {children}
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative size-7 md:size-8 shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                                    >
                                        <HugeiconsIcon icon={Notification01Icon} className="size-4" />
                                        <span className="absolute top-1 right-1 size-1 bg-red-500 rounded-full" />
                                    </Button>
                                }
                            />
                            <DropdownMenuContent align="end" className="w-80 bg-popover border-border text-popover-foreground">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-accent focus:text-accent-foreground">
                                    <div className="flex items-center gap-2 w-full">
                                        <HugeiconsIcon
                                            icon={Tick02Icon}
                                            className="size-4 text-green-500"
                                        />
                                        <span className="text-sm font-medium flex-1">
                                            Meeting confirmed
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            2m ago
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground pl-6">
                                        Daily checkin has been confirmed for tomorrow at 9:00 AM
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-accent focus:text-accent-foreground">
                                    <div className="flex items-center gap-2 w-full">
                                        <HugeiconsIcon
                                            icon={Clock01Icon}
                                            className="size-4 text-blue-500"
                                        />
                                        <span className="text-sm font-medium flex-1">
                                            Reminder
                                        </span>
                                        <span className="text-xs text-zinc-500">
                                            15m ago
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-400 pl-6">
                                        Team Standup starts in 30 minutes
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-accent focus:text-accent-foreground">
                                    <div className="flex items-center gap-2 w-full">
                                        <HugeiconsIcon
                                            icon={AlertCircleIcon}
                                            className="size-4 text-orange-500"
                                        />
                                        <span className="text-sm font-medium flex-1">
                                            Event updated
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            1h ago
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground pl-6">
                                        Design Workshop time has been changed to 2:00 PM
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-accent focus:text-accent-foreground">
                                    <div className="flex items-center gap-2 w-full">
                                        <HugeiconsIcon
                                            icon={Tick02Icon}
                                            className="size-4 text-green-500"
                                        />
                                        <span className="text-sm font-medium flex-1">
                                            New participant
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            3h ago
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground pl-6">
                                        Sarah joined the Sprint Planning meeting
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem className="justify-center cursor-pointer focus:bg-accent focus:text-accent-foreground">
                                    <span className="text-xs text-muted-foreground">
                                        View all notifications
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                                    Sign In
                                </Button>
                            </SignInButton>
                        </SignedOut>

                        <ThemeToggle />

                        <Link
                            href="https://github.com/ln-dev7/square-ui/tree/master/templates-baseui/calendar"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                className="size-7 md:size-8 shrink-0 border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent"
                            >
                                <HugeiconsIcon icon={Github01Icon} className="size-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
