import {useContext, useEffect} from 'react';
import { cn } from '@/lib/utils';

// Component
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Kbd } from './ui/kbd';

// Context
import { ToolsContext, Tools } from './context/tools-context';
import { GeoFenceEditContext, GeoFenceEditMode } from './context/geofence-edit-context';


// Icons
import { 
    CircleIcon,
    TriangleIcon,
    SquareIcon,
    LineSquiggleIcon,
    MousePointer2
} from 'lucide-react';

const Setup = {
    items: [
        {name: 'select', icon: <MousePointer2/>, kbd: '⌘ s', mode: GeoFenceEditMode.Select, keyId: 's'},
        {name: 'circle', icon: <CircleIcon/>, kbd: '⌘ c', mode: GeoFenceEditMode.Circle, keyId: 'c'},
        {name: 'square', icon: <SquareIcon/>, kbd: '⌘ r', mode: GeoFenceEditMode.Rect, keyId: 'r'},
        {name: 'polygon', icon: <LineSquiggleIcon/>, kbd: '⌘ p', mode: GeoFenceEditMode.Poly, keyId: 'p'},
    ]
}

export function GeoFenceEditMenu(){
    const tools = useContext(ToolsContext);
    const geoMode = useContext(GeoFenceEditContext);

    useEffect(()=>{
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!(e.metaKey || e.ctrlKey)) return;

            const item = Setup.items.find(
                (item) => item.keyId.toLowerCase() === e.key.toLowerCase()
            );

            if (!item) return;

            e.preventDefault();
            geoMode?.setMode(prev=>(prev!==null?null:item.mode));
        };

        if(tools?.tool === Tools.GeoFence){
            window.addEventListener("keydown", handleKeyDown);
            return ()=>window.removeEventListener("keydown", handleKeyDown);
        }

    },[tools?.tool])

    return (
        <div className={cn('fixed bottom-0 transition-transform duration-300 translate-y-full right-1/2 z-50 translate-x-1/2', {'bottom-4 translate-y-0': tools?.tool === Tools.GeoFence})}>
            
            <div className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-background/70 px-4 backdrop-blur-xl gap-5">
                {Setup.items.map((item, index)=>(
                    <Tooltip key={index}>
                        <TooltipTrigger asChild>
                            <Button key={index} variant={geoMode?.mode===item.mode ? 'default' : 'ghost'} size={'icon-sm'} onClick={()=>{geoMode?.setMode(prev=>(prev!==null && prev===item.mode?null:item.mode))}}>{item.icon}</Button>
                        </TooltipTrigger>
                        <TooltipContent className='capitalize'>
                            {item.name} <Kbd>{item.kbd}</Kbd>
                        </TooltipContent>
                    </Tooltip>
                ))}

                <div className='w-px h-1/2 bg-white/20'/>
                <Button onClick={()=>tools?.setTool(Tools.MapView)}>Done</Button>
            </div>
        </div>
    )
}