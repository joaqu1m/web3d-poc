"use client";
import defaultInit from "@/app/webgl/_utils/defaultInit";
import { CSSProperties, useEffect, useRef, useState } from "react";

export default function GraphicLoader({
  polygons,
  styles = {
    canvasWrapper: {},
    canvas: {},
  },
  classNames = {
    canvasWrapper: "w-full h-full",
    canvas: "",
  },
}: {
  polygons: Polygon[];
  styles?: {
    canvasWrapper?: CSSProperties;
    canvas?: CSSProperties;
  };
  classNames?: {
    canvasWrapper?: string;
    canvas?: string;
  };
}) {
  const canvasWrapperEl = useRef<HTMLDivElement>(null);
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const ctxOpts = useRef<{
    gl: WebGLRenderingContext | null;
    shaderProgram: WebGLProgram | null;
  }>({
    gl: null,
    shaderProgram: null,
  });

  const [canvasSize, setCanvasSize] = useState<[number, number]>([0, 0]);

  const renderCanvas = () => {
    if (ctxOpts.current.gl === null) {
      ctxOpts.current.gl = canvasEl.current?.getContext("webgl") ?? null;
      if (ctxOpts.current.gl === null) return;
    }

    const { gl } = ctxOpts.current;

    const { bgInit, shadersInit } = defaultInit(gl);

    bgInit(canvasSize[0], canvasSize[1]);

    if (ctxOpts.current.shaderProgram === null) {
      ctxOpts.current.shaderProgram = shadersInit();
      if (ctxOpts.current.shaderProgram === null) return;
    }

    const { shaderProgram } = ctxOpts.current;

    gl.useProgram(shaderProgram);

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
    const handleResize = () => {
      if (canvasWrapperEl.current === null) return;
      setCanvasSize([
        canvasWrapperEl.current.offsetWidth,
        canvasWrapperEl.current.offsetHeight,
      ]);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvasWrapperEl.current as Element);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    renderCanvas();
  }, [canvasSize, polygons]);

  return (
    <div
      ref={canvasWrapperEl}
      className={classNames.canvasWrapper}
      style={styles.canvasWrapper}
    >
      <canvas
        ref={canvasEl}
        width={canvasSize[0]}
        height={canvasSize[1]}
        className={classNames.canvas}
        style={{
          width: canvasSize[0],
          height: canvasSize[1],
          ...styles.canvas,
        }}
      />
    </div>
  );
}
