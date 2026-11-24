
export const CalendarEvent = ({ event }) => (
  <span title={`${event.title} · ${event.user?.name ?? ''}`}>
    {event.title}
    {event.user?.name && ` · ${event.user.name}`}
  </span>
)
