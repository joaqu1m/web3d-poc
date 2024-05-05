"use client";
import GraphicLoader from "@/app/webgl/_components/GraphicLoader";
import { polygonsMock } from "@/app/webgl/_utils/polygonsMock";
import { ChangeEvent, useState } from "react";

export default function Webgl() {
  const [width, setWidth] = useState("300px");

  return (
    <main className="w-full" style={{ width }}>
      <GraphicLoader
        polygons={polygonsMock}
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
