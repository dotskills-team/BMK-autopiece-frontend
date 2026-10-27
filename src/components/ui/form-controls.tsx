import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-line bg-white px-3.5 text-sm text-ink placeholder:text-muted transition focus:border-ink focus:outline-none",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-10 w-full appearance-none rounded-md border border-line bg-white pr-10 pl-3.5 text-sm text-ink transition focus:border-ink focus:outline-none disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
    </div>
  ),
);
Select.displayName = "Select";

export function Label({ htmlFor, children, className }: { htmlFor?: string; children: React.ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase", className)}>
      {children}
    </label>
  );
}
