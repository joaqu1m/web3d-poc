import Vertex from "@/app/_models/Vertex";

export default class Polygon {
  private _vertices: [Vertex, Vertex, Vertex];
  private _color: [number, number, number, number];

  constructor(
    vertices: [Vertex, Vertex, Vertex],
    // by default, color is at rgba format
    color?: [number, number, number, number]
  ) {
    this._vertices = vertices;
    this._color = color || [255, 255, 255, 1];
  }

  get vertices() {
    return this._vertices;
  }

  set vertices(vertices: [Vertex, Vertex, Vertex]) {
    this._vertices = vertices;
  }

  get spreadedVertices() {
    return this._vertices.flatMap((v) => v.coords);
  }

  get rgba() {
    return this._color;
  }

  get normalizedRgba() {
    const tempColor = structuredClone(this._color);
    for (let i = 0; i < 3; i++) {
      tempColor[i] /= 255;
    }
    return tempColor;
  }

  get hex() {
    const [r, g, b] = this._color.map((value: number) =>
      value.toString(16).padStart(2, "0")
    );
    return `#${r}${g}${b}`;
  }

  set rgba(color: [number, number, number, number]) {
    this._color = color;
  }

  set normalizedRgba(color: [number, number, number, number]) {
    for (let i = 0; i < 3; i++) {
      color[i] *= 255;
    }
    this._color = color;
  }

  set hex(hex: string) {
    // Um valor hexadecimal (como FF5733) se transformará em um número muito maior, como 16734003 (em decimal)
    // Vamos realizar os cálculos pensando nele como um valor binário, como 11111111 01010111 00110011
    const bigint = parseInt(hex.substring(1), 16);
    // Ao realizar a operação de shift para a direita com o número 16, estamos pegando os 16 bits mais à esquerda
    // O resultado será 11111111, que é igual a 255
    const r = (bigint >> 16) & 255;
    // Ao realizar a operação de shift para a direita com o número 8, estamos pegando os 8 bits do meio
    // O resultado será 11111111 01010111, que é igual a 87
    const g = (bigint >> 8) & 255;
    // Quando não realizamos essa operação, sobra o número inteiro (11111111 01010111 00110011).
    const b = bigint & 255;

    // Mesmo sobrando um número maior em alguns casos, conseguimos pegar apenas os últimos 8 bits de cada número binário, pois estamos realizando a operação de AND com 255, que em decimal representa 8 bits

    // Ou seja, o valor de R será 255, o valor de G será 87 e o valor de B será 51 (em decimal)

    this._color = [r, g, b, this._color[3]];
  }
}
