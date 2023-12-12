"use client";
import fragmentShader from "@/app/webgl/_shaders/fragmentShader.glsl";
import vertexShader from "@/app/webgl/_shaders/vertexShader.glsl";
import { useEffect, useRef, useState } from "react";

export default function Webgl() {
  const glcanvas = useRef<HTMLCanvasElement>(null);
  const isCanvasLoaded = useRef<boolean>(false);

  const [canvasSize, setCanvasSize] = useState<[number, number]>([1280, 600]);

  const shadersInit = (ctx: WebGLRenderingContext) => {
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

  const bgInit = (ctx: WebGLRenderingContext, canvas: HTMLCanvasElement) => {
    ctx.clearColor(0.5, 0.5, 0.5, 0.8);
    ctx.enable(ctx.DEPTH_TEST);
    ctx.clear(ctx.COLOR_BUFFER_BIT);
    console.log(canvasSize)
    ctx.viewport(0, 0, canvasSize[0], canvasSize[1]);
  };

  const renderCanvas = () => {
    if (isCanvasLoaded.current) {
      glcanvas.current!.getContext("webgl")!.CONTEXT_LOST_WEBGL;
    }
    const canvas = glcanvas.current;
    if (canvas === null) return;
    const ctx = canvas.getContext("webgl");
    if (ctx === null) {
      alert("Seu dispositivo não suporta WebGL");
      return;
    }
    bgInit(ctx, canvas);
    const shaderProgram = shadersInit(ctx);
    if (shaderProgram === null) return;

    const polygons: Polygon[] = [
      { vertices: [0, 0, -1, -1, 1, 0] },
      { vertices: [0.5, 0, 1, -1, 1, 0] },
    ];

    console.log("ibfewon");

    for (let i = 0; i < polygons.length; i++) {
      ctx.bindBuffer(ctx.ARRAY_BUFFER, ctx.createBuffer());
      ctx.bufferData(
        ctx.ARRAY_BUFFER,
        new Float32Array(polygons[i].vertices),
        ctx.STATIC_DRAW
      );
      const coord = ctx.getAttribLocation(shaderProgram, "coordinates");
      ctx.vertexAttribPointer(coord, 2, ctx.FLOAT, false, 0, 0);
      ctx.enableVertexAttribArray(coord);
      ctx.drawArrays(ctx.TRIANGLES, 0, 3);
    }
  };

  useEffect(() => {
    if (isCanvasLoaded.current) return;
    if (glcanvas.current === null) return;
    isCanvasLoaded.current = true;
    setCanvasSize([
      glcanvas.current.offsetWidth,
      glcanvas.current.offsetHeight,
    ]);

    console.log("asd");
    renderCanvas();
  }, []);

  useEffect(() => {
    console.log(canvasSize)
  }, [canvasSize])

  const regenerate = () => {
    renderCanvas();
  };

  return (
    <div>
      <canvas
        ref={glcanvas}
        width={canvasSize[0]}
        height={canvasSize[1]}
        style={{
          width: canvasSize[0],
          height: canvasSize[1],
        }}
      />
      <button onClick={regenerate}>regerar contexto</button>
    </div>
  );
}
