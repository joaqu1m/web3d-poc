"use client";
import fragmentShader from "@/app/webgl/_shaders/fragmentShader.glsl";
import vertexShader from "@/app/webgl/_shaders/vertexShader.glsl";
import { useEffect, useRef } from "react";

export default function Webgl() {
  const glcanvas = useRef<HTMLCanvasElement>(null);
  const isCanvasLoaded = useRef<boolean>(false);

  const renderCanvas = () => {
    if (isCanvasLoaded.current) return;
    isCanvasLoaded.current = true;

    if (glcanvas === null) return;
    const canvas = glcanvas.current;
    if (canvas === null) return;
    const ctx = canvas.getContext("webgl");

    if (ctx === null) {
      alert("Seu dispositivo não suporta WebGL");
      return;
    }

    const vertices = [0, 0, -1, -1, 1, 0];
    const vertices2 = [0.5, 0, 1, -1, 1, 0];

    const vertex_buffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertex_buffer);
    ctx.bufferData(
      ctx.ARRAY_BUFFER,
      new Float32Array(vertices),
      ctx.STATIC_DRAW
    );
    ctx.bindBuffer(ctx.ARRAY_BUFFER, null);

    const vertex_buffer2 = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertex_buffer2);
    ctx.bufferData(
      ctx.ARRAY_BUFFER,
      new Float32Array(vertices2),
      ctx.STATIC_DRAW
    );
    ctx.bindBuffer(ctx.ARRAY_BUFFER, null);

    const vertShader = ctx.createShader(ctx.VERTEX_SHADER);
    if (vertShader === null) return;

    ctx.shaderSource(vertShader, vertexShader);
    ctx.compileShader(vertShader);

    const fragShader = ctx.createShader(ctx.FRAGMENT_SHADER);
    if (fragShader === null) return;

    ctx.shaderSource(fragShader, fragmentShader);
    ctx.compileShader(fragShader);

    const shaderProgram = ctx.createProgram();
    if (shaderProgram === null) return;

    ctx.attachShader(shaderProgram, vertShader);
    ctx.attachShader(shaderProgram, fragShader);
    ctx.linkProgram(shaderProgram);
    ctx.useProgram(shaderProgram);

    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertex_buffer);
    const coord = ctx.getAttribLocation(shaderProgram, "coordinates");
    ctx.vertexAttribPointer(coord, 2, ctx.FLOAT, false, 0, 0);
    ctx.enableVertexAttribArray(coord);

    ctx.clearColor(0.5, 0.5, 0.5, 0.8);
    ctx.enable(ctx.DEPTH_TEST);
    ctx.clear(ctx.COLOR_BUFFER_BIT);
    ctx.viewport(0, 0, canvas.width, canvas.height);

    ctx.drawArrays(ctx.TRIANGLES, 0, 3);

    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertex_buffer2);
    const coord2 = ctx.getAttribLocation(shaderProgram, "coordinates");
    ctx.vertexAttribPointer(coord2, 2, ctx.FLOAT, false, 0, 0);
    ctx.enableVertexAttribArray(coord2);
    ctx.drawArrays(ctx.TRIANGLES, 0, 3);
  };

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div>
      <canvas
        ref={glcanvas}
        width="1280"
        height="600"
        className="w-[1280px] h-[600px]"
      />
    </div>
  );
}
