declare module "*.glsl" {
  const content: string;
  export default content;
}

type Vertex = {
  // x, y, z
  position: [number, number, number];
};

class Polygon {
  vertices: [Vertex, Vertex, Vertex];
  color: [number, number, number, number];
};
