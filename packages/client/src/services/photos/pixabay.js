/* eslint-disable */
import {PhotoAbstract} from "./photo-abstract.js"
import {session} from "brownies"
import {shuffleArray} from "../../utils/shuffle-array.js"

export class Pixabay extends PhotoAbstract {
  constructor(data) {
    super(data)
    this.data = data
    this.loading = false
    this.keys = process.env.PIXABAY_API_KEYS
    this.keyCount = 0

    this.keys = process.env.PIXABAY_API_KEYS.split(",")
  }

  async fetchPics(data) {
    this.loading = true
    const words = PhotoAbstract.convertData(data.vocabulary)
    // mix up words
    shuffleArray(words)

    const arr = await data.vocabulary.map(async dataItem => {
      const keyword = dataItem.keyword ? dataItem.keyword : dataItem.translation
      return new Promise(resolve => {
        const modifier = data.modifier || ""
        setTimeout(async () => {
          const url = `https://pixabay.com/api/?key=${
            this.keys[this.keyCount]
          }&q=${keyword}&image_type=photo&pretty=true&per_page=${encodeURIComponent(
            100
          )}&safesearch=true`
          const response = await fetch(url)
          const fetched = await response.json()

          const imageUrls = fetched.hits.map(item => {
            return {...dataItem, ...item}
          })

          // rotate keys TODO: this needs to function on the backend
          if (this.keyCount + 1 !== this.keyCount.length - 1) {
            this.keyCount + 1
          } else {
            this.keyCount = 0
          }

          resolve(imageUrls)
        }, 1000)
      })
    })

    const urls = await Promise.all(arr)

    this.loading = false
    return urls
  }
}
