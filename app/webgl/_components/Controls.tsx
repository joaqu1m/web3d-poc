import { Dispatch, SetStateAction } from "react";

export default function Controls({
  polygons,
  setPolygons,
}: {
  polygons: Polygon[];
  setPolygons: Dispatch<SetStateAction<Polygon[]>>;
}) {
  const rgbaToHex = (rgbaArray: number[]) => {
    const [r, g, b] = rgbaArray.map((value: number) => Math.round(value * 255));
    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };
  const hexToRgba = (hex: string) => {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r / 255, g / 255, b / 255, 1];
  };

  return polygons.map((polygon, i) => (
    <div className="border-[1px] border-black flex p-[4px] justify-evenly">
      <input type="text" className="angle-input" placeholder="X" />
      <input type="text" className="angle-input" placeholder="Y" />
      <input type="text" className="angle-input" placeholder="Z" />
      <input
        type="color"
        className="angle-input"
        value={rgbaToHex(polygon.color)}
        onChange={(e) => {
          const _polygons = new Array(...polygons);
          const [r, g, b, a] = hexToRgba(e.target.value);

          _polygons[i].color = [r, g, b, a];
          setPolygons(_polygons);
        }}
      />
    </div>
  ));
}
