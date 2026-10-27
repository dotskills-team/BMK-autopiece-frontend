import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageBanner } from "@/features/catalog/page-banner";
import { alternatesFor } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { getInfoPage, infoPageSlugs } from "@/lib/constants/info-pages";

type Props = { params: Promise<{ locale: Locale; page: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return infoPageSlugs.map((page) => ({ page }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await params;
  const content = getInfoPage(page, locale);
  if (!content) return {};
  return { title: content.title, description: content.description, alternates: alternatesFor(`/${page}`, locale) };
}

export default async function InfoPageRoute({ params }: Props) {
  const { locale, page } = await params;
  setRequestLocale(locale);
  const content = getInfoPage(page, locale);
  if (!content) notFound();

  return (
    <>
      <PageBanner title={content.title} text={content.description} breadcrumbs={[{ label: content.title }]} />
      <article className="container-page max-w-3xl py-8 sm:py-12">
        {content.sections.map((s) => (
          <section key={s.heading} id={s.id} className="mb-10 scroll-mt-40">
            <h2 className="mb-3 font-display text-xl font-extrabold">{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p} className="mb-3 leading-relaxed text-ink-700">{p}</p>
            ))}
          </section>
        ))}
      </article>
    </>
  );
}
