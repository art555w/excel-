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