"use client"

// types 
import { Geofence } from "@/types/model/geofence";

import React from "react";

export enum GeoFenceEditMode {
    Circle = 'circle',
    Triangle = 'triangle',
    Rect = 'react',
    Poly = 'poly',
    Select = 'select'
}

type GeoFenceEditType = {
    mode: GeoFenceEditMode | null;
    setMode: React.Dispatch<React.SetStateAction<GeoFenceEditMode|null>>,
    
    // States to keep geofence and edit them
    geofences: Geofence[],
    setGeofences: React.Dispatch<React.SetStateAction<Geofence[]>>
}

export const GeoFenceEditContext = React.createContext<GeoFenceEditType|undefined>(undefined);
GeoFenceEditContext.displayName = "GeoFenceEditContext";