attribute vec2 coordinates;
attribute vec4 color;
varying vec4 vColor;

void main(void) {
  gl_Position = vec4(coordinates, 0.0, 1.0);
  vColor = color;
}
