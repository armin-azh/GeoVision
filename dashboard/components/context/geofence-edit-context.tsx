"use client"

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
    setMode: React.Dispatch<React.SetStateAction<GeoFenceEditMode|null>>
}

export const GeoFenceEditContext = React.createContext<GeoFenceEditType|undefined>(undefined);
GeoFenceEditContext.displayName = "GeoFenceEditContext";