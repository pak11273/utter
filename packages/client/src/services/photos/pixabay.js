/* eslint-disable */
import {PhotoAbstract} from "./photo-abstract.js"
// api notes
// returns json
// 5000 requests per hour by api key
// requests must be cached for 24 hours
// image urls are temporary.  **store them to cdn, or have client download to their browser first**
// http 429 error "too many requests" if you go over quota

// params
// https://pixabay/

/* 
key=api
q= search term ie. "yellow+flower"
lang= default: en
category= 
min_width=
min_height=
safesearch=true
page= <paginated page results: default 1>
per_page= <3-200: defaul: 20>

// rate limits
-RateLimit-Limit	The maximum number of requests that the consumer is permitted to make in 30 minutes.
X-RateLimit-Remaining	The number of requests remaining in the current rate limit window.
X-RateLimit-Reset	The remaining time in seconds after which the current rate limit window resets.
*/

/* var URL = */
/*   "https://pixabay.com/api/?key=" + */
/*   API_KEY + */
/*   "&q=" + */

/*   encodeURIComponent("red roses") */
/* $.getJSON(URL, function(data) { */
/*   if (parseInt(data.totalHits) > 0) */
/*     $.each(data.hits, function(i, hit) { */
/*       console.log(hit.pageURL) */
/*     }) */
/*   else console.log("No hits") */
/* }) */

export class Pixabay extends PhotoAbstract {
  constructor(data) {
    super(data)
    this.data = data
    this.loading = false
  }

  async fetchPics(data) {
    this.loading = true
    const words = PhotoAbstract.convertData(data)

    const arr = await data.map(async dataItem => {
      return new Promise(resolve => {
        setTimeout(async () => {
          const url = `https://pixabay.com/api/?key=${
            process.env.PIXABAY_API_KEY
          }&q=${
            dataItem.word
          }&image_type=photo&pretty=true&per_page=${encodeURIComponent(10)}`
          const response = await fetch(url)
          const fetched = await response.json()

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
