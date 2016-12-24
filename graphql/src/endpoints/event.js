import EventEmitter from 'events'
let eventBus = null

export default function getEventbus () {
  if (eventBus) return eventBus
  eventBus = new EventEmitter()
  return eventBus
}

export function publishChanges (changes) {
  getEventbus().emit('event', changes)
}
