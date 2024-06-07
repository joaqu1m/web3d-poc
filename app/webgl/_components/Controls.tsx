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
  return (
    <div>
      {polygons.map((polygon, i) => (
        <div
          className="border-[1px] border-black flex p-[4px] justify-evenly"
          key={i}
        >
          {polygon.vertices.map((vertex: Vertex, j: number) => (
            <div key={j}>
              <span>Vertex {j + 1}</span>
              {["x", "y", "z"].map((axis) => (
                <input
                  key={axis}
                  type="number"
                  step="0.1"
                  className="angle-input"
                  placeholder={axis.toUpperCase()}
                  value={vertex[axis as "x" | "y" | "z"]}
                  onChange={(e) => {
                    setPolygons((prev: Polygon[]) => {
                      prev[i].vertices[j][axis as "x" | "y" | "z"] = parseFloat(
                        e.target.value
                      );
                      return [...prev];
                    });
                  }}
                />
              ))}
            </div>
          ))}
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
      ))}
    </div>
  );
}
