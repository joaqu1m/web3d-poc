<script setup lang="ts">
import { ref, onMounted } from "vue";

const reload = () => window.location.reload();

const glcanvas = ref<HTMLCanvasElement | null>(null);

function main() {
    const canvas = glcanvas.value;
    if (canvas === null) {
        alert("div não encontrada");
        return;
    }

    const gl = canvas.getContext("webgl");

    if (gl === null) {
        alert("seu dispositivo não suporta WebGL");
        return;
    }

    const vertices = [0, 1, -1, -1, 1, 0];

    const vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    const vertCode =
        "attribute vec2 coordinates;" +
        "void main(void) {" +
        " gl_Position = vec4(coordinates,0.0, 2.0);" + // 2.0: general scale
        "}";

    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    if (vertShader === null) return;

    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    const fragCode =
        "void main(void) {gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);}";
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (fragShader === null) return;

    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    const shaderProgram = gl.createProgram();
    if (shaderProgram === null) return;

    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    const coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

onMounted(main);
</script>

<template>
    <h2>webgl 2d drawning</h2>
    <canvas ref="glcanvas" width="640" height="480"></canvas>
    <button class="bg-gray-500 text-white p-2 m-2" @click="reload">
        reload
    </button>
</template>
