import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function GradientButton({
  children,
  className,
  ...props
}: GradientButtonProps) {
  return (
    <button
      className={cn(
        "bg-brand-gradient inline-flex items-center justify-center gap-3 rounded-[12px] text-white",
        "font-medium transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 active:scale-[0.99]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
