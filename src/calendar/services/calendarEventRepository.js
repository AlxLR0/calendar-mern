const STORAGE_KEY = 'dayflow.calendar.events'
const DEMO_USER = {
  _id: 'user-demo-123',
  name: 'AlX',
}

const readStoredEvents = () => {
  const storedEvents = localStorage.getItem(STORAGE_KEY)
  if (!storedEvents) {
    return []
  }

  let parsedEvents
  try {
    parsedEvents = JSON.parse(storedEvents)
  } catch {
    throw new Error('Los eventos guardados no tienen un formato válido.')
  }

  if (!Array.isArray(parsedEvents)) {
    throw new Error('Los eventos guardados no tienen un formato válido.')
  }

  return parsedEvents.map((event) => {
    if (!event || typeof event.title !== 'string' || typeof event._id !== 'string') {
      throw new Error('Los eventos guardados no tienen un formato válido.')
    }

    const start = new Date(event.start)
    const end = new Date(event.end)
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new Error('Los eventos guardados no tienen un formato válido.')
    }

    return { ...event, start, end }
  })
}

export const calendarEventRepository = {
  async getAll() {
    return readStoredEvents()
  },

  async create(eventData) {
    const event = {
      _id: globalThis.crypto.randomUUID(),
      ...eventData,
      start: new Date(eventData.start),
      end: new Date(eventData.end),
      bgColor: '#4f46e5',
      user: DEMO_USER,
    }
    const events = readStoredEvents()

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...events, event]))
    } catch {
      throw new Error('No se pudo guardar el evento en este navegador.')
    }

    return event
  },
}
