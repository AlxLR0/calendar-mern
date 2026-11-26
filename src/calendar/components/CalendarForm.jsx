import { useState } from 'react'
import { CalendarDatePicker } from './CalendarDatePicker'

export const CalendarForm = ({ closeAction }) => {
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [notes, setNotes] = useState('')
  const [validationMessage, setValidationMessage] = useState('')

  const sameDate = Boolean(startDate && endDate && startDate === endDate)
  const invalidDateRange = Boolean(startDate && endDate && startDate > endDate)
  const invalidTimeRange = Boolean(
    sameDate && startTime && endTime && startTime >= endTime,
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!event.currentTarget.reportValidity()) {
      return
    }

    if (!startDate || !endDate) {
      setValidationMessage('Selecciona las fechas de inicio y fin.')
      return
    }

    if (invalidDateRange) {
      setValidationMessage('La fecha de fin debe ser igual o posterior a la fecha de inicio.')
      return
    }

    if (invalidTimeRange) {
      setValidationMessage('La hora de fin debe ser posterior a la hora de inicio.')
      return
    }

    setValidationMessage('Las fechas y horas son válidas. El evento aún no se ha guardado.')
  }

  const handleDateChange = (setter) => (value) => {
    setter(value)
    setValidationMessage('')
  }

  const handleTimeChange = (setter) => (event) => {
    setter(event.target.value)
    setValidationMessage('')
  }

  return (
    <>
      <form className="mt-6 space-y-5" id="calendar-event-form" noValidate onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="calendar-event-title">
            Título del evento
          </label>
          <input
            autoComplete="off"
            className="input input-bordered w-full rounded-xl border-slate-200 bg-white text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:outline-indigo-500"
            id="calendar-event-title"
            maxLength={100}
            onChange={(event) => {
              setTitle(event.target.value)
              setValidationMessage('')
            }}
            placeholder="Ej. Reunión de equipo"
            required
            value={title}
          />
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-700">Fecha y hora de inicio</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_9rem]">
            <div>
              <CalendarDatePicker
                id="calendar-start-date"
                label="Fecha"
                max={endDate}
                onChange={handleDateChange(setStartDate)}
                value={startDate}
              />
            </div>
            <label>
              <span className="mb-1 block text-xs text-slate-500">Hora</span>
              <input
                aria-label="Hora de inicio"
                className="input input-bordered w-full rounded-xl border-slate-200 bg-white text-sm text-slate-900 focus:border-indigo-500 focus:outline-indigo-500"
                max={sameDate && endTime ? endTime : undefined}
                onChange={handleTimeChange(setStartTime)}
                required
                type="time"
                value={startTime}
              />
            </label>
          </div>
          {invalidDateRange && (
            <p className="mt-2 text-xs text-rose-600" role="alert">
              La fecha de inicio no puede ser posterior a la fecha de fin.
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-700">Fecha y hora de fin</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_9rem]">
            <div>
              <CalendarDatePicker
                id="calendar-end-date"
                label="Fecha"
                min={startDate}
                onChange={handleDateChange(setEndDate)}
                value={endDate}
              />
            </div>
            <label>
              <span className="mb-1 block text-xs text-slate-500">Hora</span>
              <input
                aria-label="Hora de fin"
                className="input input-bordered w-full rounded-xl border-slate-200 bg-white text-sm text-slate-900 focus:border-indigo-500 focus:outline-indigo-500"
                min={sameDate && startTime ? startTime : undefined}
                onChange={handleTimeChange(setEndTime)}
                required
                type="time"
                value={endTime}
              />
            </label>
          </div>
          {invalidTimeRange && (
            <p className="mt-2 text-xs text-rose-600" role="alert">
              Si ambas fechas son el mismo día, la hora de fin debe ser posterior a la hora de inicio.
            </p>
          )}
        </fieldset>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="calendar-event-notes">
            Notas
          </label>
          <textarea
            className="textarea textarea-bordered min-h-24 w-full resize-none rounded-xl border-slate-200 bg-white text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:outline-indigo-500"
            id="calendar-event-notes"
            maxLength={1000}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Agrega detalles para recordar..."
            value={notes}
          />
        </div>

        {validationMessage && (
          <p
            aria-live="polite"
            className={`rounded-xl px-3.5 py-3 text-sm ${invalidDateRange || invalidTimeRange || !startDate || !endDate ? 'bg-rose-50 text-rose-700' : 'bg-indigo-50 text-indigo-700'}`}
            role="status"
          >
            {validationMessage}
          </p>
        )}
      </form>

      <div className="mt-4 flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
        {closeAction}
        <button className="btn w-full rounded-xl border-0 bg-indigo-600 px-5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700 sm:w-auto" form="calendar-event-form" type="submit">
          Guardar
        </button>
      </div>
    </>
  )
}