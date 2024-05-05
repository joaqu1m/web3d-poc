"use client";
import CanvasContext from "@/app/webgl/_components/CanvasContext";
import { polygonsMock3d } from "@/app/webgl/_utils/polygonsMock";

export default function Webgl() {
  return (
    <div className="w-full h-screen">
      <CanvasContext
        polygons={polygonsMock3d}
        styles={{
          canvasWrapper: { alignContent: "center" },
        }}
      />
    </div>
  );
}
