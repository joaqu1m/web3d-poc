import Polygon from "@/app/_models/Polygon";
import Vertex from "@/app/_models/Vertex";
import { Dispatch, SetStateAction } from "react";

export default function Controls({
  polygons,
  setPolygons,
}: {
  polygons: Polygon[];
  setPolygons: Dispatch<SetStateAction<Polygon[]>>;
}) {
  return polygons.map((polygon, i) => (
    <div
      className="border-[1px] border-black flex p-[4px] justify-evenly"
      key={i}
    >
      {polygon.vertices.map((vertex: Vertex, j: number) => (
        <div key={j}>
          <span>Vertex {j + 1}</span>
          <input
            type="text"
            className="angle-input"
            placeholder="X"
            value={vertex.x}
            onChange={(e) => {
              setPolygons((prev: Polygon[]) => {
                prev[i].vertices[j].x = parseFloat(e.target.value);
                return [...prev];
              });
            }}
          />
          <input
            type="text"
            className="angle-input"
            placeholder="Y"
            value={vertex.y}
            onChange={(e) => {
              setPolygons((prev: Polygon[]) => {
                prev[i].vertices[j].y = parseFloat(e.target.value);
                return [...prev];
              });
            }}
          />
          <input
            type="text"
            className="angle-input"
            placeholder="Z"
            value={vertex.z}
            onChange={(e) => {
              setPolygons((prev: Polygon[]) => {
                prev[i].vertices[j].z = parseFloat(e.target.value);
                return [...prev];
              });
            }}
          />
        </div>
      ))}
      {/* Provisory Color Selector */}
      <input
        type="color"
        className="angle-input"
        value={polygon.hex}
        onChange={(e) => {
          setPolygons((prev: Polygon[]) => {
            prev[i].hex = e.target.value;
            return [...prev];
          });
        }}
      />
    </div>
  ));
}
