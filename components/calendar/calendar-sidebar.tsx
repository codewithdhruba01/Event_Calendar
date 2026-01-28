"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Home01Icon,
  UserGroupIcon,
  FileEditIcon,
  Calendar01Icon,
  ChartBarLineIcon,
  Location01Icon,
  Folder01Icon,
  Share01Icon,
  Dollar01Icon,
  SparklesIcon,
  MortarboardIcon,
  Key01Icon,
  CrownIcon,
  Settings01Icon,
  ArrowDown01Icon,
  Layers01Icon,
  ArrowUpRight01Icon,
  Note01Icon,
  CheckListIcon,
} from "@hugeicons/core-free-icons";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Kbd } from "@/components/ui/kbd";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useJobStore } from "@/store/job-store";
import { CreateJobDialog } from "@/components/jobs/create-job-dialog";
import { Add01Icon } from "@hugeicons/core-free-icons";

export function CalendarSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [featuredOpen, setFeaturedOpen] = useState(true);
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const { jobs, removeJob } = useJobStore();

  return (
    <Sidebar className="lg:border-r-0!" {...props}>
      <CreateJobDialog open={createJobOpen} onOpenChange={setCreateJobOpen} />
      <SidebarHeader className="pb-0">
        <div className="px-2 py-1.5">
          <Link
            href="https://square.lndev.me"
            target="_blank"
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <div className="size-9 shrink-0 bg-linear-to-br from-purple-500 to-pink-600 rounded-md shadow flex items-center justify-center text-white text-xs font-semibold border border-border">
                SU
              </div>
              <div className="flex flex-col items-start">
                <h1 className="font-semibold text-sm">Square UI</h1>
                <div className="flex items-center gap-1">
                  <HugeiconsIcon icon={Layers01Icon} className="size-3" />
                  <span className="text-xs">4 workspaces</span>
                </div>
              </div>
            </div>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              {/* Optional: Show nothing or a sign in button icon? 
                   The user specifically wants the 'login user image'. 
                   If signed out, keeping nothing is cleaner or a generic icon. */}
              <Link href="#" className="size-7 flex items-center justify-center rounded-full bg-muted text-muted-foreground">
                <HugeiconsIcon icon={UserGroupIcon} className="size-4" />
              </Link>
            </SignedOut>
          </Link>
          <div className="relative">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 dark:text-muted-foreground z-10"
            />
            <Input
              placeholder="Search anything"
              className="pl-8 pr-8 h-8 text-xs bg-neutral-100 dark:bg-background border-2 border-border"
            />
            <div className="flex items-center gap-0.5 rounded border border-border bg-sidebar px-1.5 py-0.5 shrink-0 absolute right-2 top-1/2 -translate-y-1/2">
              <span className="text-[10px] font-medium text-muted-foreground leading-none tracking-[-0.1px]">
                ⌘
              </span>
              <Kbd className="h-auto min-w-0 px-0 py-0 text-[10px] leading-none tracking-[-0.1px] bg-transparent border-0">
                K
              </Kbd>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                  <HugeiconsIcon icon={Home01Icon} className="size-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                  <HugeiconsIcon icon={UserGroupIcon} className="size-4" />
                  <span>Candidates</span>
                  <span className="ml-auto text-xs">146</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                  <HugeiconsIcon icon={FileEditIcon} className="size-4" />
                  <span>Job Listings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/"}
                  className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground"
                  render={<Link href="/" />}
                >
                  <HugeiconsIcon icon={Calendar01Icon} className="size-4" />
                  <span>Calendar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/sticky-notes"}
                  className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground"
                  render={<Link href="/sticky-notes" />}
                >
                  <HugeiconsIcon icon={Note01Icon} className="size-4" />
                  <span>Sticky Notes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/todo"}
                  className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground"
                  render={<Link href="/todo" />}
                >
                  <HugeiconsIcon icon={CheckListIcon} className="size-4" />
                  <span>Todo List</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                  <HugeiconsIcon icon={ChartBarLineIcon} className="size-4" />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                  <HugeiconsIcon icon={Location01Icon} className="size-4" />
                  <span>Employees</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                  <HugeiconsIcon icon={Folder01Icon} className="size-4" />
                  <span>Files</span>
                  <HugeiconsIcon
                    icon={SparklesIcon}
                    className="ml-auto size-3 text-cyan-500"
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                  <HugeiconsIcon icon={Share01Icon} className="size-4" />
                  <span>Time Off</span>
                  <HugeiconsIcon
                    icon={SparklesIcon}
                    className="ml-auto size-3 text-cyan-500"
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                  <HugeiconsIcon icon={Dollar01Icon} className="size-4" />
                  <span>Payroll</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-0" />

        <SidebarGroup>
          <Collapsible open={featuredOpen} onOpenChange={setFeaturedOpen}>
            <div className="flex items-center justify-between group/label pr-2">
              <CollapsibleTrigger className="flex-1 text-left">
                <SidebarGroupLabel className="h-4 pb-4 pt-2 text-xs text-muted-foreground hover:text-foreground hover:bg-transparent cursor-pointer w-full flex items-center">
                  <span>Featured job post</span>
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className={cn(
                      "size-4 transition-transform ml-auto",
                      featuredOpen && "rotate-180"
                    )}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <Button
                variant="ghost"
                size="icon"
                className="size-4 h-4 w-4 p-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  setCreateJobOpen(true);
                }}
              >
                <HugeiconsIcon icon={Add01Icon} className="size-3" />
              </Button>
            </div>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {jobs.map((job) => (
                    <SidebarMenuItem key={job.id}>
                      <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground group/item">
                        <HugeiconsIcon icon={FileEditIcon} className="size-4" />
                        <span>{job.title}</span>
                        <div className="ml-auto flex items-center gap-1 opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-4 p-0 h-4 w-4 text-muted-foreground hover:text-red-500"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeJob(job.id);
                            }}
                          >
                            <span className="sr-only">Delete</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.49 1.45 6.681 6.681 0 01-7.612-2.25h-1.378a2.25 2.25 0 01-2.25-2.25V4.75a2.25 2.25 0 012.25-2.25h1.378a2.25 2.25 0 012.25 2.25v.228zm0 4.036h2.863l-.26 13.918a2.25 2.25 0 01-2.247 2.208H6.604a2.25 2.25 0 01-2.247-2.208L4.096 8.514H6.75m9.75 0h-9.75" clipRule="evenodd" />
                              <path d="M10 11a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 0110 11zM14 11a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 0114 11z" />
                            </svg>
                          </Button>
                          <HugeiconsIcon
                            icon={SparklesIcon}
                            className="size-3 text-cyan-500"
                          />
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Link
          href="https://square.lndev.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full">
            square.lndev.me
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" />
          </Button>
        </Link>

        <div className="space-y-1 my-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                <HugeiconsIcon icon={SparklesIcon} className="size-4" />
                <span>What&apos;s New</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                <HugeiconsIcon icon={MortarboardIcon} className="size-4" />
                <span>Staff University</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                <HugeiconsIcon icon={Key01Icon} className="size-4" />
                <span>API Access</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-[26px] text-xs text-zinc-950 dark:text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-muted/50 hover:text-zinc-950 dark:hover:text-foreground">
                <HugeiconsIcon icon={CrownIcon} className="size-4" />
                <span>Plans</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <div className="flex items-center gap-3">
          <SignedIn>
            <div className="flex items-center gap-3 w-full">
              <UserButton afterSignOutUrl="/" showName userProfileMode="modal" />
              <div className="flex-1 min-w-0 flex flex-col items-start">
                {/* Clerk handles the name/email display in the UserButton, but we can custom style if needed, 
                 for now we let UserButton handle the avatar and popup. 
                 If we want custom text next to it we need useUser() hook. */}
              </div>
            </div>
          </SignedIn>
          <HugeiconsIcon
            icon={Settings01Icon}
            className="size-4 text-muted-foreground ml-auto"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
