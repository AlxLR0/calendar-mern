import { useState } from 'react'
import { Link } from 'react-router'

const CalendarIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
    <rect x="3.5" y="5.5" width="17" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
    <path d="M8 3.5v4M16 3.5v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)

const LogoutIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-4.5">
    <path d="M10 5H6.5A2.5 2.5 0 0 0 4 7.5v9A2.5 2.5 0 0 0 6.5 19H10M15 8l4 4-4 4M8.5 12H19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const MenuIcon = ({ open }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
    {open ? (
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    ) : (
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    )}
  </svg>
)

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/70 bg-white/75 px-3 py-2.5 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:px-4" aria-label="Navegacion principal">
        <Link
          className="flex items-center gap-2 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
          to="/"
          aria-label="Ir al calendario"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <CalendarIcon />
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">Dayflow</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link
            className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            to="/"
          >
            Calendario
          </Link>
          <button
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
          >
            Preferencias
          </button>
        </div>

        <div className="hidden md:block">
          <Link
            className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            to="/auth/login"
          >
            <LogoutIcon />
            Cerrar sesion
          </Link>
        </div>

        <button
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
          className="flex size-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <MenuIcon open={menuOpen} />
        </button>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="absolute left-3 right-3 top-[calc(100%+0.5rem)] rounded-2xl border border-white/70 bg-white/90 p-2 shadow-[0_18px_50px_-20px_rgba(15,23,42,0.45)] backdrop-blur-xl md:hidden"
          >
            <Link
              className="block rounded-xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700"
              onClick={() => setMenuOpen(false)}
              to="/"
            >
              Calendario
            </Link>
            <button
              className="mt-1 block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              type="button"
            >
              Preferencias
            </button>
            <div className="my-2 border-t border-slate-200/80" />
            <Link
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              onClick={() => setMenuOpen(false)}
              to="/auth/login"
            >
              <LogoutIcon />
              Cerrar sesion
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
