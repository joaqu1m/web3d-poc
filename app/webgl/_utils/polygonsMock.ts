import Polygon from "@/app/_models/Polygon";
import Vertex from "@/app/_models/Vertex";

export const polygonsMock: Polygon[] = [
  new Polygon(
    [
      new Vertex(0.4, 0.6, 1),
      new Vertex(-1, -0.5, 0),
      new Vertex(0.5, -0.7, -1),
    ],
    [255, 0, 0, 1]
  ),
  new Polygon(
    [
      new Vertex(-0.5, -0.5, 0),
      new Vertex(-1, -1, 0),
      new Vertex(0.5, -0.5, 0),
    ],
    [0, 255, 0, 1]
  ),
  new Polygon(
    [
      new Vertex(0.5, 0.5, 0),
      new Vertex(0.5, -0.5, 0),
      new Vertex(-0.5, -0.5, 0),
    ],
    [0, 0, 255, 1]
  ),
  new Polygon([
    new Vertex(1, 1, 0),
    new Vertex(1, 0, 0),
    new Vertex(0.5, 0.5, 0),
  ]),
];
