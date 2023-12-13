import fragmentShader from "@/app/webgl/_shaders/fragmentShader.glsl";
import vertexShader from "@/app/webgl/_shaders/vertexShader.glsl";

export const bgInit = (
  ctx: WebGLRenderingContext,
  width: number,
  height: number
) => {
  ctx.clearColor(0.5, 0.5, 0.5, 0.8);
  ctx.enable(ctx.DEPTH_TEST);
  ctx.clear(ctx.COLOR_BUFFER_BIT);
  ctx.viewport(0, 0, width, height);
};

export const shadersInit = (ctx: WebGLRenderingContext) => {
  const vertShader = ctx.createShader(ctx.VERTEX_SHADER);
  if (vertShader === null) return null;
  ctx.shaderSource(vertShader, vertexShader);
  ctx.compileShader(vertShader);

  const fragShader = ctx.createShader(ctx.FRAGMENT_SHADER);
  if (fragShader === null) return null;
  ctx.shaderSource(fragShader, fragmentShader);
  ctx.compileShader(fragShader);

  const shaderProgram = ctx.createProgram();
  if (shaderProgram === null) return null;
  ctx.attachShader(shaderProgram, vertShader);
  ctx.attachShader(shaderProgram, fragShader);
  ctx.linkProgram(shaderProgram);
  ctx.useProgram(shaderProgram);

  return shaderProgram;
};
