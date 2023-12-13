declare module "*.glsl" {
  const content: string;
  export default content;
}

type Vertex2d = {
  position: [number, number];
};

type Polygon2d = {
  vertices: [Vertex2d, Vertex2d, Vertex2d];
  color: [number, number, number, number];
};
