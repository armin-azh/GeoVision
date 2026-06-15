"use client";

import React from "react";

export enum Tools {
    MapView = 'MapView',
    GeoFence = 'GeoFence'
}

type ToolsContextType = {
    tool: Tools,
    setTool: React.Dispatch<React.SetStateAction<Tools>>;
}

export const ToolsContext = React.createContext<ToolsContextType|undefined>(undefined);
ToolsContext.displayName = "ToolsContext";