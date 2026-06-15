"use client"

import { useState, useEffect} from "react";

// Components
import { MapView } from "@/components/map/map-view";
import { SidebarMenu } from "@/components/sidebar";
import { GeoFenceEditMenu } from "@/components/geofence-edit-menu";
import { GeoFenceLayer } from "@/components/geofance-layer";

// Context
import { ToolsContext, Tools} from "@/components/context/tools-context";
import { GeoFenceEditContext, GeoFenceEditMode} from "@/components/context/geofence-edit-context";

export default function Home() {
  const [tool, setTool] = useState<Tools>(Tools.MapView);
  const [mode, setMode] = useState<GeoFenceEditMode|null>(null);

  useEffect(()=>{
    if(tool === Tools.MapView){
      setMode(null);
    }
  },[tool])

  return (
    <ToolsContext.Provider value={{tool, setTool}}>
      <GeoFenceEditContext.Provider value={{mode, setMode}}>
          <main className="relative h-screen overflow-hidden">
            {/* --- Sidebar Menu --- */}
            <SidebarMenu/>
            
            {/* --- Map Background --- */}
            <div className="fixed inset-0">
              <MapView />
            </div>

            {/* --- GeoFence Edit Menue --- */}
            <GeoFenceEditMenu/>

            {/* --- GeoFence Layers --- */}
            <GeoFenceLayer/>

          </main>
      </GeoFenceEditContext.Provider>
    </ToolsContext.Provider>

  );
}
