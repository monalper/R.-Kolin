import { SiVisa, SiMastercard, SiAmericanexpress } from 'react-icons/si'
import { useLocale } from '../contexts/LocaleContext.jsx'

const SHIPPING_COUNTRY_BY_LANGUAGE = {
  tr: 'Türkiye',
  us: 'United States',
  uk: 'United Kingdom',
  de: 'Germany',
  fr: 'France',
  es: 'Spain',
}

export function Footer() {
  const { language } = useLocale()
  const country = SHIPPING_COUNTRY_BY_LANGUAGE[language] ?? 'Netherlands'

  return (
    <footer className="mt-24 bg-ink text-ivory">

      {/* === Floating Kutu — DOKUNULMADI === */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 -top-16 md:-top-20">
          <div className="pointer-events-auto rounded-[32px] bg-canvas px-6 py-8 md:px-10 lg:px-12">
            <div
              className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between invisible"
              aria-hidden="true"
            >
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.35em] text-ink/50">
                  Albert R. Kolin
                </p>
                <p className="text-sm font-medium leading-relaxed text-ink md:text-base">
                  Join the maison of quietly luxurious pieces crafted for your own rhythm.
                </p>
              </div>

              <button
                type="button"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-ivory transition-colors hover:bg-accent md:mt-0"
              >
                Discover collection
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* === LUXURY FOOTER === */}
      <div className="px-8 pt-32 pb-20 md:px-14 lg:px-20">
        <div className="border-t border-ivory/10 pt-20">

          {/* Top Section */}
          <div className="grid gap-20 md:grid-cols-2 md:items-start px-2 md:px-4 lg:px-6">

            {/* Brand Block (BURAYA ÖDEME İKONLARI GELDİ) */}
            <div className="space-y-6 pr-4">

              {/* ÖDEME İKONLARI */}
              <div className="flex items-center gap-5 text-lg text-ivory/45">
                <SiVisa className="transition-opacity hover:opacity-80" />
                <SiMastercard className="transition-opacity hover:opacity-80" />
                <SiAmericanexpress className="transition-opacity hover:opacity-80" />
              </div>

              <p className="max-w-sm text-sm leading-relaxed text-ivory/60">
                Crafted pieces inspired by silent elegance.
                A maison shaped by restraint, intention and heritage.
              </p>

              <p className="text-[11px] uppercase tracking-[0.3em] text-ivory/45">
                İstanbul · Paris
              </p>
            </div>

            {/* Navigation */}
            <div className="flex gap-24 text-[11px] uppercase tracking-[0.28em] pl-4">
              <div className="space-y-4">
                <p className="text-ivory/85">Collection</p>
                <p className="text-ivory/55 hover:text-ivory transition-colors">Maison</p>
                <p className="text-ivory/55 hover:text-ivory transition-colors">Client care</p>
              </div>

              <div className="space-y-4">
                <p className="text-ivory/85">Contact</p>
                <p className="text-ivory/55 hover:text-ivory transition-colors">Press</p>
                <p className="text-ivory/55 hover:text-ivory transition-colors">Instagram</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 flex flex-col gap-8 border-t border-ivory/10 pt-10 
                          text-[11px] tracking-[0.25em] text-ivory/55 
                          md:flex-row md:items-center md:justify-between
                          px-2 md:px-4 lg:px-6">

            <div className="flex items-center gap-3">
              <span>Shipping from</span>
              <span className="text-ivory">{country}</span>
            </div>

            {/* BURAYA "Albert R. Kolin" YAZISI GELDİ */}
            <div className="text-[11px] font-bold uppercase text-ivory/80 select-none">
              Albert KOLIN
            </div>

            <div className="text-[10px] tracking-[0.22em] text-ivory/40">
              © 2025 Albert R. Kolin · All rights reserved.
            </div>
          </div>

        </div>
      </div>

    </footer>
  )
}
