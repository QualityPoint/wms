import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MapContainer, TileLayer } from "react-leaflet";

import L, { type LatLngExpression, LayerGroup } from "leaflet";
import React, { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

type Car = { id: string; lat: number; lng: number; heading?: number };

function RealtimeCars({ cars }: { cars: Car[] }) {
  const map = useMap();
  const layerRef = useRef<LayerGroup>(L.layerGroup().addTo(map));
  // Keep a registry of Leaflet markers by id
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    const layer = layerRef.current;
    for (const car of cars) {
      const pos: LatLngExpression = [car.lat, car.lng];

      if (!markersRef.current[car.id]) {
        const icon = L.icon({
          iconUrl: "../public/car.png",
          iconSize: [24, 24],
        });
        const m = L.marker(pos, { icon, pane: "markerPane" }).addTo(layer);
        if (car.heading != null && (m as any).setRotationAngle) {
          (m as any).setRotationAngle(car.heading);
        }
        markersRef.current[car.id] = m;
      } else {
        // update in place
        const m = markersRef.current[car.id];
        m.setLatLng(pos);
        if (car.heading != null && (m as any).setRotationAngle) {
          (m as any).setRotationAngle(car.heading);
        }
      }
    }

    // cleanup markers that disappeared
    const liveIds = new Set(cars.map((c) => c.id));
    for (const id of Object.keys(markersRef.current)) {
      if (!liveIds.has(id)) {
        const m = markersRef.current[id];
        layer.removeLayer(m);
        delete markersRef.current[id];
      }
    }
  }, [cars, map]);

  return null;
}

const initialCars = [
  { id: "car1", lat: 30.0444, lng: 31.2357, heading: 0 },
  { id: "car2", lat: 30.0444, lng: 31.2357, heading: 45 },
];

export default function Page() {
  const [cars, setCars] = React.useState<Car[]>(initialCars);
  const animationRef = useRef<number | null>(null);

  React.useEffect(() => {
    const moveCars = () => {
      setCars((prevCars) =>
        prevCars.map((car) => {
          // Add some random movement
          const latChange = (Math.random() - 0.5) * 0.001;
          const lngChange = (Math.random() - 0.5) * 0.001;
          const heading = Math.random() * 360;

          return {
            ...car,
            lat: car.lat + latChange,
            lng: car.lng + lngChange,
            heading,
          };
        })
      );
      animationRef.current = requestAnimationFrame(moveCars);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(moveCars);

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div id="map" style={{ height: "100%", position: "relative" }}>
          <MapContainer
            center={[30.0444, 31.2357]}
            zoom={12}
            style={{ height: "100%", position: "static" }}
            preferCanvas={true}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <RealtimeCars cars={cars} />
          </MapContainer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
