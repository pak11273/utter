/* eslint-disable */
import {PhotoAbstract} from "./photo-abstract.js"
import {session} from "brownies"
import {shuffleArray} from "../../utils/shuffle-array.js"
const fetch = require("node-fetch")

export class Pixabay extends PhotoAbstract {
  constructor(data) {
    super(data)
    this.data = data
    this.keys = process.env.PIXABAY_API_KEYS
    this.keyCount = 0

    this.keys = process.env.PIXABAY_API_KEYS.split(",")
  }

  async fetchPics(data) {
    this.loading = true
    // returns an array of words
    const words = PhotoAbstract.convertData(data.vocabulary)
    // mix up words
    shuffleArray(words)

    const arr = await words.map(async word => {
      try {
        return new Promise(resolve => {
          const modifier = data.modifier || ""
          setTimeout(async () => {
            const url = `https://pixabay.com/api/?key=${
              this.keys[this.keyCount]
            }&q=${word}&image_type=photo&pretty=true&per_page=${encodeURIComponent(
              3
            )}&safesearch=true`
            const response = await fetch(url)
            const fetched = await response.json()

            const imageUrls = fetched.hits.map(item => {
              return {word, ...item}
            })

            // rotate keys
            if (this.keyCount + 1 !== this.keyCount.length - 1) {
              this.keyCount + 1
            } else {
              this.keyCount = 0
            }

            resolve(imageUrls)
          }, 1000)
        })
      } catch (err) {
        return err
      }
    })

    const urls = await Promise.all(arr)

    return urls
  }
}
