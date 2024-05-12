import Polygon from "@/app/_models/Polygon";
import { Dispatch, SetStateAction } from "react";

export default function Controls({
  polygons,
  setPolygons,
}: {
  polygons: Polygon[];
  setPolygons: Dispatch<SetStateAction<Polygon[]>>;
}) {
  const rgbaToHex = (rgbaArray: number[]) => {
    const [r, g, b] = rgbaArray.map((value: number) =>
      Math.round(value * 255)
        .toString(16)
        .padStart(2, "0")
    );
    return `#${r}${g}${b}`;
  };
  const hexToRgba = (hex: string) => {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  return polygons.map((polygon, i) => (
    <div
      className="border-[1px] border-black flex p-[4px] justify-evenly"
      key={i}
    >
      <input type="text" className="angle-input" placeholder="X" />
      <input type="text" className="angle-input" placeholder="Y" />
      <input type="text" className="angle-input" placeholder="Z" />
      {/* Provisory Color Selector */}
      <input
        type="color"
        className="angle-input"
        value={rgbaToHex(polygon.normalizedRgba)}
        onChange={(e) => {
          const _polygons = new Array(...polygons);
          const [r, g, b] = hexToRgba(e.target.value);

          _polygons[i].rgba = [r, g, b, _polygons[i].rgba[3]];
          setPolygons(_polygons);
        }}
      />
    </div>
  ));
}
