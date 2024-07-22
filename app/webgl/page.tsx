"use client";
import { useMouseMove } from "@/app/_hook/useMouseMove";
import { useMouseUp } from "@/app/_hook/useMouseUp";
import Controls from "@/app/webgl/_components/Controls";
import GraphicLoader from "@/app/webgl/_components/GraphicLoader";
import { polygonsMock } from "@/app/webgl/_utils/polygonsMock";
import { useState } from "react";

export default function Webgl() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [measures, setMeasures] = useState([300, 300]);

  const [polygons, setPolygons] = useState(polygonsMock);

  useMouseMove((e) => {
    if (isDragging) {
      setMeasures((prev) => [prev[0] + e.movementX, prev[1] + e.movementY]);
    }
  });
  useMouseUp(() => {
    setIsDragging(false);
  });

  return (
    <main className="w-full">
      <div
        style={{
          width: `${measures[0]}px`,
          height: `${measures[1]}px`,
        }}
        className="p-2 bg-[#1e2d57] cursor-move"
        onMouseDown={(e) => {
          e.target === e.currentTarget && setIsDragging(true);
        }}
      >
        <GraphicLoader
          polygons={polygons}
          classNames={{
            canvasWrapper: "cursor-default",
          }}
        />
      </div>
      <div className="p-[20px] gap-[20px] flex">
        <div className="bg-gray-500 grow flex flex-col">
          <Controls polygons={polygons} setPolygons={setPolygons} />
        </div>
      </div>
    </main>
  );
}
