import type { Locale } from "@/i18n/routing";
import { siteConfig } from "./site";

// Content of informational & legal pages, per locale.
// IMPORTANT: legal texts (CGV, mentions légales, confidentialité, cookies) must be
// written or validated by the client's legal advisor before launch.
// To add a page: add its slug to `infoPageSlugs` and its content in every locale below.

export interface InfoSection {
  /** Optional anchor, e.g. "retours" -> /livraison#retours */
  id?: string;
  heading: string;
  body: string[];
}

export interface InfoPage {
  title: string;
  description: string;
  sections: InfoSection[];
  legal?: boolean;
}

export const infoPageSlugs = ["a-propos", "contact", "faq", "livraison", "cgv", "mentions-legales", "confidentialite", "cookies"] as const;
export type InfoPageSlug = (typeof infoPageSlugs)[number];

const { name, contact, delivery, returns } = siteConfig;

const pendingFr = "Contenu à fournir par le client (rédigé ou validé par son conseiller juridique).";
const pendingEn = "Content to be provided by the client (written or approved by their legal advisor).";

const fr: Record<InfoPageSlug, InfoPage> = {
  "a-propos": {
    title: "À propos",
    description: `${name}, votre spécialiste des pièces de carrosserie et d'éclairage auto.`,
    sections: [
      {
        heading: "Notre mission",
        body: [
          `${name} propose des pièces de carrosserie, d'éclairage et de mécanique de qualité, à prix compétitifs, pour tous les véhicules.`,
          "Notre moteur de recherche par véhicule et par référence OEM vous aide à trouver la bonne pièce, du premier coup.",
        ],
      },
    ],
  },
  contact: {
    title: "Nous contacter",
    description: "Une question sur une pièce ou une commande ? Notre équipe vous répond.",
    sections: [
      { heading: "Service client", body: [`Téléphone : ${contact.phone}`, `E-mail : ${contact.email}`, "Du lundi au vendredi, 9h – 18h"] },
      { heading: "Avant de nous écrire", body: ["Merci d'indiquer votre numéro de commande et, si possible, la référence OEM de votre pièce d'origine."] },
    ],
  },
  faq: {
    title: "Questions fréquentes",
    description: "Les réponses aux questions les plus fréquentes sur nos pièces, la livraison et les retours.",
    sections: [
      { heading: "Comment être sûr que la pièce est compatible ?", body: ["Utilisez la recherche par véhicule ou comparez le numéro OEM de votre pièce d'origine avec ceux indiqués sur la fiche produit."] },
      { heading: "Les photos correspondent-elles exactement à la pièce ?", body: ["Certaines fiches affichent une image d'illustration. Les caractéristiques et numéros OEM indiqués font foi."] },
      { heading: "Puis-je retourner une pièce ?", body: [`Oui, vous disposez de ${returns.days} jours pour exercer votre droit de rétractation.`] },
    ],
  },
  livraison: {
    title: "Livraison & retours",
    description: "Délais, frais de livraison et conditions de retour.",
    sections: [
      { heading: "Livraison", body: [`Expédition directe partout en France. Livraison offerte dès ${delivery.freeShippingThreshold} € d'achat.`, "Les délais exacts et les frais des pièces volumineuses seront précisés ici. (À confirmer avec le fournisseur.)"] },
      { id: "retours", heading: "Retours", body: [`Vous disposez de ${returns.days} jours à compter de la réception pour retourner un article.`, pendingFr] },
    ],
  },
  cgv: { title: "Conditions générales de vente", description: "Conditions générales de vente.", legal: true, sections: [{ heading: "Conditions générales de vente", body: [pendingFr] }] },
  "mentions-legales": {
    title: "Mentions légales",
    description: "Mentions légales du site.",
    legal: true,
    sections: [
      { heading: "Éditeur du site", body: ["Raison sociale, adresse du siège, SIRET, numéro de TVA intracommunautaire, directeur de la publication.", pendingFr] },
      { heading: "Hébergeur", body: ["Nom, adresse et téléphone de l'hébergeur."] },
      { heading: "Médiateur de la consommation", body: ["Nom et coordonnées du médiateur de la consommation."] },
    ],
  },
  confidentialite: { title: "Politique de confidentialité", description: "Protection de vos données personnelles (RGPD).", legal: true, sections: [{ heading: "Données personnelles", body: [pendingFr] }] },
  cookies: { title: "Politique de cookies", description: "Utilisation des cookies sur le site.", legal: true, sections: [{ heading: "Cookies", body: [pendingFr] }] },
};

const en: Record<InfoPageSlug, InfoPage> = {
  "a-propos": {
    title: "About us",
    description: `${name}, your specialist in car body and lighting parts.`,
    sections: [
      {
        heading: "Our mission",
        body: [
          `${name} offers quality body, lighting and mechanical parts at competitive prices, for all vehicles.`,
          "Our search by vehicle and by OEM reference helps you find the right part, first time.",
        ],
      },
    ],
  },
  contact: {
    title: "Contact us",
    description: "A question about a part or an order? Our team is here to help.",
    sections: [
      { heading: "Customer service", body: [`Phone: ${contact.phone}`, `Email: ${contact.email}`, "Monday to Friday, 9am – 6pm"] },
      { heading: "Before writing to us", body: ["Please include your order number and, if possible, the OEM reference of your original part."] },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    description: "Answers to the most common questions about our parts, delivery and returns.",
    sections: [
      { heading: "How can I be sure the part is compatible?", body: ["Use the search by vehicle, or compare the OEM number of your original part with those shown on the product page."] },
      { heading: "Do the photos show the exact part?", body: ["Some product pages show an illustration image. The specifications and OEM numbers shown are authoritative."] },
      { heading: "Can I return a part?", body: [`Yes, you have ${returns.days} days to exercise your right of withdrawal.`] },
    ],
  },
  livraison: {
    title: "Delivery & returns",
    description: "Delivery times, shipping costs and return conditions.",
    sections: [
      { heading: "Delivery", body: [`Direct shipping throughout France. Free delivery on orders over €${delivery.freeShippingThreshold}.`, "Exact delivery times and charges for bulky parts will be detailed here. (To be confirmed with the supplier.)"] },
      { id: "retours", heading: "Returns", body: [`You have ${returns.days} days from receipt to return an item.`, pendingEn] },
    ],
  },
  cgv: { title: "Terms and conditions of sale", description: "Terms and conditions of sale.", legal: true, sections: [{ heading: "Terms and conditions of sale", body: [pendingEn] }] },
  "mentions-legales": {
    title: "Legal notice",
    description: "Legal notice for this website.",
    legal: true,
    sections: [
      { heading: "Website publisher", body: ["Company name, registered office address, SIRET, EU VAT number, publication director.", pendingEn] },
      { heading: "Hosting provider", body: ["Name, address and phone number of the hosting provider."] },
      { heading: "Consumer mediator", body: ["Name and contact details of the consumer mediator."] },
    ],
  },
  confidentialite: { title: "Privacy policy", description: "Protection of your personal data (GDPR).", legal: true, sections: [{ heading: "Personal data", body: [pendingEn] }] },
  cookies: { title: "Cookie policy", description: "How cookies are used on this website.", legal: true, sections: [{ heading: "Cookies", body: [pendingEn] }] },
};

const pages: Record<Locale, Record<InfoPageSlug, InfoPage>> = { fr, en };

export function getInfoPage(slug: string, locale: Locale): InfoPage | undefined {
  return (infoPageSlugs as readonly string[]).includes(slug) ? pages[locale][slug as InfoPageSlug] : undefined;
}
