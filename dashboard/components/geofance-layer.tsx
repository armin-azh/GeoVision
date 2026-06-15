import { cn } from "@/lib/utils";
import { useContext } from "react";

// Context
import { ToolsContext, Tools } from "./context/tools-context";
import { GeoFenceEditContext, GeoFenceEditMode} from "./context/geofence-edit-context";



export function GeoFenceLayer(){
    const tools = useContext(ToolsContext);
    const geoMode = useContext(GeoFenceEditContext);


    return (
        <div className={cn('fixed top-30 bottom-1/5 right-0 translate-x-full z-50 transition-transform duration-300 w-90', {'translate-x-0 right-4': tools?.tool === Tools.GeoFence})}>
            <div className="flex flex-col w-full gap-4 rounded-2xl border border-white/10 bg-background/70 p-3 backdrop-blur-xl h-full">
                <h1 className="text-left text-sm font-medium">GeoFence Layers</h1>
            </div>
            
        </div>
    )

}