import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ul>
        <li>css3d</li>
        <li>
          <Link href="/webgl/2d">Testes do WebGL em 2d</Link>
        </li>
        <li>
          <Link href="/webgl">WebGL</Link>
        </li>
        <li>ThreeJS</li>
        <li>WebGPU</li>
      </ul>
    </main>
  );
}
