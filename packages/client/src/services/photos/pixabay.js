/* eslint-disable */
import {PhotoAbstract} from "./photo-abstract.js"
import {session} from "brownies"
import {shuffleArray} from "../../utils/shuffle-array.js"

export class Pixabay extends PhotoAbstract {
  constructor(data) {
    super(data)
    this.data = data
    this.loading = false
  }

  async fetchPics(data) {
    this.loading = true
    const words = PhotoAbstract.convertData(data.vocabulary)
    // mix up words
    shuffleArray(words)

    const arr = await data.vocabulary.map(async dataItem => {
      const keyword = dataItem.keyword ? dataItem.keyword : dataItem.translation
      console.log("keyword: ", keyword)
      return new Promise(resolve => {
        const modifier = data.modifier || ""
        setTimeout(async () => {
          const url = `https://pixabay.com/api/?key=${
            process.env.PIXABAY_API_KEY
          }&q=${keyword}&image_type=photo&pretty=true&per_page=${encodeURIComponent(
            200
          )}&safesearch=true`
          console.log("url: ", url)
          const response = await fetch(url)
          const fetched = await response.json()
          console.log("fetched: ", fetched)

          const imageUrls = fetched.hits.map(item => {
            return {...dataItem, ...item}
          })

          resolve(imageUrls)
        }, 1000)
      })
    })

    const urls = await Promise.all(arr)

    this.loading = false
    return urls
  }
}
