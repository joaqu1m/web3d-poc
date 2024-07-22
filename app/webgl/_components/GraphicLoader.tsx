import Polygon from "@/app/_models/Polygon";
import defaultInit from "@/app/webgl/_utils/defaultInit";
import { CSSProperties, useEffect, useRef, useState } from "react";

export default function GraphicLoader({
  polygons,
  styles = {
    canvasWrapper: {},
    canvas: {},
  },
  classNames = {
    canvasWrapper: "",
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
      const gl = canvasEl.current?.getContext("webgl") ?? null;
      if (gl === null) return;
      ctxOpts.current.gl = gl;
    }

    const { gl } = ctxOpts.current;

    gl.enable(gl.DEPTH_TEST);
    gl.clearDepth(1.0);
    // gl.depthFunc(gl.LEQUAL); // Use LEQUAL para teste de profundidade padrão

    const { bgInit, shadersInit, initBuffers } = defaultInit(gl);

    bgInit(...canvasSize);

    if (ctxOpts.current.shaderProgram === null) {
      const shaderProgram = shadersInit();
      if (shaderProgram === null) return;
      ctxOpts.current.shaderProgram = shaderProgram;
    }

    const { shaderProgram } = ctxOpts.current;

    gl.useProgram(shaderProgram);

    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i];

      const { colorBuffer } = initBuffers(polygon);

      const color = gl.getAttribLocation(shaderProgram, "color");
      gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(color);

      const coordinates = gl.getAttribLocation(shaderProgram, "coordinates");
      gl.vertexAttribPointer(coordinates, 3, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(coordinates);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(color);

      gl.clear(gl.DEPTH_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, polygon.vertices.length);
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (canvasWrapperEl.current === null) return;
      setCanvasSize([
        canvasWrapperEl.current.offsetWidth,
        canvasWrapperEl.current.offsetHeight,
      ]);
    });
    resizeObserver.observe(canvasWrapperEl.current as Element);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(renderCanvas);
  }, [canvasSize, polygons]);

  return (
    <div
      ref={canvasWrapperEl}
      className={"w-full h-full " + classNames.canvasWrapper}
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
