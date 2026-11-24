const viewLabels = {
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
}

export const CalendarToolbar = ({ label, onNavigate, onView, view, views }) => (
  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center justify-between gap-2 sm:justify-start">
      <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        <button
          aria-label="Periodo anterior"
          className="calendar-toolbar-arrow"
          onClick={() => onNavigate('PREV')}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
            <path d="m12 4-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          aria-label="Periodo siguiente"
          className="calendar-toolbar-arrow"
          onClick={() => onNavigate('NEXT')}
          type="button"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
            <path d="m8 4 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className="calendar-today-button"
          onClick={() => onNavigate('TODAY')}
          type="button"
        >
          Hoy
        </button>
      </div>
      <h2 className="min-w-0 flex-1 truncate text-center text-base font-semibold capitalize text-slate-900 sm:ml-3 sm:flex-none sm:text-left sm:text-lg">
        {label}
      </h2>
    </div>

    <div aria-label="Vista del calendario" className="grid grid-cols-4 rounded-xl border border-slate-200 bg-white p-1 shadow-sm" role="group">
      {views.map((calendarView) => (
        <button
          aria-pressed={view === calendarView}
          className={`calendar-view-button ${view === calendarView ? 'calendar-view-button-active' : ''}`}
          key={calendarView}
          onClick={() => onView(calendarView)}
          type="button"
        >
          {viewLabels[calendarView]}
        </button>
      ))}
    </div>
  </div>
)
