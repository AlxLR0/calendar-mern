import { useState } from 'react'
import { Link } from 'react-router'
import { AuthSidePanel } from './AuthSidePanel'

const CalendarMark = () => (
  <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <rect x="3.75" y="5.75" width="16.5" height="14.5" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3.75v4M16 3.75v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m9.25 14 1.75 1.75L15 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
)

const EmailIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="m4.5 7 7.5 5.5L19.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LockIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
    <rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('El inicio de sesión todavía no está conectado al servidor.')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-0 text-slate-900 sm:p-6 lg:p-6">
      <div className="grid min-h-screen w-full max-w-6xl overflow-hidden bg-white sm:min-h-0 sm:rounded-[2rem] sm:shadow-[0_30px_90px_-35px_rgba(15,23,42,0.28)] lg:min-h-[calc(100svh-3rem)] lg:grid-cols-2">
        <AuthSidePanel />

        <section className="flex min-h-screen flex-col justify-center px-6 py-8 sm:min-h-0 sm:px-12 lg:px-10 lg:py-7 xl:px-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <CalendarMark />
              <span className="text-lg font-semibold tracking-tight">Dayflow</span>
            </div>

            <div className="mb-7">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Inicia sesión</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Ingresa tus datos para continuar con tu día.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">Correo electrónico</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <EmailIcon />
                  </span>
                  <input
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    id="email"
                    name="email"
                    placeholder="tu@correo.com"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="password" className="text-sm font-medium text-slate-700">Contraseña</label>
                  <button
                    className="text-xs font-medium text-indigo-600 transition hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setMessage('La recuperación de contraseña estará disponible próximamente.')}
                    type="button"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <LockIcon />
                  </span>
                  <input
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400 transition hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-indigo-600"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    {showPassword ? (
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
                        <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5.1 0 8.7 4.2 9.5 6.3a1.8 1.8 0 0 1 0 1.4 11.6 11.6 0 0 1-3.1 4.3M6.2 6.2a12.1 12.1 0 0 0-3.7 5.1 1.8 1.8 0 0 0 0 1.4C3.3 14.8 6.9 19 12 19c.9 0 1.7-.1 2.5-.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
                        <path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.6" />
                        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* <label className="flex w-fit cursor-pointer items-center gap-2.5 py-1 text-sm text-slate-600">
                <input className="size-4 rounded border-slate-300 accent-indigo-600 focus:ring-indigo-500" name="remember" type="checkbox" />
                Mantener sesión iniciada
              </label> */}

              <button
                className="cursor-pointer group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-600/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:translate-y-0"
                type="submit"
              >
                Iniciar sesión
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 transition-transform group-hover:translate-x-0.5">
                  <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {message && <p aria-live="polite" className="rounded-lg bg-indigo-50 px-3.5 py-3 text-sm text-indigo-700" role="status">{message}</p>}
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              ¿Aún no tienes cuenta?{' '}
              <Link
                className="font-semibold text-indigo-600 transition hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                to="/auth/register"
              >
                Regístrate
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              Al continuar, aceptas nuestros <a className="underline decoration-slate-300 underline-offset-2 hover:text-slate-600" href="#terms">Términos de servicio</a> y <a className="underline decoration-slate-300 underline-offset-2 hover:text-slate-600" href="#privacy">Política de privacidad</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
