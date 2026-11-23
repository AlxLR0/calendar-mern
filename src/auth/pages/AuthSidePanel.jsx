const CalendarMark = () => (
  <span className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <rect x="3.75" y="5.75" width="16.5" height="14.5" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3.75v4M16 3.75v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m9.25 14 1.75 1.75L15 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
)

export const AuthSidePanel = () => {
  return (
    <section className="relative hidden min-h-0 flex-col overflow-hidden bg-[#11152d] p-8 text-white lg:flex xl:p-10">
      <div aria-hidden="true" className="absolute -right-36 -top-32 size-[28rem] rounded-full border border-white/10" />
      <div aria-hidden="true" className="absolute -right-20 -top-16 size-[20rem] rounded-full border border-white/10" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-36 size-[30rem] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative flex items-center gap-3">
        <CalendarMark />
        <span className="text-lg font-semibold tracking-tight">Dayflow</span>
      </div>

      <div className="relative my-auto max-w-lg py-5 xl:py-7">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-indigo-200">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          TU TIEMPO, MEJOR ORGANIZADO
        </p>
        <h1 className="text-2xl font-semibold leading-[1.12] tracking-tight xl:text-3xl">
          Haz espacio para lo que <span className="text-indigo-300">importa.</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
          Reúne tus planes, pendientes y momentos importantes en un solo lugar.
        </p>

        {/* <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.07] p-3 shadow-2xl shadow-black/10 backdrop-blur-sm xl:mt-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Tu semana, en equilibrio</p>
              <p className="mt-1 text-xs text-slate-400">Un vistazo a lo que viene</p>
            </div>
            <span className="rounded-lg bg-indigo-400/15 px-2.5 py-1.5 text-xs font-medium text-indigo-200">Esta semana</span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-2 text-center">
            {[
              ['L', '18'],
              ['M', '19'],
              ['M', '20'],
              ['J', '21'],
              ['V', '22'],
              ['S', '23'],
              ['D', '24'],
            ].map(([day, date], index) => (
              <div
                key={`${day}-${date}`}
                className={`rounded-xl py-1.5 ${index === 2 ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-950/30' : 'text-slate-400'}`}
              >
                <span className="block text-[10px] uppercase">{day}</span>
                <span className={`mt-1 block text-sm font-medium ${index === 2 ? 'text-white' : 'text-slate-200'}`}>{date}</span>
                <span className={`mx-auto mt-2 block size-1 rounded-full ${index === 2 ? 'bg-white' : index === 1 || index === 4 ? 'bg-indigo-300' : 'bg-transparent'}`} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-black/15 px-3.5 py-2">
            <span className="h-9 w-1 rounded-full bg-indigo-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">Un día con intención</p>
              <p className="mt-1 text-[11px] text-slate-400">Organiza tus prioridades</p>
            </div>
            <span className="text-[11px] text-slate-400">09:30</span>
          </div>
        </div> */}
      </div>
    </section>
  )
}