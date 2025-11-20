import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HiOutlineShoppingBag, HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'
import { useCart } from '../contexts/CartContext.jsx'
import { useLocale } from '../contexts/LocaleContext.jsx'

export function Header() {
  const { cartCount } = useCart()
  const { language, t } = useLocale()
  const basePath = `/${language}`
  const location = useLocation()

  const [atTop, setAtTop] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGender, setOpenGender] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY <= 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }

    document.body.style.overflow = ''
  }, [menuOpen])

  const headerBase =
    'fixed inset-x-0 top-0 z-40 transition-colors duration-300 ease-out'
  const isHome = location.pathname === basePath
  const heroMode = isHome && atTop

  const headerClasses = heroMode
    ? `${headerBase} bg-transparent`
    : `${headerBase} bg-canvas`

  const primaryTextClass = heroMode ? 'text-ivory' : 'text-ink'
  const iconColorClass = heroMode ? 'text-ivory' : 'text-ink'

  return (
    <>
      <header className={headerClasses}>
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-10 lg:px-12">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`inline-flex h-6 w-6 items-center justify-center ${iconColorClass}`}
              aria-label="Open main menu"
            >
              <RxHamburgerMenu className="h-5 w-5" />
            </button>

            <Link
              to={`${basePath}/search`}
              className={`inline-flex h-6 w-6 items-center justify-center ${primaryTextClass}`}
              aria-label={language === 'tr' ? 'Arama' : 'Search'}
            >
              <HiOutlineMagnifyingGlass className="h-5 w-5" />
            </Link>
          </div>

          <Link
            to={basePath}
            className={`pointer-events-auto absolute left-1/2 flex -translate-x-1/2 items-center text-[21px] font-bold uppercase select-none ${primaryTextClass}`}
          >
            KOLIN
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <Link
              to={`${basePath}/cart`}
              className={`inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em] ${primaryTextClass}`}
            >
              <span className="hidden text-[11px] uppercase md:inline">
                {t('nav.cart')}
              </span>
              <HiOutlineShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="text-[11px] uppercase tracking-[0.3em]">
                  {String(cartCount).padStart(2, '0')}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/70"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative flex h-full">
          <div
            className={`flex h-full w-full max-w-xs flex-col bg-ivory px-6 py-6 text-ink transition-transform duration-300 ease-out md:max-w-sm ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2"
              >
                <RxCross1 className="h-3 w-3" />
                <span className="uppercase tracking-[0.25em]">Close</span>
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-6 text-[21px] leading-tight">
              <button
                type="button"
                className="mt-4 flex items-center justify-between text-left uppercase"
                onClick={() =>
                  setOpenGender((current) => (current === 'men' ? null : 'men'))
                }
              >
                <span>Erkek</span>
                <span className="text-xs tracking-[0.25em]">
                  {openGender === 'men' ? '-' : '+'}
                </span>
              </button>
              {openGender === 'men' && (
                <div className="ml-4 flex flex-col gap-3">
                  <NavLink
                    to={`${basePath}/men/bags`}
                    onClick={() => setMenuOpen(false)}
                    className="text-left uppercase"
                  >
                    Çanta
                  </NavLink>
                  <NavLink
                    to={`${basePath}/men/shoes`}
                    onClick={() => setMenuOpen(false)}
                    className="text-left uppercase"
                  >
                    Ayakkabı
                  </NavLink>
                  <NavLink
                    to={`${basePath}/men/accessories`}
                    onClick={() => setMenuOpen(false)}
                    className="text-left uppercase"
                  >
                    Aksesuar
                  </NavLink>
                </div>
              )}

              <button
                type="button"
                className="mt-4 flex items-center justify-between text-left uppercase"
                onClick={() =>
                  setOpenGender((current) => (current === 'women' ? null : 'women'))
                }
              >
                <span>Kadın</span>
                <span className="text-xs tracking-[0.25em]">
                  {openGender === 'women' ? '-' : '+'}
                </span>
              </button>
              {openGender === 'women' && (
                <div className="ml-4 flex flex-col gap-3">
                  <NavLink
                    to={`${basePath}/women/bags`}
                    onClick={() => setMenuOpen(false)}
                    className="text-left uppercase"
                  >
                    Çanta
                  </NavLink>
                  <NavLink
                    to={`${basePath}/women/shoes`}
                    onClick={() => setMenuOpen(false)}
                    className="text-left uppercase"
                  >
                    Ayakkabı
                  </NavLink>
                  <NavLink
                    to={`${basePath}/women/accessories`}
                    onClick={() => setMenuOpen(false)}
                    className="text-left uppercase"
                  >
                    Aksesuar
                  </NavLink>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
