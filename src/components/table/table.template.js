const CODES = {
   A: 65,
   Z: 90,
}

function toCell(_, index) {
   return `
		<div class="cell" contenteditable="" data-col="${index}"></div>
	`
}

function toColumn(col, index) {
   return `
		<div class="column" data-type="resize" data-col="${index}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
}

function createRow(index, col) {
   const resize = index
      ? `<div class="row-resize" data-resize="row"></div>`
      : ''
   return `
		<div class="row" data-type="resize">
         <div class="row-info">
				${index}
				${resize}
			</div>
         <div class="row-data">${col}</div>
      </div>
	`
}

function toChar(_, index) {
   return String.fromCharCode(CODES.A + index)
}

export function createTable(rowCount = 15) {
   const colCount = CODES.Z - CODES.A + 1
   const rows = []
   const cols = new Array(colCount).fill('').map(toChar).map(toColumn).join('')

   const cell = new Array(colCount).fill('').map(toCell).join('')

   rows.push(createRow('', cols))
   for (let i = 0; i < rowCount; i++) {
      rows.push(createRow(i + 1, cell))
   }

   return rows.join('')
}
