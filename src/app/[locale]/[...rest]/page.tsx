import { notFound } from "next/navigation";

// Sends unknown localized URLs to app/[locale]/not-found.tsx
export default function CatchAll() {
  notFound();
}
