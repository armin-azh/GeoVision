"use client"
import React, { useRef, useState, useMemo } from "react";

// types 
import { Geofence } from "@/types/model/geofence";

import {TerraDraw} from "terra-draw";

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
    setGeofences: React.Dispatch<React.SetStateAction<Geofence[]>>,

    drawRef: React.RefObject<TerraDraw | null>;

    // Geofence Edit Functions
    deleteGeofence: (id: string) => void;
    lockGeofence: (id: string) => void;
    unlockGeofence: (id: string) => void;
    setVisibility: (id: string, visible: boolean) => void;
    setColor: (id: string, color: string) => void;  
}

export const GeoFenceEditContext = React.createContext<GeoFenceEditType|undefined>(undefined);
GeoFenceEditContext.displayName = "GeoFenceEditContext";


export function GeoFenceProvider({children}: {children: React.ReactNode}){
    const [mode, setMode] = useState<GeoFenceEditMode | null>(null);

    const [geofences, setGeofences] = useState<Geofence[]>([]);

    const drawRef = useRef<TerraDraw | null>(null);

    const deleteGeofence = (id: string) => {
        setGeofences((prev) => {
       
            const geofence = prev.find((g) => g.featureId === id);
            
            if (geofence) {
                const exists = drawRef.current?.getSnapshot().some(f => f.id === geofence.featureId);
                if (exists) {
                    drawRef.current?.removeFeatures([geofence.featureId]);
                }
            }

            return prev.filter((g) => g.featureId !== id);
        });
    };

    const lockGeofence = (id: string) => {
        setGeofences((prev) =>
            prev.map((g) =>
                g.id === id
                ? { ...g, locked: true }
                : g
            )
            );
    };

    const unlockGeofence = (id: string) => {
        setGeofences((prev) =>
        prev.map((g) =>
            g.id === id
            ? { ...g, locked: false }
            : g
        )
        );
    };

    const setVisibility = (
        id: string,
        visible: boolean
    ) => {
        setGeofences((prev) => {

            const geofence = prev.find((g) => g.featureId === id);

            if (geofence && drawRef.current?.hasFeature(geofence.featureId)) {
                drawRef.current?.updateFeatureProperties(geofence.featureId, { visible });
            }
            
            
            return prev.map((g) => g.featureId === id ? { ...g, visible } : g);;
        });
    };

    const setColor = (
        id: string,
        color: string
    ) => {
        setGeofences((prev) => {

            const geofence = prev.find((g) => g.featureId === id);

            if (geofence && drawRef.current?.hasFeature(geofence.featureId)) {
                drawRef.current?.updateFeatureProperties(geofence.featureId, { selectedColor: color });
            }
            
            return prev.map((g) => g.featureId === id ? { ...g, color } : g);;
        });
    };

    const value = useMemo(
        () => ({
        mode,
        setMode,

        geofences,
        setGeofences,

        deleteGeofence,
        lockGeofence,
        unlockGeofence,
        setVisibility,
        setColor,

        drawRef,
        }),
        [mode, geofences]
    );

    return (
        <GeoFenceEditContext.Provider value={value}>
            {children}
        </GeoFenceEditContext.Provider>
    )
}