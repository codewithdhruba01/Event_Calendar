"use client";

import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Tick02Icon,
    CrownIcon,
    FlashIcon,
    StarIcon,
    ArrowRight01Icon
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CalendarSidebar } from "@/components/calendar/calendar-sidebar";

export default function PlansPage() {
    return (
        <SidebarProvider>
            <CalendarSidebar />
            <SidebarInset>
                <div className="h-full flex flex-col bg-zinc-50/50 dark:bg-background transition-colors duration-300">
                    <AppHeader />
                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                            {/* Header Section */}
                            <div className="text-center space-y-4 mb-16">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                                    Simple, Transparent Pricing
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Choose the plan that fits your needs. No hidden fees, cancel anytime.
                                </p>
                            </div>

                            {/* Pricing Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {/* Free Plan */}
                                <PricingCard
                                    title="Starter"
                                    price="$0"
                                    description="Perfect for individuals just getting started."
                                    icon={StarIcon}
                                    features={[
                                        "Basic Task Management",
                                        "Up to 3 Projects",
                                        "7 Days History",
                                        "Community Support"
                                    ]}
                                    buttonText="Get Started"
                                    buttonVariant="outline"
                                />

                                {/* Pro Plan */}
                                <PricingCard
                                    title="Pro"
                                    price="$19"
                                    description="For power users who need more organization."
                                    icon={CrownIcon}
                                    features={[
                                        "Unlimited Tasks & Projects",
                                        "Advanced Analytics",
                                        "30 Days History",
                                        "Priority Support",
                                        "Custom Themes",
                                        "Collaborative Features"
                                    ]}
                                    isPopular
                                    buttonText="Upgrade to Pro"
                                    buttonVariant="default"
                                />

                                {/* Enterprise Plan */}
                                <PricingCard
                                    title="Enterprise"
                                    price="$49"
                                    description="Ultimate control for teams and businesses."
                                    icon={FlashIcon}
                                    features={[
                                        "Everything in Pro",
                                        "Unlimited History",
                                        "Admin Tools",
                                        "SSO & Security",
                                        "Dedicated Account Manager",
                                        "SLA Support"
                                    ]}
                                    buttonText="Contact Sales"
                                    buttonVariant="outline"
                                />
                            </div>

                            {/* FAQ / Extra Section */}
                            <div className="mt-24 text-center">
                                <p className="text-muted-foreground">
                                    Have more questions? <a href="#" className="underline hover:text-foreground transition-colors">Contact our support team</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

function PricingCard({
    title,
    price,
    description,
    icon: Icon,
    features,
    isPopular,
    buttonText,
    buttonVariant = "outline"
}: {
    title: string;
    price: string;
    description: string;
    icon: any;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
    buttonVariant?: "default" | "outline" | "ghost";
}) {
    return (
        <div className={cn(
            "relative flex flex-col p-8 rounded-3xl border transition-all duration-300",
            isPopular
                ? "bg-gradient-to-b from-zinc-900 to-zinc-950 text-white border-zinc-800 shadow-2xl scale-105 z-10 dark:from-zinc-900 dark:to-black"
                : "bg-white dark:bg-zinc-900/50 border-border hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-xl"
        )}>
            {isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                </div>
            )}

            <div className="mb-8">
                <div className={cn(
                    "size-12 rounded-2xl flex items-center justify-center mb-6",
                    isPopular ? "bg-zinc-800 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                )}>
                    <HugeiconsIcon icon={Icon} className="size-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold">{price}</span>
                    <span className={cn("text-sm", isPopular ? "text-zinc-400" : "text-muted-foreground")}>/month</span>
                </div>
                <p className={cn("text-sm leading-relaxed", isPopular ? "text-zinc-400" : "text-muted-foreground")}>
                    {description}
                </p>
            </div>

            <div className="flex-1 mb-8">
                <ul className="space-y-4">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                            <div className={cn(
                                "size-5 rounded-full flex items-center justify-center shrink-0",
                                isPopular ? "bg-green-500/20 text-green-400" : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                            )}>
                                <HugeiconsIcon icon={Tick02Icon} className="size-3" />
                            </div>
                            <span className={isPopular ? "text-zinc-300" : "text-zinc-700 dark:text-zinc-300"}>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <Button
                variant={isPopular && buttonVariant === "default" ? "secondary" : buttonVariant}
                className={cn(
                    "w-full rounded-xl py-6 font-semibold transition-all",
                    isPopular
                        ? "bg-white text-black hover:bg-zinc-200"
                        : buttonVariant === "default" ? "bg-zinc-900 text-white hover:bg-zinc-800" : ""
                )}
            >
                {buttonText}
                <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-4" />
            </Button>
        </div>
    );
}
