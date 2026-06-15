"use client";

import React, { useEffect, useRef, useContext} from "react";
import { cn } from "@/lib/utils";

import { MapOptions } from "maplibre-gl";
import maplibregl from "maplibre-gl";

import { TerraDraw } from "terra-draw";
import { TerraDrawMapLibreGLAdapter } from "terra-draw-maplibre-gl-adapter";

import {
  TerraDrawPolygonMode,
  TerraDrawRectangleMode,
  TerraDrawCircleMode,
  TerraDrawSelectMode,
} from "terra-draw";


// Context
import { ToolsContext, Tools } from "../context/tools-context";
import { GeoFenceEditContext, GeoFenceEditMode } from "../context/geofence-edit-context";

// Components
import { Button } from "../ui/button";

// Icons
import { PlusIcon, MinusIcon } from "lucide-react";
import { circle, polygon } from "@turf/turf";

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const miniMapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const miniMapRef = useRef<maplibregl.Map | null>(null);
  const drawRef = useRef<TerraDraw | null>(null);
  
  const geoMode = useContext(GeoFenceEditContext);
  const tools = useContext(ToolsContext);


  useEffect(()=>{
    if(!drawRef) return

    if(geoMode?.mode === GeoFenceEditMode.Circle){
      drawRef?.current?.setMode('circle');
    }else if(geoMode?.mode === GeoFenceEditMode.Select){
      drawRef?.current?.setMode('select');
    }else if(geoMode?.mode === GeoFenceEditMode.Poly){
      drawRef?.current?.setMode('polygon');
    }else if(geoMode?.mode === GeoFenceEditMode.Rect){
      drawRef?.current?.setMode('rectangle');
    }else if(geoMode?.mode === null){
      drawRef?.current?.setMode('static');
    }
  },[drawRef, geoMode?.mode]);

  useEffect(()=>{
    if(!drawRef) return

    if(tools?.tool === Tools.MapView){
      drawRef?.current?.setMode('static');
      return
    }
  },[tools?.tool, drawRef])

  useEffect(() => {
    if (!mapContainer.current) return;

    const initializeMap = async () => {

      // call this to load right to left plugin due to maplib documentation
      await maplibregl.setRTLTextPlugin(
        "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
        true
      );

      const mainMapConfig: MapOptions = {
        container: mapContainer.current!,
        style: "/styles/dark-gis.json",
        center: [51.389, 35.6892],
        zoom: 11,
        pitch: 0,
        bearing: 0,
      };

      const miniMapConfig: MapOptions = {
        container: miniMapContainer.current!,
        style: "/styles/dark-gis-no-text.json",
        center: [51.389, 35.6892],
        zoom: 7,
        pitch: 0,
        bearing: 0,
        interactive: false,
      };


      // Initialize mini map
      const miniMap = new maplibregl.Map(miniMapConfig);

      // Initialize the main map
      const map = new maplibregl.Map(mainMapConfig);

      mapRef.current = map;
      miniMapRef.current = miniMap;

      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();
      map.setMaxPitch(0);

      map.on("load", ()=>{
        const draw = new TerraDraw({
          adapter: new TerraDrawMapLibreGLAdapter({
            map,
          }),

          modes: [
            new TerraDrawSelectMode({
              flags: {
                polygon: {
                  feature: {
                    draggable: true,
                    rotateable: true,
                    scaleable: true,

                    coordinates: {
                      midpoints: true,
                      draggable: true,
                      deletable: true,
                      resizable: "center",
                    },
                  }
                },
                
                rectangle: {
                  feature: {
                    draggable: true,
                    rotateable: true,
                    scaleable: true,

                    coordinates: {
                      midpoints: true,
                      draggable: true,
                      deletable: true,
                      resizable: "center",
                    },
                  }
                },

                circle: {
                  feature: {
                    draggable: true,
                    scaleable: true,
                  },
                }
                
              }
            }),

            new TerraDrawPolygonMode({
              styles: {
                fillColor: "#3b82f6",
                fillOpacity: 0.15,

                outlineColor: "#3b82f6",
                outlineWidth: 1,
              },
            }),

            new TerraDrawRectangleMode({
              styles: {
                fillColor: "#3b82f6",
                fillOpacity: 0.15,

                outlineColor: "#3b82f6",
                outlineWidth: 1,
              },
            }),

            new TerraDrawCircleMode({
              styles: {
                fillColor: "#3b82f6",
                fillOpacity: 0.15,

                outlineColor: "#3b82f6",
                outlineWidth: 1,
              },
            }),
          ],
        });

        draw.start();
        drawRef.current = draw;
      });

      miniMap.dragPan.disable();
      miniMap.scrollZoom.disable();
      miniMap.boxZoom.disable();
      miniMap.doubleClickZoom.disable();
      miniMap.keyboard.disable();

      miniMap.on("load", () => {
        const layers = miniMap.getStyle().layers;

        layers?.forEach((layer) => {
          if (layer.type === "symbol") {
            miniMap.setLayoutProperty(
              layer.id,
              "visibility",
              "none"
            );
          }
        });
        miniMap.addSource("viewport", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[]],
            },
            properties: {},
          },
        });

        miniMap.addLayer({
          id: "viewport-outline",
          type: "line",
          source: "viewport",
          paint: {
            "line-color": "#94a3b8",
            "line-width": 1,
          },
        });

        const updateMiniMap = () => {
          const center = map.getCenter();

          miniMap.jumpTo({
            center,
            zoom: Math.max(map.getZoom() - 4, 1),
          });

          const bounds = map.getBounds();

          const viewport = {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[
                [bounds.getWest(), bounds.getSouth()],
                [bounds.getEast(), bounds.getSouth()],
                [bounds.getEast(), bounds.getNorth()],
                [bounds.getWest(), bounds.getNorth()],
                [bounds.getWest(), bounds.getSouth()],
              ]],
            },
            properties: {},
          };

          (
            miniMap.getSource("viewport") as maplibregl.GeoJSONSource
          )?.setData(viewport as GeoJSON.GeoJSON);
        };

        updateMiniMap();

        map.on("move", updateMiniMap);
        map.on("zoom", updateMiniMap);
      });
    };


    initializeMap();

    return () => {
      mapRef?.current?.remove();
      miniMapRef.current?.remove();
    };
  }, []);

  return (
    <React.Fragment>
      <div
        ref={mapContainer}
        className="absolute inset-0"
      />

      <div className={cn('fixed flex gap-2 bottom-4 right-4 z-50 transition-transform duration-300 ', {'translate-x-full right-0': tools?.tool === Tools.GeoFence})}>
        {/* --- Control Buttons --- */}
        <div className="flex flex-col justify-end">
          <div className="flex flex-col gap-2 border border-white/10 bg-background/70 rounded-xl items-center h-fit">
            <Button
              size="icon"
              variant="secondary"
              className="h-12 w-12 rounded-2xl bg-slate-900/80 backdrop-blur-xl"
              onClick={() => mapRef?.current?.zoomIn()}
            >
              <PlusIcon className="size-5" />
            </Button>
            <div className="h-px bg-white/10 w-1/2"/>
            <Button
              size="icon"
              variant="secondary"
              className="h-12 w-12 rounded-2xl bg-slate-900/80 backdrop-blur-xl"
              onClick={() => mapRef?.current?.zoomOut()}
            >
              <MinusIcon className="size-5" />
            </Button>
          </div>
        </div>

         {/* --- Mini Map Container --- */}
        <div
          ref={miniMapContainer}
          className="
            h-56
            w-56
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-background/70
            backdrop-blur-xl
          "
        />
      </div>
    </React.Fragment>
  );
}