/* eslint no-restricted-properties: 0 */
// below function via: http://goo.gl/B3ae8c
/**
 * Return human-readable file size.
 * @param {number} bytes - Pass bytes and get formatted string.
 * @returns {string} - formatted string
 * @example
 * bytesToSize(1024*1024*5) === '5 GB'
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */
export const bytesToSize = bytes => {
  var k = 1000
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes === 0) {
    return "0 Bytes"
  }
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10)
  return (bytes / k ** i).toPrecision(3) + " " + sizes[i]
}

export const subsToSize = (number, precision = 0) => {
  if (!number || number === 0) {
    return ""
  }
  if (number >= 1000) {
    precision = 1
  }
  const abbrev = ["", "K", "M", "B", "T"]
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3)
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1))
  const suffix = abbrev[order]
  return (number / Math.pow(10, order * 3)).toFixed(precision) + suffix
}
