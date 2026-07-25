// Primary (solid mint pill) / secondary (outline) CTA button.
// Renders a styled <Link> directly (rather than wrapping shadcn's Button) since the
// base-ui-backed Button primitive doesn't support Radix-style `asChild` composition.
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: variant === "primary" ? "default" : "outline", size: "lg" }),
        "rounded-full px-6",
        className
      )}
    >
      {children}
    </Link>
  );
}
