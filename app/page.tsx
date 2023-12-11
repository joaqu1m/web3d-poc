import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h2>tipos de modelagem 3d na web:</h2>
      <ul>
        <li>css3d</li>
        <Link href="/webgl">WebGL</Link>
        <li>ThreeJS</li>
        <li>WebGPU</li>
      </ul>
    </main>
  );
}
