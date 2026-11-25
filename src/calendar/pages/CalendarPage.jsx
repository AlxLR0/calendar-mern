import { useRef, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
import { addHours, format, getDay, parse, startOfWeek } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarToolbar } from '../components/CalendarToolbar'
import { CalendarEvent } from '../components/CalendarEvent'
import { CalendarModal } from '../components/calendarModal'
import { Navbar } from '../'

const views = ['month', 'week', 'day', 'agenda']

const locales = {
  es,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [
  {
    title: 'Cumpleaños',
    notes: 'Comprar pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#4f46e5',
    user: {
      _id: '123',
      name: 'alx',
    },
  },
]

export const CalendarPage = () => {
  const [calendarView, setCalendarView] = useState('month')
  const calendarModalRef = useRef(null)

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.bgColor,
      border: 'none',
      borderRadius: '6px',
      color: '#fff',
      padding: '2px 6px',
    },
  })


  const onDoubleClick = (event)=>{
    console.log({doubleClick: event});
  }

  const onSelected = (event) =>{
    console.log({click: event});
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/60">
      <Navbar />
      <main className="min-h-[calc(100svh-5rem)] px-3 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-7">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              {/* <p className="text-sm font-medium text-indigo-600">Organiza tu tiempo</p> */}
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-indigo-600 sm:text-3xl">Mi calendario</h1>
              <p className="mt-1 text-sm text-slate-500">Revisa tus eventos y planifica lo que viene.</p>
            </div>
            <button
              className="cursor-pointer group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-600/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:translate-y-0 sm:w-auto"
              onClick={() => calendarModalRef.current?.showModal()}
              type="button"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 transition-transform group-hover:rotate-90">
                <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Nuevo evento
            </button>
            {/* <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-sm sm:flex">
              <span className="size-2 rounded-full bg-emerald-500" />
              Tu agenda está al día
            </div> */}
          </div>

          <section aria-label="Calendario de eventos" className="rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:rounded-3xl sm:p-5 lg:p-6">
            <Calendar
              culture="es"
              components={{ toolbar: CalendarToolbar, event: CalendarEvent }}
              eventPropGetter={eventStyleGetter}
              events={events}
              localizer={localizer}
              onView={setCalendarView}
              startAccessor="start"
              endAccessor="end"
              view={calendarView}
              views={views}
              onDoubleClickEvent={onDoubleClick}
              onSelectEvent={onSelected}
            />
          </section>
        </div>
      </main>
      <CalendarModal dialogRef={calendarModalRef} />
    </div>
  )
}
