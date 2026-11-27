import { useRef, useState } from 'react'

const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

const toISODate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const fromISODate = (date) => {
  if (!date) return new Date()

  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const getMonthKey = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${date.getFullYear()}-${month}`
}

const formatSpanishDate = (date) => {
  if (!date) return 'Selecciona una fecha'

  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

const formatMonth = (date) =>
  new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(date)

const formatAccessibleDate = (date) =>
  new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

export const CalendarDatePicker = ({
  id,
  label,
  value,
  min,
  max,
  onChange,
  onBlur,
  ariaInvalid,
  ariaDescribedBy,
}) => {
  const triggerRef = useRef(null)
  const popoverRef = useRef(null)
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const referenceDate = value || min || max
    const date = fromISODate(referenceDate)
    return new Date(date.getFullYear(), date.getMonth(), 1)
  })

  const year = visibleMonth.getFullYear()
  const month = visibleMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const dayOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cellCount = Math.ceil((dayOffset + daysInMonth) / 7) * 7
  const today = toISODate(new Date())
  const previousMonth = new Date(year, month - 1, 1)
  const nextMonth = new Date(year, month + 1, 1)
  const canGoPrevious = !min || getMonthKey(previousMonth) >= min.slice(0, 7)
  const canGoNext = !max || getMonthKey(nextMonth) <= max.slice(0, 7)
  const popoverId = `${id}-calendar`

  const positionPopover = () => {
    const trigger = triggerRef.current
    const popover = popoverRef.current
    if (!trigger || !popover) return

    const triggerBounds = trigger.getBoundingClientRect()
    const width = popover.offsetWidth
    const height = popover.offsetHeight
    const left = Math.min(
      Math.max(8, triggerBounds.left),
      window.innerWidth - width - 8,
    )
    const below = triggerBounds.bottom + 8
    const top =
      below + height <= window.innerHeight - 8
        ? below
        : Math.max(8, triggerBounds.top - height - 8)

    popover.style.left = `${left}px`
    popover.style.top = `${top}px`
  }

  const handleOpen = () => {
    const referenceDate = value || min || max || today
    const date = fromISODate(referenceDate)
    setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1))
    requestAnimationFrame(positionPopover)
  }

  const handleSelect = (date) => {
    onChange(date)
    popoverRef.current?.hidePopover()
    triggerRef.current?.focus()
  }

  return (
    <div
      className="min-w-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onBlur?.()
        }
      }}
    >
      <span className="mb-1 block text-xs text-slate-500">{label}</span>
      <button
        aria-controls={popoverId}
        aria-describedby={ariaDescribedBy}
        aria-haspopup="dialog"
        aria-invalid={ariaInvalid}
        className="input input-bordered flex w-full items-center justify-between gap-2 rounded-xl border-slate-200 bg-white text-left text-sm font-normal text-slate-900 focus:border-indigo-500 focus:outline-indigo-500"
        id={id}
        onClick={handleOpen}
        popoverTarget={popoverId}
        ref={triggerRef}
        type="button"
      >
        <span className={value ? '' : 'text-slate-400'}>{formatSpanishDate(value)}</span>
        <svg aria-hidden="true" className="size-4 shrink-0 text-slate-500" viewBox="0 0 24 24" fill="none">
          <rect x="3.75" y="5.75" width="16.5" height="14.5" rx="3" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 3.75v4M16 3.75v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>
      <div
        aria-label={label}
        className="fixed z-[1000] m-0 w-[min(20rem,calc(100vw-1rem))] rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-xl"
        id={popoverId}
        popover="auto"
        ref={popoverRef}
        role="dialog"
        style={{ inset: 'auto', top: 0, left: 0 }}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <button
            aria-label="Mes anterior"
            className="btn btn-ghost btn-sm size-9 min-h-0 rounded-lg p-0 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 disabled:text-slate-300"
            disabled={!canGoPrevious}
            onClick={() => setVisibleMonth(previousMonth)}
            type="button"
          >
            <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
              <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h3 aria-live="polite" className="text-sm font-semibold capitalize text-slate-800">
            {formatMonth(visibleMonth)}
          </h3>
          <button
            aria-label="Mes siguiente"
            className="btn btn-ghost btn-sm size-9 min-h-0 rounded-lg p-0 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 disabled:text-slate-300"
            disabled={!canGoNext}
            onClick={() => setVisibleMonth(nextMonth)}
            type="button"
          >
            <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
              <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div aria-label={formatMonth(visibleMonth)} className="grid grid-cols-7 gap-1">
          {weekDays.map((day, index) => (
            <span
              aria-label={new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(
                new Date(2026, 0, 5 + index),
              )}
              className="flex h-8 items-center justify-center text-xs font-medium text-slate-400"
              key={day}
            >
              {day}
            </span>
          ))}
          {Array.from({ length: cellCount }, (_, index) => {
            const dayOfMonth = index - dayOffset + 1
            if (dayOfMonth < 1 || dayOfMonth > daysInMonth) {
              return <span aria-hidden="true" className="h-9" key={`empty-${index}`} />
            }

            const date = new Date(year, month, dayOfMonth)
            const dateValue = toISODate(date)
            const isSelected = dateValue === value
            const isToday = dateValue === today
            const isDisabled = Boolean(
              (min && dateValue < min) || (max && dateValue > max),
            )

            return (
              <button
                aria-current={isToday ? 'date' : undefined}
                aria-label={formatAccessibleDate(date)}
                aria-pressed={isSelected}
                className={`btn btn-sm h-9 min-h-0 rounded-lg border-0 px-0 text-xs ${
                  isSelected
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : isDisabled
                      ? 'bg-transparent text-slate-300'
                      : `bg-transparent text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 ${
                          isToday ? 'ring-1 ring-indigo-300' : ''
                        }`
                }`}
                disabled={isDisabled}
                key={dateValue}
                onClick={() => handleSelect(dateValue)}
                type="button"
              >
                {dayOfMonth}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
