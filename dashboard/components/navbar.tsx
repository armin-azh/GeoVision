"use client";

import { useRef, useEffect, useState } from "react";

// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Icons
import { 
  SearchIcon, 
  BellIcon, 
  MoonIcon ,
  SettingsIcon, 
  UserIcon,
  ChevronDownIcon,
  AlertTriangleIcon,
  PlugIcon,
  UnplugIcon,
} from "lucide-react";


enum StatsKey {
    Online = 'onlines',
    Offline = 'offlines',
    Alert = 'alerts'
}

const Setup = {

    statics: [
        {id: StatsKey.Online, name: 'devices online', icon: <PlugIcon className="size-4"/>, iconBgColor: 'bg-green-50/10', iconTextColor: 'text-green-600'},
        {id: StatsKey.Offline, name: 'devices offline', icon: <UnplugIcon className="size-4"/>, iconBgColor: 'bg-amber-50/10', iconTextColor: 'text-amber-600'},
        {id: StatsKey.Alert, name: 'active alert', icon: <AlertTriangleIcon className="size-4"/>, iconBgColor: 'bg-destructive/10', iconTextColor: 'text-destructive'},
    ]
}

export function Navbar(){
    // In this state we update statistics
    const [statics, setStatics] = useState<Record<StatsKey, number>>({
        [StatsKey.Online]: 1240,
        [StatsKey.Offline]: 12,
        [StatsKey.Alert]: 12
    });

    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!searchRef) return;

        const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key.toLowerCase() === "k") {
            e.preventDefault()
            searchRef.current?.focus()
        }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
        window.removeEventListener("keydown", handleKeyDown)
        }
    }, [searchRef])

    return (
        <header className="fixed top-4 left-4 right-4 z-50">
          <div className="flex h-20 items-center justify-between rounded-2xl border border-white/10 bg-background/70 px-4 backdrop-blur-xl">
            {/* --- Left --- */}
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  GeoVision
                </h1>
                <p className="text-muted-foreground text-xs">
                  Real-time GIS Monitoring
                </p>
              </div>

              <div className="relative hidden md:block">
                <SearchIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />

                <Input
                    ref={searchRef}
                    placeholder="Search locations..."
                    className="w-[320px] pl-9 h-12"
                />
                <Kbd className="absolute right-3 top-1/2 -translate-y-1/2">Ctrl + K</Kbd>
              </div>
            </div>

            {/* --- Center Stats --- */}
            <div className="hidden xl:flex items-center gap-3">
                {
                    Setup.statics.map((item, index)=>(
                        <div className="flex rounded-xl border px-4 py-2 items-center gap-2" key={index}>
                            <div className={`p-2 rounded-full h-fit ${item.iconBgColor} ${item.iconTextColor}`}>{item.icon}</div>
                            <div>
                                <div className="text-xl font-semibold">{statics[item.id]}</div>
                                <div className="text-muted-foreground text-xs capitalize">{item.name}</div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* --- Right --- */}
            <div className="flex items-center gap-2">
                <Button
                size="icon"
                variant="ghost"
                >
                <MoonIcon />
                </Button>

                <Button
                size="icon"
                variant="ghost"
                className="relative"
                >
                <BellIcon />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-14 px-3 flex items-center gap-3">
                            <Avatar>
                                <AvatarImage
                                src="https://github.com/shadcn.png"
                                alt="@shadcn"
                                className="grayscale"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="text-xs">
                                <h1 className="text-primary text-left">John Doe</h1>
                                <h2 className="text-muted-foreground">Administrator</h2>
                            </div>
                            <ChevronDownIcon/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
          
          </div>
        </header>
    )
}