import { format } from 'date-fns'

function formatDate(date) {
  if (!date) return 'Unknown release date'
  return format(new Date(date), 'MMMM dd, yyyy')
}

function sliceText(text, length = 210) {
  if (!text) return
  if (text.length > length) {
    const regex = new RegExp(`^.{1,${length}}\\b(?<!\\-)`)
    return `${text.match(regex)[0]}...`
  }
  return text
}

export { formatDate, sliceText }
