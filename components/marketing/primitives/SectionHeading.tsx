// Eyebrow + title + subtitle pattern, shared across sections.
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-balance text-sm text-muted-foreground sm:text-base ${
            align === "center" ? "mx-auto max-w-xl" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
