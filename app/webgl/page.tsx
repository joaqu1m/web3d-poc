"use client";
import GraphicLoader from "@/app/webgl/_components/GraphicLoader";
import { polygonsMock } from "@/app/webgl/_utils/polygonsMock";
import { ChangeEvent, useState } from "react";

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
      <ul>
        {polygons.map((polygon, i) => (
          <li key={i}>
            <h3>Polygon {i + 1}</h3>
            <ul>
              {polygon.vertices.map((vertex, j) => (
                <li key={j}>
                  <h4>Vertex {j + 1}</h4>
                  <input
                    type="text"
                    value={vertex.position[0]}
                    placeholder="x"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const newPolygons = [...polygons];
                      newPolygons[i].vertices[j].position[0] = parseFloat(
                        event.target.value
                      );
                      setPolygons(newPolygons);
                    }}
                  />
                  <input
                    type="text"
                    value={vertex.position[1]}
                    placeholder="y"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const newPolygons = [...polygons];
                      newPolygons[i].vertices[j].position[1] = parseFloat(
                        event.target.value
                      );
                      setPolygons(newPolygons);
                    }}
                  />
                  <input
                    type="text"
                    value={vertex.position[2]}
                    placeholder="z"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const newPolygons = [...polygons];
                      newPolygons[i].vertices[j].position[2] = parseFloat(
                        event.target.value
                      );
                      setPolygons(newPolygons);
                    }}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
