"use client";

import NextError from "next/error";

// Fallback 404 for requests outside the [locale] segment (localized 404: app/[locale]/not-found.tsx).
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
