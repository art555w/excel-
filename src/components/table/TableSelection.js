// import { $ } from '../../core/dom'

export class TableSelection {
   static className = 'selected'
   constructor($root) {
      this.$root = $root
      this.group = []
      this.current = null
   }

   select($el) {
      this.clear()
      $el.focus().addClass(TableSelection.className)
      this.current = $el
      this.group.push($el)
   }

   selectGroup($el) {
      this.clear()
      this.group = $el
      this.group.forEach((el) => {
         el.addClass(TableSelection.className)
      })
   }

   clear() {
      this.group.forEach(($el) => {
         $el.removeClass(TableSelection.className)
      })
      this.group = []
   }
}
