import { CalendarDatePicker } from './CalendarDatePicker'
import { useCalendarEventForm } from '../../hooks/useCalendarEventForm'

export const CalendarForm = ({ closeAction, onSave }) => {
  const {
    title,
    startDate,
    startTime,
    endDate,
    endTime,
    notes,
    titleTouched,
    touchedFields,
    validationMessage,
    saveError,
    missingTitle,
    missingStartDate,
    missingStartTime,
    missingEndDate,
    missingEndTime,
    sameDate,
    invalidDateRange,
    invalidTimeRange,
    handleSubmit,
    handleTitleBlur,
    handleTitleChange,
    handleStartDateChange,
    handleEndDateChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleNotesChange,
    markFieldTouched,
  } = useCalendarEventForm(onSave)

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
            aria-describedby={titleTouched && missingTitle ? 'calendar-event-title-error' : undefined}
            aria-invalid={titleTouched && missingTitle}
            id="calendar-event-title"
            maxLength={100}
            onBlur={handleTitleBlur}
            onChange={handleTitleChange}
            placeholder="Ej. Reunión de equipo"
            required
            value={title}
          />
          {titleTouched && missingTitle && (
            <p className="mt-2 text-xs text-rose-600" id="calendar-event-title-error" role="alert">
              El título del evento es obligatorio.
            </p>
          )}
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-slate-700">Fecha y hora de inicio</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_9rem]">
            <div>
              <CalendarDatePicker
                ariaDescribedBy={touchedFields.startDate && missingStartDate ? 'calendar-start-date-error' : undefined}
                ariaInvalid={touchedFields.startDate && missingStartDate}
                id="calendar-start-date"
                label="Fecha"
                max={endDate}
                onChange={handleStartDateChange}
                onBlur={markFieldTouched('startDate')}
                value={startDate}
              />
            </div>
            <div>
              <label>
                <span className="mb-1 block text-xs text-slate-500">Hora</span>
                <input
                  aria-label="Hora de inicio"
                  aria-describedby={touchedFields.startTime && missingStartTime ? 'calendar-start-time-error' : undefined}
                  aria-invalid={touchedFields.startTime && missingStartTime}
                  className="input input-bordered w-full rounded-xl border-slate-200 bg-white text-sm text-slate-900 focus:border-indigo-500 focus:outline-indigo-500"
                  max={sameDate && endTime ? endTime : undefined}
                  onBlur={markFieldTouched('startTime')}
                  onChange={handleStartTimeChange}
                  required
                  type="time"
                  value={startTime}
                />
              </label>
            </div>
          </div>
          {touchedFields.startDate && missingStartDate && (
            <p className="mt-2 text-xs text-rose-600" id="calendar-start-date-error" role="alert">
              Selecciona la fecha de inicio.
            </p>
          )}
          {touchedFields.startTime && missingStartTime && (
            <p className="mt-2 text-xs text-rose-600" id="calendar-start-time-error" role="alert">
              Selecciona la hora de inicio.
            </p>
          )}
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
                ariaDescribedBy={touchedFields.endDate && missingEndDate ? 'calendar-end-date-error' : undefined}
                ariaInvalid={touchedFields.endDate && missingEndDate}
                id="calendar-end-date"
                label="Fecha"
                min={startDate}
                onChange={handleEndDateChange}
                onBlur={markFieldTouched('endDate')}
                value={endDate}
              />
            </div>
            <div>
              <label>
                <span className="mb-1 block text-xs text-slate-500">Hora</span>
                <input
                  aria-label="Hora de fin"
                  aria-describedby={touchedFields.endTime && missingEndTime ? 'calendar-end-time-error' : undefined}
                  aria-invalid={touchedFields.endTime && missingEndTime}
                  className="input input-bordered w-full rounded-xl border-slate-200 bg-white text-sm text-slate-900 focus:border-indigo-500 focus:outline-indigo-500"
                  min={sameDate && startTime ? startTime : undefined}
                  onBlur={markFieldTouched('endTime')}
                  onChange={handleEndTimeChange}
                  required
                  type="time"
                  value={endTime}
                />
              </label>
            </div>
          </div>
          {touchedFields.endDate && missingEndDate && (
            <p className="mt-2 text-xs text-rose-600" id="calendar-end-date-error" role="alert">
              Selecciona la fecha de fin.
            </p>
          )}
          {touchedFields.endTime && missingEndTime && (
            <p className="mt-2 text-xs text-rose-600" id="calendar-end-time-error" role="alert">
              Selecciona la hora de fin.
            </p>
          )}
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
            onChange={handleNotesChange}
            placeholder="Agrega detalles para recordar..."
            value={notes}
          />
        </div>

        {validationMessage && (
          <p
            aria-live="polite"
            className={`rounded-xl px-3.5 py-3 text-sm ${saveError || invalidDateRange || invalidTimeRange || !startDate || !endDate ? 'bg-rose-50 text-rose-700' : 'bg-indigo-50 text-indigo-700'}`}
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