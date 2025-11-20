import { Header } from './Header.jsx'
import { Footer } from './Footer.jsx'

export function Layout({ children }) {
  return (
    <div className="flex min-h-[calc(100vh+20rem)] flex-col overflow-x-hidden bg-canvas text-ink">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-8 md:px-10 lg:px-12">
        {children}
      </div>
      <Footer />
    </div>
  )
}
