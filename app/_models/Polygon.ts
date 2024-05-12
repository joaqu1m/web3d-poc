import Vertex from "@/app/_models/Vertex";

export default class Polygon {
  private _vertices: [Vertex, Vertex, Vertex];
  private _color: [number, number, number, number];

  constructor(
    vertices: [Vertex, Vertex, Vertex],
    // by default, color is at rgba format
    color?: [number, number, number, number]
  ) {
    this._vertices = vertices;
    this._color = color || [255, 255, 255, 1];
  }

  get vertices() {
    return this._vertices;
  }

  get spreadedVertices() {
    return this._vertices.flatMap((v) => [v.x, v.y, v.z]);
  }

  get rgba() {
    return this._color;
  }

  get normalizedRgba() {
    const tempColor = structuredClone(this._color);
    for (let i = 0; i < 3; i++) {
      tempColor[i] /= 255;
    }
    return tempColor;
  }

  set rgba(color: [number, number, number, number]) {
    this._color = color;
  }

  set normalizedRgba(color: [number, number, number, number]) {
    for (let i = 0; i < 3; i++) {
      color[i] *= 255;
    }
    this._color = color;
  }

  set vertices(vertices: [Vertex, Vertex, Vertex]) {
    this._vertices = vertices;
  }
}
