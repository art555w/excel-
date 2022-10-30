import { $ } from '../../core/dom'

export function resizeTable(event, $root) {
   event.preventDefault()
   const type = event.target.dataset.resize
   const minWidth = 36
   const minHeight = 16
   let value
   if (type === 'col') {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resize"]')
      const coords = $parent.coords()
      const index = $parent.data.col
      const cells = $root.findAll(`[data-col="${index}"]`)
      $resizer.addClass('active')

      document.onmousemove = (e) => {
         const delta = e.x - coords.right
         value = coords.width + delta - 3
         $resizer.css({
            left: value < minWidth ? minWidth + 'px' : value + 'px',
         })
      }

      document.onmouseup = (e) => {
         const delta = e.x - coords.right
         value = coords.width + delta
         $resizer.removeClass('active')
         cells.forEach((cell) => {
            cell.style.width = value < minWidth ? minWidth + 'px' : value + 'px'
         })
         document.onmousemove = null
         document.onmouseup = null
      }
   } else if (type === 'row') {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resize"]')
      const coords = $parent.coords()
      $resizer.addClass('active')

      document.onmousemove = (e) => {
         const delta = e.y - coords.bottom
         value = coords.height + delta - 3
         $resizer.css({
            top: value < minHeight ? minHeight + 'px' : value + 'px',
         })
      }
      document.onmouseup = (e) => {
         const delta = e.y - coords.bottom
         value = coords.height + delta
         $parent.css({
            height: value < minHeight ? minHeight + 'px' : value + 'px',
         })
         $resizer.removeClass('active')
         document.onmousemove = null
         document.onmouseup = null
      }
   }
}
