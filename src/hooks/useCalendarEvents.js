import { useEffect, useState } from 'react'
import { calendarEventRepository } from '../calendar/services/calendarEventRepository'

export const useCalendarEvents = () => {
  const [events, setEvents] = useState([])
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let active = true

    const loadEvents = async () => {
      try {
        const savedEvents = await calendarEventRepository.getAll()
        if (active) {
          setEvents(savedEvents)
        }
      } catch (error) {
        if (active) {
          setLoadError(error instanceof Error ? error.message : 'No se pudieron cargar los eventos.')
        }
      }
    }

    void loadEvents()

    return () => {
      active = false
    }
  }, [])

  const createEvent = async (eventData) => {
    const savedEvent = await calendarEventRepository.create(eventData)
    setEvents((currentEvents) => [...currentEvents, savedEvent])
    return savedEvent
  }

  return { events, loadError, createEvent }
}
