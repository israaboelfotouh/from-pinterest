import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { StoreProvider } from "@/components/StoreProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCatalog } from "@/services/catalogService";
import { Home } from "@/pages/Home";
import { Shop } from "@/pages/Shop";
import { Product } from "@/pages/Product";
import { Cart } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Faq } from "@/pages/Faq";
import { NotFound } from "@/pages/NotFound";

const products = getCatalog();

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <StoreProvider products={products}>
      <a href="#main" className="skip-link">
        Skip to content / انتقل للمحتوى
      </a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/moods/:mood" element={<Shop />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </StoreProvider>
  );
}
