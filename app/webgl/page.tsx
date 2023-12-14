"use client";
import { bgInit, shadersInit } from "@/app/webgl/_utils/defaultInit";
import { polygonsMock2d } from "@/app/webgl/_utils/polygonsMock";
import { useEffect, useRef, useState } from "react";

export default function Webgl() {
  const canvasWrapper = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const isCanvasLoaded = useRef<boolean>(false);

  const [canvasSize, setCanvasSize] = useState<[number, number]>([0, 0]);

  const renderCanvas = () => {
    if (canvas.current === null) return;
    const gl = canvas.current.getContext("webgl");
    if (gl === null) {
      alert("Seu dispositivo não suporta WebGL");
      return;
    }

    bgInit(gl, canvasSize[0], canvasSize[1]);
    const shaderProgram = shadersInit(gl);
    if (shaderProgram === null) return;

    for (let i = 0; i < polygonsMock2d.length; i++) {
      const currPolygon = polygonsMock2d[i];
      const spreadedVertices = currPolygon.vertices.flatMap((v) => v.position);
      const spreadedColors = Array(currPolygon.vertices.length)
        .fill(currPolygon.color)
        .flat();

      const colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(spreadedColors),
        gl.STATIC_DRAW
      );

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(spreadedVertices),
        gl.STATIC_DRAW
      );

      const color = gl.getAttribLocation(shaderProgram, "color");
      gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(color);

      const coordinates = gl.getAttribLocation(shaderProgram, "coordinates");
      gl.vertexAttribPointer(coordinates, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(coordinates);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(color);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
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
  }, []);

  useEffect(() => {
    renderCanvas();
  }, [canvasSize]);

  return (
    <div>
      <div ref={canvasWrapper} className="h-screen w-full">
        <canvas
          ref={canvas}
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
