// Central site configuration. Business values (delivery, contact, etc.) live here
// so they can be changed without touching components.
// User-facing wording lives in messages/<locale>.json — only keys are referenced here.

export const siteConfig = {
  name: "BMK AUTOPIECE",
  url: "https://www.mapieceauto.com",
  contact: {
    // TODO: replace with the client's real contact details.
    phone: "04 00 00 00 00",
    email: "contact@mapieceauto.com",
  },
  // TODO: confirm with the supplier's real delivery times before launch.
  delivery: {
    freeShippingThreshold: 150,
  },
  returns: {
    days: 14,
  },
} as const;

export const reassuranceItems = [
  { icon: "shield", title: "reassurance.qualityTitle", text: "reassurance.qualityText" },
  { icon: "truck", title: "site.deliveryLabel", text: "site.deliveryDetail" },
  { icon: "lock", title: "reassurance.paymentTitle", text: "reassurance.paymentText" },
  { icon: "headset", title: "reassurance.serviceTitle", text: "reassurance.serviceText" },
] as const;

/** Header links — labels come from messages "nav.<key>". */
export const mainNav = [
  { key: "pieces-carrosserie", href: "/categories" },
  { key: "eclairage", href: "/categorie/eclairage" },
  { key: "retroviseur", href: "/categorie/retroviseur" },
  { key: "pare-choc", href: "/categorie/pare-choc" },
  { key: "grille-calandre", href: "/categorie/grille-calandre" },
  { key: "capot", href: "/categorie/capot" },
  { key: "aile", href: "/categorie/aile" },
  { key: "vitrage", href: "/categorie/vitrage" },
] as const;

/** Footer links — labels come from messages "footer.links.<key>". */
export const footerLinks = {
  account: [
    { key: "login", href: "/compte/connexion" },
    { key: "orders", href: "/compte" },
    { key: "addresses", href: "/compte" },
    { key: "favorites", href: "/compte/favoris" },
  ],
  information: [
    { key: "delivery", href: "/livraison" },
    { key: "returns", href: "/livraison#retours" },
    { key: "cgv", href: "/cgv" },
    { key: "legal", href: "/mentions-legales" },
  ],
  service: [
    { key: "contact", href: "/contact" },
    { key: "faq", href: "/faq" },
  ],
} as const;
