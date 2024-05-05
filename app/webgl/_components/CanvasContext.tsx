"use client";
import defaultInit from "@/app/webgl/_utils/defaultInit";
import { CSSProperties, useEffect, useRef, useState } from "react";

export default function CanvasContext({
  polygons,
  styles = {
    canvasWrapper: {},
    canvas: {},
  },
  classes = {
    canvasWrapper: "w-full h-full",
    canvas: "",
  },
}: {
  polygons: Polygon3d[];
  styles?: {
    canvasWrapper?: CSSProperties;
    canvas?: CSSProperties;
  };
  classes?: {
    canvasWrapper?: string;
    canvas?: string;
  };
}) {
  const canvasWrapper = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const isCanvasLoaded = useRef<boolean>(false);

  const { bgInit, shadersInit } = defaultInit("3d");

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

    for (let i = 0; i < polygons.length; i++) {
      const currPolygon = polygons[i];
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
      gl.vertexAttribPointer(coordinates, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(coordinates);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(color);

      gl.drawArrays(gl.TRIANGLES, 0, currPolygon.vertices.length);
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
    <div
      ref={canvasWrapper}
      className={classes.canvasWrapper}
      style={styles.canvasWrapper}
    >
      <canvas
        ref={canvas}
        width={canvasSize[0]}
        height={canvasSize[1]}
        className={classes.canvas}
        style={{
          ...styles.canvas,
          width: canvasSize[0],
          height: canvasSize[1],
        }}
      />
    </div>
  );
}
