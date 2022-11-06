import { $ } from '../../core/dom'
import { ExcelComponent } from '../../core/ExcelComponent'
import { resizeTable } from './resizeTable'
import { isCell, matrix, nextSelector } from './table.functions'
import { createTable } from './table.template'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
   static className = 'excel__table'
   constructor($root, options) {
      super($root, {
         name: 'Table',
         listeners: ['mousedown', 'keydown', 'input'],
         ...options,
      })
      this.countRow = 20
   }

   prepare() {
      this.selection = new TableSelection(this.$root)
   }

   toHTML() {
      return createTable(this.countRow)
   }

   selectCell(cell) {
      this.$emit('table:select', cell)
      this.selection.select(cell)
   }

   init() {
      super.init()
      const cell = this.$root.find('[data-id="0:0"]')
      this.selectCell(cell)
      this.$on('formula:input', (text) => {
         this.selection.current.text(text)
      })
      this.$on('formula:done', () => {
         this.selection.current.focus()
      })
   }

   onInput(event) {
      this.$emit('table:input', $(event.target).text())
   }

   onMousedown(event) {
      if (isCell(event)) {
         const $target = $(event.target)
         if (event.shiftKey) {
            const cells = matrix(this.selection.current, $target).map(
               (cell) => {
                  return this.$root.find(`[data-id="${cell}"]`)
               }
            )
            this.selection.selectGroup(cells)
         } else {
            this.selectCell($target)
         }
      }
      return resizeTable(event, this.$root)
   }
   onKeydown(event) {
      const keys = [
         'ArrowLeft',
         'ArrowRight',
         'ArrowUp',
         'ArrowDown',
         'Enter',
         'Tab',
      ]

      const { key } = event

      if (keys.includes(key) && !event.shiftKey) {
         event.preventDefault()
         const id = this.selection.current.id(true)
         const $next = this.$root.find(nextSelector(key, id, this.countRow))
         this.selectCell($next)
      }
   }
}
