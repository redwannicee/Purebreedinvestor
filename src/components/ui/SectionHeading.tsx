import clsx from "clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "left", dark }: SectionHeadingProps) {
  return (
    <div className={clsx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={clsx("eyebrow mb-3", dark ? "text-gold-light" : "text-sprout")}>{eyebrow}</p>
      )}
      <h2
        className={clsx(
          "font-display text-3xl font-medium leading-tight sm:text-4xl",
          dark ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={clsx("mt-4 text-base leading-relaxed", dark ? "text-paper/70" : "text-ink/70")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
