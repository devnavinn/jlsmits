/** Dark page banner for articles and text pages; sits behind the fixed navbar. */
export function ContentHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <header className="relative overflow-hidden bg-ink pb-14 pt-36 text-white md:pb-20 md:pt-44">
      <span className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand/40 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        {eyebrow && <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/60">{eyebrow}</p>}
        <h1 className="mt-4 text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl">{title}</h1>
        {intro && <p className="mt-5 text-lg leading-relaxed text-white/75">{intro}</p>}
      </div>
    </header>
  );
}
