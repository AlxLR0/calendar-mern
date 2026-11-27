import { useState } from 'react'

export const useCalendarEventForm = (onSave) => {
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [notes, setNotes] = useState('')
  const [titleTouched, setTitleTouched] = useState(false)
  const [touchedFields, setTouchedFields] = useState({})
  const [validationMessage, setValidationMessage] = useState('')
  const [saveError, setSaveError] = useState(false)

  const missingTitle = !title.trim()
  const missingStartDate = !startDate
  const missingStartTime = !startTime
  const missingEndDate = !endDate
  const missingEndTime = !endTime
  const sameDate = Boolean(startDate && endDate && startDate === endDate)
  const invalidDateRange = Boolean(startDate && endDate && startDate > endDate)
  const invalidTimeRange = Boolean(
    sameDate && startTime && endTime && startTime >= endTime,
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaveError(false)
    setTitleTouched(true)
    setTouchedFields({
      startDate: true,
      startTime: true,
      endDate: true,
      endTime: true,
    })

    if (missingTitle) {
      return
    }

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

    setValidationMessage('')

    try {
      await onSave({
        title: title.trim(),
        notes: notes.trim(),
        start: new Date(`${startDate}T${startTime}`).toISOString(),
        end: new Date(`${endDate}T${endTime}`).toISOString(),
      })
      setTitle('')
      setStartDate('')
      setStartTime('')
      setEndDate('')
      setEndTime('')
      setNotes('')
      setTitleTouched(false)
      setTouchedFields({})
    } catch (error) {
      setSaveError(true)
      setValidationMessage(
        error instanceof Error ? `No se pudo guardar el evento: ${error.message}` : 'No se pudo guardar el evento.',
      )
    }
  }

  const handleTitleBlur = () => setTitleTouched(true)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
    setValidationMessage('')
    setSaveError(false)
  }

  const handleStartDateChange = (value) => {
    setStartDate(value)
    setValidationMessage('')
    setSaveError(false)
  }

  const handleEndDateChange = (value) => {
    setEndDate(value)
    setValidationMessage('')
    setSaveError(false)
  }

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value)
    setValidationMessage('')
    setSaveError(false)
  }

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value)
    setValidationMessage('')
    setSaveError(false)
  }

  const handleNotesChange = (event) => setNotes(event.target.value)

  const markFieldTouched = (field) => () => {
    setTouchedFields((fields) => ({ ...fields, [field]: true }))
  }

  return {
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
  }
}
