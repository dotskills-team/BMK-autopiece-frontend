import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { CartDrawer } from "@/features/cart/cart-drawer";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="contenu" className="min-h-[60vh]">{children}</main>
      <Footer />
      <CartDrawer />
      <CookieBanner />
    </>
  );
}
