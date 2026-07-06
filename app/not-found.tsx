import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm tracking-[0.3em] text-ember">ERROR 404</p>
      <h1 className="mt-4 font-display text-6xl font-bold tracking-tight text-cream sm:text-8xl">
        <span className="text-gradient-warm">lost</span> in the void
      </h1>
      <p className="mt-5 max-w-md font-mono text-sm leading-relaxed text-stone">
        $ cd {"<requested-page>"}
        <br />
        <span className="text-copper">zsh: no such file or directory</span>
      </p>
      <Link
        href="/"
        className="mt-10 rounded-lg bg-ember px-7 py-3.5 text-sm font-semibold text-coal transition-colors hover:bg-amber"
      >
        cd ~/home
      </Link>
    </main>
  );
}
