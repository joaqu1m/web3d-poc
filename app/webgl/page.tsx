"use client";
import { bgInit, shadersInit } from "@/app/webgl/_utils/defaultInit";
import { useEffect, useRef, useState } from "react";

export default function Webgl() {
  const canvasWrapper = useRef<HTMLDivElement>(null);
  const glcanvas = useRef<HTMLCanvasElement>(null);
  const isCanvasLoaded = useRef<boolean>(false);

  const [canvasSize, setCanvasSize] = useState<[number, number]>([1280, 600]);

  const renderCanvas = () => {
    const canvas = glcanvas.current;
    if (canvas === null) return;
    const ctx = canvas.getContext("webgl");
    if (ctx === null) {
      alert("Seu dispositivo não suporta WebGL");
      return;
    }
    bgInit(ctx, canvasSize[0], canvasSize[1]);
    const shaderProgram = shadersInit(ctx);
    if (shaderProgram === null) return;

    const polygons: Polygon[] = [
      { vertices: [0, 0, -1, -1, 1, 0] },
      { vertices: [0.5, 0, 1, -1, 1, 0] },
    ];

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
    isCanvasLoaded.current = true;

    if (canvasWrapper.current !== null) {
      setCanvasSize([
        canvasWrapper.current.offsetWidth,
        canvasWrapper.current.offsetHeight,
      ]);
    }

    renderCanvas();
  }, []);

  useEffect(() => {
    renderCanvas();
  }, [canvasSize]);

  return (
    <div>
      <div ref={canvasWrapper} className="h-screen w-full">
        <canvas
          ref={glcanvas}
          width={canvasSize[0]}
          height={canvasSize[1]}
          style={{
            width: canvasSize[0],
            height: canvasSize[1],
          }}
        />
      </div>
    </div>
  );
}
