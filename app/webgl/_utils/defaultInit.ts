import Polygon from "@/app/_models/Polygon";
import fragmentShader from "@/app/webgl/_shaders/fragmentShader.glsl";
import vertexShader from "@/app/webgl/_shaders/vertexShader.glsl";

const bgInit = (gl: WebGLRenderingContext, width: number, height: number) => {
  gl.clearColor(0.5, 0.5, 0.5, 1);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, width, height);
};

const shadersInit = (gl: WebGLRenderingContext) => {
  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  if (vertShader === null) return null;
  gl.shaderSource(vertShader, vertexShader);
  gl.compileShader(vertShader);

  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (fragShader === null) return null;
  gl.shaderSource(fragShader, fragmentShader);
  gl.compileShader(fragShader);

  const shaderProgram = gl.createProgram();
  if (shaderProgram === null) return null;
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);

  return shaderProgram;
};

const initBuffers = (gl: WebGLRenderingContext, polygon: Polygon) => {
  const spreadedColors = Array(polygon.vertices.length)
    .fill(polygon.normalizedRgba)
    .flat();

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(spreadedColors),
    gl.STATIC_DRAW
  );

  const verticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(polygon.spreadedVertices),
    gl.STATIC_DRAW
  );

  return { colorBuffer, verticesBuffer };
};

const init = (gl: WebGLRenderingContext) => {
  return {
    bgInit: bgInit.bind(null, gl),
    shadersInit: shadersInit.bind(null, gl),
    initBuffers: initBuffers.bind(null, gl),
  };
};

export default init;
