"use client";
import CanvasContext from "@/app/webgl/_components/CanvasContext";
import { polygonsMock3d } from "@/app/webgl/_utils/polygonsMock";
import { ChangeEvent, useState } from "react";

export default function Webgl() {
  const [width, setWidth] = useState("300px");

  return (
    <main className="w-full" style={{ width }}>
      <CanvasContext
        polygons={polygonsMock3d}
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
    </main>
  );
}
