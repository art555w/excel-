import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
   constructor($root, options = {}) {
      super($root, options.listeners)
      this.name = options.name
      this.emitter = options.emitter
      this.unsubscriber = []

      this.prepare()
   }
   prepare() {}

   toHTML() {
      return ''
   }

   $emit(eventName, ...args) {
      this.emitter.emit(eventName, ...args)
   }

   $on(eventName, fn) {
      const unsub = this.emitter.subscribe(eventName, fn)
      this.unsubscriber.push(unsub)
   }

   init() {
      this.initDOMListeners()
   }

   destroy() {
      this.removeDOMListenrs()
      this.unsubscriber.forEach((unsub) => unsub())
   }
}
