"use client";

import React, { useState, useContext} from "react";
import { cn } from "@/lib/utils";

// icons
import { 
    FlameIcon,
    CpuIcon,
    VectorSquareIcon
} from "lucide-react";

// Context
import { ToolsContext, Tools} from "./context/tools-context";


const Setup = {
    items: [
        {name: 'devices', icon: <CpuIcon className="size-5"/>, tool: Tools.MapView},
        {name: 'geofences', icon: <VectorSquareIcon className="size-5"/>, tool: Tools.GeoFence},
        {name: 'heatmap', icon: <FlameIcon className="size-5"/>, tool: null},

    ]
}
export function SidebarMenu(){
    const tools = useContext(ToolsContext);
    
    const [activeItem, setActiveItem] = useState<number>(0);

    if(!tools) return null;

    return (
        <div className={cn('fixed top-30 left-4 bottom-4 z-50 transition-transform duration-300', {'-translate-x-full left-0': tools?.tool === Tools.GeoFence})}>
            
            <div className="flex flex-col w-fit gap-4 items-center rounded-2xl border border-white/10 bg-background/70 px-2 py-2 backdrop-blur-xl h-full">
                {Setup.items.map((item, index)=>(
                    <React.Fragment key={index}>
                        <div 
                        className={cn('flex flex-col items-center py-2 border border-transparent rounded-xl w-18 gap-2 hover:cursor-pointer', {"bg-blue-500/70": activeItem === index, 'hover:bg-white/10': activeItem !== index})} 
                        onClick={()=>{
                            item?.tool && tools?.setTool(item.tool);
                            setActiveItem(index);
                        }}>
                            {item.icon}
                            <span className="text-xs capitalize">{item.name}</span>
                        </div>
                        {index < Setup.items.length - 1 && (<div className="h-px bg-white/10 w-1/2"/>)}
                    </React.Fragment>
                ))}
            </div>

        </div>
    )
}