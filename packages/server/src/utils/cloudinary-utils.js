export const getPublicId = url => {
  var split = url.split("/")
  var lastIndex = split[split.length - 1]
  lastIndex = lastIndex.substring(0, lastIndex.lastIndexOf("."))
  return lastIndex
}
