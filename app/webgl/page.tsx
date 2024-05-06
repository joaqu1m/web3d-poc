"use client";
import GraphicLoader from "@/app/webgl/_components/GraphicLoader";
import { polygonsMock } from "@/app/webgl/_utils/polygonsMock";
import { ChangeEvent, useState } from "react";
import Controls from "./_components/Controls";

export default function Webgl() {
  const [width, setWidth] = useState("300px");

  const [polygons, setPolygons] = useState(polygonsMock);

  return (
    <main className="w-full" style={{ width }}>
      <GraphicLoader
        polygons={polygons}
        classNames={{
          canvasWrapper: "w-full h-[300px] border-2 border-black",
        }}
      />
      <input
        type="text"
        value={width}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setWidth(event.target.value);
        }}
      />
      <div className="p-[20px] gap-[20px] flex">
        <div className="bg-gray-500 grow flex flex-col">
          <Controls polygons={polygons} setPolygons={setPolygons} />
        </div>
      </div>
    </main>
  );
}
