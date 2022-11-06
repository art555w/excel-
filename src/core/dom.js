class Dom {
   constructor(selector) {
      this.$el =
         typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
   }

   html(html) {
      if (typeof html === 'string') {
         this.$el.innerHTML = html
         return this
      }
      return this.$el.oiterHtml.trim()
   }

   text(text) {
      if (typeof text === 'string') {
         this.$el.textContent = text
         return this
      }
      return this.$el.textContent
   }

   clear() {
      return this.html('')
   }

   append(node) {
      if (node instanceof Dom) {
         node = node.$el
      }
      if (Element.prototype.append) {
         this.$el.append(node)
      } else {
         this.$el.appendChild(node)
      }

      return this
   }

   on(eventName, callback) {
      return this.$el.addEventListener(eventName, callback)
   }

   off(eventName, callback) {
      return this.$el.removeEventListener(eventName, callback)
   }

   closest(selector) {
      return $(this.$el.closest(selector))
   }

   coords() {
      return this.$el.getBoundingClientRect()
   }

   get data() {
      return this.$el.dataset
   }

   id(parce) {
      if (parce) {
         const parced = this.id().split(':')
         return {
            col: +parced[1],
            row: +parced[0],
         }
      }
      return this.data.id
   }

   addClass(className) {
      this.$el.classList.add(className)
      return this
   }

   removeClass(className) {
      this.$el.classList.remove(className)
      return this
   }

   find(selector) {
      return $(this.$el.querySelector(selector))
   }

   findAll(selector) {
      return this.$el.querySelectorAll(selector)
   }

   css(styles = {}) {
      Object.keys(styles).forEach((key) => {
         return (this.$el.style[key] = styles[key])
      })
   }
   focus() {
      this.$el.focus()
      return this
   }
}

export function $(selector) {
   return new Dom(selector)
}

$.create = (tagName, classes = '') => {
   const el = document.createElement(tagName)
   if (classes) {
      el.classList.add(classes)
   }
   return $(el)
}
