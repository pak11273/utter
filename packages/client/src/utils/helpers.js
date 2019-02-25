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
