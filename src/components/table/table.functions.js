import { range } from '../../core/utils'

export function isCell(event) {
   return event.target.dataset.type === 'cell'
}

export function matrix($current, $target) {
   const current = $current.id(true)
   const target = $target.id(true)

   const cols = range(current.col, target.col)
   const rows = range(current.row, target.row)

   return cols.reduce((acc, col) => {
      rows.forEach((row) => {
         acc.push(`${row}:${col}`)
      })
      return acc
   }, [])
}

export function nextSelector(key, { row, col }, countRow) {
   const MIN_VALUE = 0
   switch (key) {
      case 'Enter':
      case 'ArrowDown':
         row = row + 1 >= countRow ? row : row + 1
         break
      case 'Tab':
      case 'ArrowRight':
         col++
         break
      case 'ArrowLeft':
         col = col - 1 < MIN_VALUE ? col : col - 1
         break
      case 'ArrowUp':
         row = row - 1 < MIN_VALUE ? row : row - 1
         break
   }

   return `[data-id="${row}:${col}"]`
}
