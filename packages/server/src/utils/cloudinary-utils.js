export const getPublicId = url => {
  console.log("url: ", url)
  var split = url.split("/")
  var lastIndex = split[split.length - 1]
  lastIndex = lastIndex.substring(0, lastIndex.lastIndexOf("."))
  console.log(typeof lastIndex)
  console.log(lastIndex)
  return lastIndex
}
