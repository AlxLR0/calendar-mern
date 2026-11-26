import { CalendarForm } from './CalendarForm'

export const CalendarModal = ({ dialogRef }) => (
  <dialog
    aria-describedby="calendar-modal-description"
    aria-labelledby="calendar-modal-title"
    className="modal modal-middle !inset-auto !left-1/2 !top-1/2 !m-0 !h-auto !max-h-[90svh] !w-11/12 !max-w-xl -translate-x-1/2 -translate-y-1/2 !overflow-y-auto !rounded-3xl !border !border-white/60 !bg-white/40 !p-5 !text-slate-900 !shadow-2xl backdrop-blur-xl backdrop-saturate-150 backdrop:!block backdrop:bg-slate-900/10 sm:!p-8"
    data-theme="light"
    onClose={(event) => {
      event.currentTarget.scrollTop = 0
    }}
    ref={dialogRef}
  >
    <div className="modal-box !w-full !max-w-none !max-h-none !overflow-visible !rounded-none !border-0 !bg-transparent !p-0 !shadow-none">
      <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
          <rect x="3.75" y="5.75" width="16.5" height="14.5" rx="3" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 3.75v4M16 3.75v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="m9.25 14 1.75 1.75L15 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 autoFocus className="text-xl font-semibold tracking-tight text-slate-900 focus:outline-none" id="calendar-modal-title" tabIndex={-1}>
        Nuevo evento
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-500" id="calendar-modal-description">
        Agrega un título, el horario y las notas de tu evento.
      </p>

      <CalendarForm
        closeAction={(
          <form method="dialog">
            <button className="btn w-full rounded-xl border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 sm:w-auto">
              Cerrar
            </button>
          </form>
        )}
      />
    </div>
  </dialog>
)
