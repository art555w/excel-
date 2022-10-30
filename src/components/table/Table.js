import { ExcelComponent } from '../../core/ExcelComponent'
import { resizeTable } from './resizeTable'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
   static className = 'excel__table'
   constructor($root) {
      super($root, {
         name: 'Table',
         listeners: ['mousedown'],
      })
   }

   toHTML() {
      return createTable(30)
   }

   onMousedown(event) {
      return resizeTable(event, this.$root)
   }
}
