export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header>
      <h1>{title}</h1>
      {subtitle ? <p className="eyebrow">{subtitle}</p> : null}
    </header>
  );
}
