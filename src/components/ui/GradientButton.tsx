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
        "font-medium transition-[filter,transform] hover:brightness-105 active:scale-[0.99]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
