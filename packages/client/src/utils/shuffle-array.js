/* eslint no-plusplus:0 */
export const shuffleArray = arr => {
  if (!arr) {
    return [{partsOfSpeech: "alphabet", word: "no entry"}]
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// another version: slightly slower but more readable
export const shuffleArray2 = arr => {
  arr
    .map(a => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
  return arr
}
