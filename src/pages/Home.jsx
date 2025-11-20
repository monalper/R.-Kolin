import { motion } from "framer-motion";
import { products } from "../data/allProducts.js";
import { ProductCard } from "../components/ProductCard.jsx";
import { useLocale } from "../contexts/LocaleContext.jsx";

export function Home() {
  const { t, language } = useLocale();

  const anatolianProducts = products.filter(
    (product) => product.collection === "Anatolian Blue",
  );

  const featuredProducts = products.slice(0, 6);

  const featuredLabel =
    language === "tr"
      ? "Kolin'de"
      : language === "de"
        ? "Bei Kolin"
        : language === "fr"
          ? "Chez Kolin"
          : language === "es"
            ? "En Kolin"
            : "At Kolin";

  const featuredTitle =
    language === "tr"
      ? "Öne Çıkanlar"
      : language === "de"
        ? "Besondere Sticke"
        : language === "fr"
          ? "Pieces en avant"
          : language === "es"
            ? "Piezas destacadas"
            : "Featured pieces";

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Ana giri� hero (video) */}
      <section className="-mt-24">
        <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
          <video
            src="/Videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-[75vh] w-full object-cover md:h-[85vh] lg:h-[95vh]"
          />
          <div className="pointer-events-none absolute inset-0 flex items-end">
            <div className="mx-auto flex w-full max-w-6xl justify-center px-6 pb-10 md:px-10 lg:px-12">
              <p className="text-center text-2xl font-bold leading-tight text-ivory mix-blend-difference md:text-[72px] md:leading-[1]">
                <span className="block">{t("home.hero.overlay.main")}</span>
                <span className="mt-4 block text-sm font-normal md:text-base">
                  {t("home.hero.overlay.bottom")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* �ne ��kanlar grid (6 kart) */}
      <motion.section
        id="collection"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="flex items-end justify-center gap-6 text-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
              {featuredLabel}
            </p>
            <h2 className="mt-3 text-xl font-medium md:text-2xl">
              {featuredTitle}
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.section>

      {/* Anatolian Blue hero (g�rsel) */}
      {anatolianProducts.length > 0 && (
        <section>
          <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
            <img
              src="/photos/anatolianblue.jpg"
              alt="Anatolian Blue koleksiyonundan bir g�r�n�m"
              className="h-[70vh] w-full object-cover md:h-[80vh] lg:h-[90vh]"
            />
            <div className="pointer-events-none absolute inset-0 flex items-end">
              <div className="mx-auto flex w-full max-w-6xl justify-center px-6 pb-10 md:px-10 lg:px-12">
                <p className="text-center text-2xl font-bold leading-tight text-ivory mix-blend-difference md:text-[56px] md:leading-[1]">
                  <span className="block font-serif italic font-normal">
                    Anatolian
                  </span>
                  <span className="block">Blue Capsule</span>
                  <span className="mt-4 block text-sm font-normal md:text-base">
                    Kolin'de s�n�rl� say�da.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Anatolian Blue �r�n grid'i */}
      {anatolianProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="flex items-end justify-center gap-6 text-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
                {t("home.collection.label")}
              </p>
              <h2 className="mt-3 text-xl font-medium md:text-2xl">Anatolian Blue</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {anatolianProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Maison notu */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-4 rounded-3xl bg-ivory px-5 py-8 md:px-6 md:py-9"
      >
        <p className="text-[11px] uppercase tracking-[0.35em] text-ink/60">
          {t("home.maisonNote.label")}
        </p>
        <p className="max-w-3xl text-sm leading-relaxed text-ink/80">
          {t("home.maisonNote.body")}
        </p>
      </motion.section>
    </div>
  );
}
