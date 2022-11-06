export function capitalize(eventName) {
   if (typeof eventName !== 'string') {
      return ''
   }
   return eventName.charAt(0).toUpperCase() + eventName.slice(1)
}

export function range(start, end) {
   if (end < start) {
      const save = start
      start = end
      end = save
   }
   return new Array(end - start + 1).fill('').map((_, index) => start + index)
}
