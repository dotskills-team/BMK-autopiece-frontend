import { cn } from "@/lib/utils";

type Tone = "neutral" | "brand" | "success" | "warning" | "dark";

const tones: Record<Tone, string> = {
  neutral: "bg-surface text-ink",
  brand: "bg-brand-50 text-brand",
  success: "bg-green-50 text-success",
  warning: "bg-amber-50 text-warning",
  dark: "bg-ink/80 text-white backdrop-blur",
};

export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}
