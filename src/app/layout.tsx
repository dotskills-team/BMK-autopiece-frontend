// The real root layout (with <html>) is app/[locale]/layout.tsx.
// This pass-through exists so app/not-found.tsx can render for non-localized URLs.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
