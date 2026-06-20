"use client"

import { useState, useEffect, useContext} from "react";

// Components
import { MapView } from "@/components/map/map-view";
import { SidebarMenu } from "@/components/sidebar";
import { GeoFenceEditMenu } from "@/components/geofence-edit-menu";
import { GeoFenceLayer } from "@/components/geofance-layer";

// Context
import { ToolsContext, Tools} from "@/components/context/tools-context";
import { GeoFenceEditContext, GeoFenceProvider} from "@/components/context/geofence-edit-context";

export default function Home() {
  const [tool, setTool] = useState<Tools>(Tools.MapView);
  
  const geoFence = useContext(GeoFenceEditContext);

  useEffect(()=>{
    if(tool === Tools.MapView){
      geoFence?.setMode(null);
    }
  },[tool, geoFence?.setMode])

  return (
    <ToolsContext.Provider value={{tool, setTool}}>
      <GeoFenceProvider>
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
      </GeoFenceProvider>
    </ToolsContext.Provider>

  );
}
