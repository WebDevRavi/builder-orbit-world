import { useEffect, useRef } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { issues } from "@/lib/data";

declare const L: any;

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const instance = useRef<any>(null);

  useEffect(() => {
    if (
      !mapRef.current ||
      instance.current ||
      typeof (window as any).L === "undefined"
    )
      return;
    const map = L.map(mapRef.current).setView([23.3441, 85.3096], 11);
    instance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    issues.forEach((i) => {
      const color =
        i.status === "CRITICAL"
          ? "#ef4444"
          : i.status === "PENDING"
            ? "#f59e0b"
            : i.status === "RESOLVED"
              ? "#22c55e"
              : "#2563eb";
      const marker = L.circleMarker([i.location.lat, i.location.lng], {
        radius: 8,
        color,
        fillColor: color,
        fillOpacity: 0.8,
      });
      marker.addTo(map);
      const html = `<div style='min-width:220px'>
        <div style='display:flex; gap:8px; align-items:center;'>
          <img src='${i.photoUrl || "/placeholder.svg"}' alt='photo' width='48' height='48' style='border-radius:6px; object-fit:cover'/>
          <div>
            <div style='font-weight:600'>${i.category}</div>
            <div style='font-size:12px; color:#666'>${i.location.address || i.location.ward || ""}</div>
          </div>
        </div>
        <div style='margin-top:8px; font-size:12px;'>${i.description}</div>
        <div style='margin-top:8px; font-size:12px;'>Status: <b>${i.status.replace("_", " ")}</b></div>
      </div>`;
      marker.bindPopup(html);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <AppLayout>
      <div className="h-[70vh] rounded-lg border overflow-hidden">
        <div ref={mapRef} className="h-full w-full" />
      </div>
    </AppLayout>
  );
}
